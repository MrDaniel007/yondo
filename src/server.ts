// @ts-ignore Node.js type definitions are not installed in this project.
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { mockProducts } from './data/products.ts';

// Render сам передает порт через process.env.PORT. Если запускаем локально — берет 3000
declare const process: { env: { PORT?: string } };
const PORT = process.env.PORT || 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  // Настройки CORS для работы с Vercel и локальным разработчиком
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Обработка предварительных CORS-запросов браузера
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  // Основной эндпоинт для получения товаров
  if (req.url === '/api/products' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockProducts));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Маршрут не найден" }));
  }
});

// Запуск сервера на правильном порту
server.listen(PORT, () => {
  console.log(`🚀 Сервер Yondo запущен на порту ${PORT}`);
});