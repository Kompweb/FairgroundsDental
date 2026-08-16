import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Route,
  Switch,
  Router as WouterRouter,
} from 'wouter';
import { SiteShell } from '@/components/site-shell';
import {
  AboutPage,
  ContactPage,
  HomePage,
  NewPatientsPage,
  NotFoundPage,
  ReviewsPage,
  ServicesPage,
} from '@/pages/marketing-pages';

const queryClient = new QueryClient();

function Router() {
  return (
    <SiteShell>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/new-patients" component={NewPatientsPage} />
        <Route path="/reviews" component={ReviewsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </SiteShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
