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
import { APPOINTMENT_FORM_ID } from '@/lib/appointment-link';
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
const APPOINTMENT_PANEL_ACTIVE = 'appointmentPanelActive';

function setAppointmentPanelActive(active: boolean) {
  const panel = document.getElementById(APPOINTMENT_FORM_ID);

  if (!(panel instanceof HTMLElement)) {
    return;
  }

  if (active) {
    panel.dataset[APPOINTMENT_PANEL_ACTIVE] = 'true';
  } else {
    delete panel.dataset[APPOINTMENT_PANEL_ACTIVE];
  }
}

function scrollToHashTarget(hash = window.location.hash): boolean {
  if (!hash) {
    setAppointmentPanelActive(false);
    return false;
  }

  const id = decodeURIComponent(hash.slice(1));
  if (!id) {
    return false;
  }

  const target = document.getElementById(id);
  if (!target) {
    return false;
  }

  setAppointmentPanelActive(id === APPOINTMENT_FORM_ID);

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  window.requestAnimationFrame(() => {
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY,
      left: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });

    if (id === APPOINTMENT_FORM_ID && target instanceof HTMLElement) {
      target.focus({ preventScroll: true });
    }
  });

  return true;
}

function scrollToHashTargetWhenReady(hash = window.location.hash, attempt = 0) {
  window.requestAnimationFrame(() => {
    if (!scrollToHashTarget(hash) && attempt < 8) {
      scrollToHashTargetWhenReady(hash, attempt + 1);
    }
  });
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      scrollToHashTargetWhenReady();
      return;
    }

    setAppointmentPanelActive(false);
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
        link.protocol === 'tel:' ||
        link.protocol === 'mailto:' ||
        link.origin !== window.location.origin
      ) {
        return;
      }

      if (link.hash) {
        event.preventDefault();

        const destination = `${link.pathname}${link.search}${link.hash}`;
        if (
          link.pathname !== window.location.pathname ||
          link.search !== window.location.search ||
          link.hash !== window.location.hash
        ) {
          window.history.pushState(null, '', destination);
        }

        scrollToHashTargetWhenReady(link.hash);
        return;
      }

      if (
        link.pathname === window.location.pathname &&
        link.search === window.location.search
      ) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
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
