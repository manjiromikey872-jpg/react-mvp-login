import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      <div className="text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            MVP Auth
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Authentication using Model-View-Presenter architecture
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate('/login')}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate('/signup')}
            size="lg"
            variant="outline"
            className="border-border/50 hover:bg-secondary/50"
          >
            Sign Up
          </Button>
        </div>

        <div className="mt-12 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2 text-foreground">Architecture Pattern</h2>
          <p className="text-sm text-muted-foreground">
            Clean separation between Model (data), View (UI), and Presenter (logic)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
