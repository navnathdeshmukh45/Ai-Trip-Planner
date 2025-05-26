// import React from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from "react-icons/fc"
import { useState, useEffect } from 'react'
import { toast } from "sonner"
import axios from 'axios'

/**
 * Renders the Header component with a logo and a "Sign In" button.
 * The header is styled with padding, shadow, and flexbox for layout.
 */

function Header() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      try {
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${codeResp?.access_token}`,
            Accept: 'application/json'
          }
        });
        
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        toast.success("Successfully logged in!");
      } catch (error) {
        console.error('Login error:', error);
        toast.error("Login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success("Successfully logged out!");
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-10'>
      {/* <img src='logo.svg' alt='Logo' /> */}
      <img src="/logo.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={user.picture} 
                alt={user.name} 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Button 
              onClick={handleLogout}
              className='bg-red-500 hover:bg-red-600 text-white'
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => login()}
            className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white'
          >
            <FcGoogle className="h-5 w-5" />
            Sign in with Google
          </Button>
        )}
      </div>
    </div>
  )
}

export default Header