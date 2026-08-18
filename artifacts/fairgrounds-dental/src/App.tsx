import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Route,
  Switch,
  Router as WouterRouter,
  useLocation,
} from 'wouter';
import { SiteShell } from '@/components/site-shell';
import {
  AboutPage,
  ContactPage,
  DentalImplantsPage,
  HomePage,
  NewPatientsPage,
  NotFoundPage,
  PediatricDentistryPage,
  ReviewsPage,
  ServicesPage,
} from '@/pages/marketing-pages';

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey
      ) {
        return;
      }

      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href]')
          : null;

      if (
        !link ||
        link.target ||
        link.hasAttribute('download') ||
        link.hash ||
        link.protocol === 'tel:' ||
        link.protocol === 'mailto:' ||
        link.origin !== window.location.origin
      ) {
        return;
      }

      if (
        link.pathname === window.location.pathname &&
        link.search === window.location.search
      ) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

function Router() {
  return (
    <SiteShell>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route
          path="/services/dental-implants"
          component={DentalImplantsPage}
        />
        <Route
          path="/services/pediatric-dentistry"
          component={PediatricDentistryPage}
        />
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
