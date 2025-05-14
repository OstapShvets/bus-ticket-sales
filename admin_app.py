import tkinter as tk
from tkinter import ttk, messagebox
import mysql.connector

# MySQL config
config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'bus_tickets_db'
}

# Connect to DB
def connect_db():
    return mysql.connector.connect(**config)

class AdminApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Bus Tickets Admin Panel")
        self.geometry("1100x700")
        self.configure(bg="#f4f4f4")

        self.tabs = ttk.Notebook(self)
        self.tabs.pack(expand=True, fill='both')

        self.schedule_tab = ttk.Frame(self.tabs)
        self.users_tab = ttk.Frame(self.tabs)
        self.tickets_tab = ttk.Frame(self.tabs)
        self.support_tab = ttk.Frame(self.tabs)

        self.tabs.add(self.schedule_tab, text="Маршрути")
        self.tabs.add(self.users_tab, text="Користувачі")
        self.tabs.add(self.tickets_tab, text="Квитки")
        self.tabs.add(self.support_tab, text="Підтримка")

        self.init_schedule_tab()
        self.init_users_tab()
        self.init_tickets_tab()
        self.init_support_tab()

    def init_schedule_tab(self):
        frame = tk.Frame(self.schedule_tab)
        frame.pack(fill="both", expand=True)

        cols = ("ID", "Звідки", "Куди", "Час", "Оператор", "Ціна", "Місць")
        self.schedule_tree = ttk.Treeview(frame, columns=cols, show='headings')
        for col in cols:
            self.schedule_tree.heading(col, text=col)
        self.schedule_tree.pack(expand=True, fill='both', padx=10, pady=10)

        btns = tk.Frame(frame)
        btns.pack(pady=5)
        ttk.Button(btns, text="Оновити", command=self.load_schedules).pack(side='left', padx=5)
        ttk.Button(btns, text="Додати", command=self.add_schedule_popup).pack(side='left', padx=5)
        ttk.Button(btns, text="Видалити", command=self.delete_schedule).pack(side='left', padx=5)
        self.load_schedules()

    def load_schedules(self):
        for i in self.schedule_tree.get_children():
            self.schedule_tree.delete(i)
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT id, origin, destination, departure_time, operator, price, seats_available FROM schedule")
        for row in cursor.fetchall():
            self.schedule_tree.insert('', 'end', values=row)
        conn.close()

    def add_schedule_popup(self):
        popup = tk.Toplevel(self)
        popup.title("Новий маршрут")
        entries = {}
        fields = ["origin", "destination", "departure_time", "operator", "price", "seats_available"]

        for i, field in enumerate(fields):
            tk.Label(popup, text=field).grid(row=i, column=0)
            entry = tk.Entry(popup)
            entry.grid(row=i, column=1)
            entries[field] = entry

        def save():
            values = [entries[f].get() for f in fields]
            conn = connect_db()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO schedule (origin, destination, departure_time, operator, price, seats_available) VALUES (%s, %s, %s, %s, %s, %s)", values)
            conn.commit()
            conn.close()
            popup.destroy()
            self.load_schedules()

        ttk.Button(popup, text="Зберегти", command=save).grid(row=len(fields), columnspan=2)

    def delete_schedule(self):
        selected = self.schedule_tree.selection()
        if not selected:
            return
        id_ = self.schedule_tree.item(selected[0])['values'][0]
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM schedule WHERE id = %s", (id_,))
        conn.commit()
        conn.close()
        self.load_schedules()

    def init_users_tab(self):
        frame = tk.Frame(self.users_tab)
        frame.pack(fill="both", expand=True)

        self.users_tree = ttk.Treeview(frame, columns=("ID", "Name", "Email"), show='headings')
        for col in ("ID", "Name", "Email"):
            self.users_tree.heading(col, text=col)
        self.users_tree.pack(fill='both', expand=True, padx=10, pady=10)

        ttk.Button(frame, text="Оновити", command=self.load_users).pack(pady=5)
        self.load_users()

    def load_users(self):
        for i in self.users_tree.get_children():
            self.users_tree.delete(i)
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email FROM users")
        for row in cursor.fetchall():
            self.users_tree.insert('', 'end', values=row)
        conn.close()

    def init_tickets_tab(self):
        frame = tk.Frame(self.tickets_tab)
        frame.pack(fill="both", expand=True)
        self.tickets_tree = ttk.Treeview(frame, columns=("ID", "UserID", "Passenger", "Phone", "Email"), show='headings')
        for col in ("ID", "UserID", "Passenger", "Phone", "Email"):
            self.tickets_tree.heading(col, text=col)
        self.tickets_tree.pack(fill='both', expand=True, padx=10, pady=10)
        ttk.Button(frame, text="Оновити", command=self.load_tickets).pack(pady=5)
        self.load_tickets()

    def load_tickets(self):
        for i in self.tickets_tree.get_children():
            self.tickets_tree.delete(i)
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT id, user_id, passenger_name, passenger_phone, passenger_email FROM tickets")
        for row in cursor.fetchall():
            self.tickets_tree.insert('', 'end', values=row)
        conn.close()

    def init_support_tab(self):
        frame = tk.Frame(self.support_tab)
        frame.pack(fill="both", expand=True)
        self.support_tree = ttk.Treeview(frame, columns=("ID", "Name", "Email", "Question"), show='headings')
        for col in ("ID", "Name", "Email", "Question"):
            self.support_tree.heading(col, text=col)
        self.support_tree.pack(fill='both', expand=True, padx=10, pady=10)
        ttk.Button(frame, text="Оновити", command=self.load_support).pack(pady=5)
        self.load_support()

    def load_support(self):
        for i in self.support_tree.get_children():
            self.support_tree.delete(i)
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, question FROM support_requests")
        for row in cursor.fetchall():
            self.support_tree.insert('', 'end', values=row)
        conn.close()

if __name__ == '__main__':
    app = AdminApp()
    app.mainloop()
