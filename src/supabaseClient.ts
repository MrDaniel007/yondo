import { createClient } from '@supabase/supabase-js';

// Достаем переменные окружения для Vite с приведением типов
const supabaseUrl = import.meta.env.VITE_SUPABASE_url as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_anon_key as string;

// Проверка на случай, если ты забудешь прописать ключи в .env
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Отсутствуют ключи Supabase в переменных окружения (.env)!');
}


// Создаем и экспортируем типизированный клиент
export const supabase = createClient(supabaseUrl, supabaseAnonKey);