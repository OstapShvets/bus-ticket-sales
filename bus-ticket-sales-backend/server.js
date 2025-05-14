// server.js

const http = require('http');
const mysql = require('mysql2');
const url = require('url');

// MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'bus_tickets_db',
  timezone: '+00:00'
});

db.connect(err => {
  if (err) {
    console.error('DB Connection Error:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL');
});

// Helper to send JSON response with CORS headers
function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(payload);
}

// Helper to parse JSON body
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // --- REGISTER ---
  if (path === '/api/register' && method === 'POST') {
    try {
      const { name, email, password } = await parseRequestBody(req);
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        (err, result) => {
          if (err) return sendJson(res, 500, { error: err.sqlMessage });
          sendJson(res, 201, { id: result.insertId, name, email });
        }
      );
    } catch {
      sendJson(res, 400, { error: 'Invalid JSON' });
    }
    return;
  }

  // --- LOGIN ---
  if (path === '/api/login' && method === 'POST') {
    try {
      const { email, password } = await parseRequestBody(req);
      db.query(
        'SELECT id, name, email FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, results) => {
          if (err) return sendJson(res, 500, { error: err.sqlMessage });
          if (!results.length) return sendJson(res, 401, { error: 'Invalid credentials' });
          sendJson(res, 200, results[0]);
        }
      );
    } catch {
      sendJson(res, 400, { error: 'Invalid JSON' });
    }
    return;
  }

  // --- TOP ROUTES ---
  if (path === '/api/top-routes' && method === 'GET') {
    db.query(
      'SELECT * FROM schedule ORDER BY price ASC LIMIT 5',
      (err, rows) => {
        if (err) return sendJson(res, 500, { error: err.sqlMessage });
        sendJson(res, 200, rows);
      }
    );
    return;
  }

  // --- SEARCH ROUTES ---
  if (path === '/api/search' && method === 'GET') {
    const { origin, destination, date } = parsedUrl.query;
    db.query(
      `SELECT *
       FROM schedule
       WHERE origin = ?
         AND destination = ?
         AND DATE(departure_time) = ?
         AND seats_available > 0
       ORDER BY departure_time`,
      [origin, destination, date],
      (err, rows) => {
        if (err) return sendJson(res, 500, { error: err.sqlMessage });
        sendJson(res, 200, rows);
      }
    );
    return;
  }

  // --- BOOK TICKETS (1–3 passengers) ---
  if (path === '/api/tickets' && method === 'POST') {
    try {
      const { user_id, schedule_id, passenger_names, passenger_phone, passenger_email } = await parseRequestBody(req);
      if (!Array.isArray(passenger_names) || passenger_names.length < 1 || passenger_names.length > 3) {
        return sendJson(res, 400, { error: 'Invalid passenger count (1-3)' });
      }
      const count = passenger_names.length;

      db.query(
        'SELECT seats_available FROM schedule WHERE id = ?',
        [schedule_id],
        (err, rows) => {
          if (err) return sendJson(res, 500, { error: err.sqlMessage });
          if (!rows.length) return sendJson(res, 404, { error: 'Schedule not found' });
          if (rows[0].seats_available < count) {
            return sendJson(res, 400, { error: 'Not enough seats available' });
          }

          db.beginTransaction(txErr => {
            if (txErr) return sendJson(res, 500, { error: txErr.sqlMessage });

            db.query(
              'UPDATE schedule SET seats_available = seats_available - ? WHERE id = ?',
              [count, schedule_id],
              updErr => {
                if (updErr) {
                  return db.rollback(() => sendJson(res, 500, { error: updErr.sqlMessage }));
                }

                const values = passenger_names.map(name => [
                  user_id, schedule_id, name, passenger_phone, passenger_email
                ]);

                db.query(
                  'INSERT INTO tickets (user_id, schedule_id, passenger_name, passenger_phone, passenger_email) VALUES ?',
                  [values],
                  (insErr, insRes) => {
                    if (insErr) {
                      return db.rollback(() => sendJson(res, 500, { error: insErr.sqlMessage }));
                    }

                    db.commit(commitErr => {
                      if (commitErr) {
                        return db.rollback(() => sendJson(res, 500, { error: commitErr.sqlMessage }));
                      }

                      const firstId = insRes.insertId;
                      const ticket_ids = Array.from(
                        { length: insRes.affectedRows },
                        (_, i) => firstId + i
                      );
                      sendJson(res, 201, { ticket_ids });
                    });
                  }
                );
              }
            );
          });
        }
      );
    } catch {
      sendJson(res, 400, { error: 'Invalid JSON' });
    }
    return;
  }

  // --- GET ALL TICKETS FOR A USER ---
  if (path === '/api/tickets' && method === 'GET') {
    const user_id = parsedUrl.query.user_id;
    db.query(
      `SELECT
         t.id, t.passenger_name, t.passenger_phone, t.passenger_email, t.purchase_time,
         s.origin, s.destination, s.departure_time, s.operator, s.price
       FROM tickets t
       JOIN schedule s ON t.schedule_id = s.id
       WHERE t.user_id = ?
       ORDER BY t.purchase_time DESC`,
      [user_id],
      (err, rows) => {
        if (err) return sendJson(res, 500, { error: err.sqlMessage });
        sendJson(res, 200, rows);
      }
    );
    return;
  }

  // --- GET SINGLE TICKET ---
  if (path.match(/^\/api\/tickets\/\d+$/) && method === 'GET') {
    const ticketId = path.split('/').pop();
    db.query(
      `SELECT
         t.id, t.passenger_name, t.passenger_phone, t.passenger_email, t.purchase_time,
         s.origin, s.destination, s.departure_time, s.operator, s.price
       FROM tickets t
       JOIN schedule s ON t.schedule_id = s.id
       WHERE t.id = ?`,
      [ticketId],
      (err, rows) => {
        if (err) return sendJson(res, 500, { error: err.sqlMessage });
        if (!rows.length) return sendJson(res, 404, { error: 'Ticket not found' });
        sendJson(res, 200, rows[0]);
      }
    );
    return;
  }

  // --- CANCEL TICKET ---
  if (path.match(/^\/api\/tickets\/\d+$/) && method === 'DELETE') {
    const ticketId = path.split('/').pop();
    db.query(
      'SELECT schedule_id FROM tickets WHERE id = ?',
      [ticketId],
      (err, rows) => {
        if (err) return sendJson(res, 500, { error: err.sqlMessage });
        if (!rows.length) return sendJson(res, 404, { error: 'Ticket not found' });
        const scheduleId = rows[0].schedule_id;

        db.query('DELETE FROM tickets WHERE id = ?', [ticketId], delErr => {
          if (delErr) return sendJson(res, 500, { error: delErr.sqlMessage });
          db.query(
            'UPDATE schedule SET seats_available = seats_available + 1 WHERE id = ?',
            [scheduleId],
            updErr => {
              if (updErr) return sendJson(res, 500, { error: updErr.sqlMessage });
              sendJson(res, 200, { message: 'Ticket cancelled successfully' });
            }
          );
        });
      }
    );
    return;
  }

  // --- SUPPORT REQUESTS: GET all ---
  if (path === '/api/support' && method === 'GET') {
    db.query(
      'SELECT id, name, email, question, created_at FROM support_requests ORDER BY created_at DESC',
      (err, rows) => {
        if (err) return sendJson(res, 500, { error: err.sqlMessage });
        sendJson(res, 200, rows);
      }
    );
    return;
  }

  // --- SUPPORT REQUESTS: POST new ---
  if (path === '/api/support' && method === 'POST') {
    try {
      const { name, email, message } = await parseRequestBody(req);
      if (!name || !email || !message) {
        return sendJson(res, 400, { error: 'name, email and message are required' });
      }
      db.query(
        'INSERT INTO support_requests (name, email, question) VALUES (?, ?, ?)',
        [name, email, message],
        (err, result) => {
          if (err) return sendJson(res, 500, { error: err.sqlMessage });
          sendJson(res, 201, {
            id: result.insertId,
            name,
            email,
            question: message,
            created_at: new Date().toISOString()
          });
        }
      );
    } catch {
      sendJson(res, 400, { error: 'Invalid JSON' });
    }
    return;
  }

  // --- NOT FOUND ---
  sendJson(res, 404, { error: 'Not Found' });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
