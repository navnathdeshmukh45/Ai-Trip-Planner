import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

function GithubCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGithubCallback = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      
      if (code) {
        try {
          // Exchange code for access token
          const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
            client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
            code: code,
          }, {
            headers: {
              Accept: 'application/json',
            },
          });

          const accessToken = tokenResponse.data.access_token;

          // Get user data
          const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // Get user email
          const emailResponse = await axios.get('https://api.github.com/user/emails', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const primaryEmail = emailResponse.data.find(email => email.primary)?.email;

          const userData = {
            name: userResponse.data.name || userResponse.data.login,
            email: primaryEmail,
            picture: userResponse.data.avatar_url,
            provider: 'github'
          };

          localStorage.setItem('user', JSON.stringify(userData));
          toast.success('Successfully logged in with GitHub!');
          navigate('/');
        } catch (error) {
          console.error('GitHub callback error:', error);
          toast.error('Failed to complete GitHub login. Please try again.');
          navigate('/');
        }
      }
    };

    handleGithubCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default GithubCallback; 