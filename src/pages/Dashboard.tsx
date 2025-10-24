import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/model/authService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import type { User, Session } from '@supabase/supabase-js';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = authService.onAuthStateChange((session, user) => {
      setSession(session);
      setUser(user);
      setIsLoading(false);

      if (!session) {
        navigate('/login');
      }
    });

    // THEN check for existing session
    authService.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (!session) {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.error) {
      toast({
        title: 'Logout Failed',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      navigate('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dashboard
          </h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-border/50 hover:bg-secondary/50"
          >
            Logout
          </Button>
        </div>

        <div className="grid gap-6">
          <Card className="backdrop-blur-sm bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome Back!</CardTitle>
              <CardDescription>
                You're successfully authenticated using MVP architecture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium">{user?.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="text-foreground font-mono text-sm">{user?.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Session Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>MVP Architecture</CardTitle>
              <CardDescription>
                This app demonstrates clean separation of concerns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium text-primary">Model</p>
                <p className="text-xs text-muted-foreground mt-1">
                  authService.ts - Handles authentication API calls
                </p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm font-medium text-accent">View</p>
                <p className="text-xs text-muted-foreground mt-1">
                  LoginView.tsx, SignupView.tsx - Pure UI components
                </p>
              </div>
              <div className="p-3 rounded-lg bg-secondary border border-border">
                <p className="text-sm font-medium text-foreground">Presenter</p>
                <p className="text-xs text-muted-foreground mt-1">
                  LoginPresenter.tsx, SignupPresenter.tsx - Business logic
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
