import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Navbar from './components/navbar.tsx'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Navbar />
        <App />
        <Toaster richColors />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
)
