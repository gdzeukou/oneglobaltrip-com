import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full border-card-border shadow-luxury">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <CardTitle className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Something went wrong
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            We encountered an error while loading the application.
          </p>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => window.location.reload()}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reload page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
