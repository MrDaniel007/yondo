// Node.js type definitions may be unavailable in the current TypeScript configuration.
// @ts-ignore
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { mockProducts } from './data/products.ts'; // Импортируем массив продуктов из data/products.ts
// Создаем базу данных прямо в памяти сервера


// Это простая функция-сервер на чистой Node.js (без тяжелых библиотек)
// Она будет слушать запросы на порту 3000
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api/products' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockProducts));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Маршрут не найден" }));
  }
});

// Запускаем сервер
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Сервер Озона запущен на http://localhost:${PORT}/api/products`);
});