import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { ShopProvider } from './ShopContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShopProvider>
      <RouterProvider router={router}/>
        <App />
    </ShopProvider>
  </StrictMode>,
)
