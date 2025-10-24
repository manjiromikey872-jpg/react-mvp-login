// PRESENTER - Handles signup logic between View and Model
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupView } from '@/view/SignupView';
import { authService } from '@/model/authService';
import { toast } from '@/hooks/use-toast';

export function SignupPresenter() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const result = await authService.signup({ email, password });

      if (result.error) {
        setError(result.error);
        toast({
          title: 'Signup Failed',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Account Created!',
          description: 'Welcome! You have successfully signed up.',
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

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <SignupView
      onSubmit={handleSignup}
      errorMessage={error}
      isLoading={isLoading}
      onNavigateToLogin={handleNavigateToLogin}
    />
  );
}
