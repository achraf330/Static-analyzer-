import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home-new"; // Updated to use new home page
import ThankYou from "@/pages/thank-you";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Faq from "@/pages/faq";
import Support from "@/pages/support";
import Submit from "@/pages/submit";
import Sample from "@/pages/sample";
import MainLayout from "@/components/layouts/main-layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/submit" component={Submit} />
      <Route path="/sample" component={Sample} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/faq" component={Faq} />
      <Route path="/support" component={Support} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MainLayout>
          <Router />
        </MainLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
