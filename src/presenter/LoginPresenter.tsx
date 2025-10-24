// PRESENTER - Handles login logic between View and Model
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginView } from '@/view/LoginView';
import { authService } from '@/model/authService';
import { toast } from '@/hooks/use-toast';

export function LoginPresenter() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await authService.login({ email, password });

      if (result.error) {
        setError(result.error);
        toast({
          title: 'Login Failed',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        navigate('/dashboard');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <LoginView
      onSubmit={handleLogin}
      errorMessage={error}
      isLoading={isLoading}
      onNavigateToSignup={handleNavigateToSignup}
    />
  );
}
