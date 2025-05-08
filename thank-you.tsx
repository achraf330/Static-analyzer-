import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ThankYou() {
  const [email, setEmail] = useState("");
  const [, navigate] = useLocation();

  useEffect(() => {
    // Try to get email from query parameters
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // If no email in URL, could redirect back to home
      // navigate('/');
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Thank You!</CardTitle>
          <CardDescription className="text-lg">
            Your request has been submitted successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>
            We've received your information and payment details. Your comprehensive crypto analysis will be delivered to {email ? <span className="font-semibold">{email}</span> : "your email"} within 24 hours.
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-3 text-amber-800 dark:text-amber-500 text-sm text-left">
            <p className="font-medium">What's next?</p>
            <p>Our team of crypto analysts will review your portfolio and prepare a detailed report with recommendations tailored to your investment goals and risk profile.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => navigate("/")} className="px-6">
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
