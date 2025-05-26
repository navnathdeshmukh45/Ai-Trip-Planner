import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Createtrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripid]'


const router = createBrowserRouter([
{
  path : '/',
  element:<App/>
},
{
  path : '/create-trip',
  element:<Createtrip/>
},
{
  path : '/view-trip/:tripid',
  element:<Viewtrip/>
}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster />
    <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
