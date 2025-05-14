import React from 'react';

const posts = [
  {
    id: 1,
    title: '10 порад для комфортної поїздки автобусом',
    date: '01.05.2025',
    url: 'https://klr.com.ua/blog/10-porad-yak-zrobyty-dovgu-poyizdku-avtobusom-bilsh-komfortnoyu'
  },
  {
    id: 2,
    title: 'Документи, на підставі яких виконуються пасажирські перевезення',
    date: '15.04.2025',
    url: 'https://protocol.ua/ua/pro_avtomobilniy_transport_stattya_39/'
  }
];

export default function Blog() {
  return (
    <section className="pt-28 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Blog — Наші статті</h1>
      <ul className="space-y-6">
        {posts.map(post => (
          <li key={post.id} className="border-b pb-4">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-600 hover:underline"
            >
              {post.title}
            </a>
            <p className="text-gray-500 text-sm">{post.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}