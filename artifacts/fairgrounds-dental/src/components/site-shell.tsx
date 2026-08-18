import { lazy, Suspense, type ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Menu,
  Navigation,
  Phone,
  X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/new-patients", label: "New Patients" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

const googleMapsDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=200+Fairgrounds+Dr%2C+Vallejo%2C+CA+94589";

const LazyMobileActionBar = lazy(() => import("./mobile-action-bar"));

export function Logo() {
  return (
    <Link
      href="/"
      className="focus-ring inline-flex shrink-0 items-center"
      data-testid="link-logo"
    >
      <img
        src="/images/fairgroundsdental-logo.png"
        alt="Fairgrounds Dental Practice"
        className="h-auto w-[min(51vw,144px)] max-w-none sm:w-[176px] lg:w-[200px]"
      />
    </Link>
  );
}

export function Header({
  onMenuOpenChange,
}: {
  onMenuOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    onMenuOpenChange?.(open);
  }, [onMenuOpenChange, open]);

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md">
      <div className="container-wide flex min-h-[120px] items-center justify-between gap-4 pt-3 pb-2 sm:min-h-[140px] sm:pt-4 sm:pb-3 lg:min-h-[150px]">
        <Logo />
        <nav
          className="hidden items-center gap-5 xl:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={location === item.href ? "page" : undefined}
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(" ", "-")}`}
              className={`focus-ring whitespace-nowrap text-[15px] font-semibold transition-colors hover:text-primary ${location === item.href ? "text-primary" : "text-muted-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <a
            href="tel:7075528195"
            data-testid="link-header-phone"
            className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-lg border border-primary/25 px-4 text-sm font-bold text-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            <Phone className="size-4 text-accent" aria-hidden="true" />
            <span>Call 707-552-8195</span>
          </a>
          <Link
            href="/contact"
            data-testid="link-header-appointment"
            className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Request appointment{" "}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          data-testid="button-mobile-menu"
          className="focus-ring grid size-[52px] shrink-0 place-items-center rounded-lg border border-primary/25 bg-secondary text-primary shadow-sm xl:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="size-8" strokeWidth={2.75} />
          ) : (
            <Menu className="size-8" strokeWidth={2.75} />
          )}
        </button>
      </div>
      {open && (
        <div className="animate-fade border-t border-border/70 bg-card px-5 py-5 xl:hidden">
          <nav
            className="container-wide flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                className="focus-ring flex min-h-12 items-center rounded-xl px-3 py-3 text-lg font-semibold text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              data-testid="link-mobile-appointment"
              className="focus-ring mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 font-semibold text-primary-foreground"
            >
              <CalendarDays className="size-4" /> Request an appointment
            </Link>
            <a
              href="tel:7075528195"
              data-testid="link-mobile-phone"
              className="focus-ring flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-3 py-3 font-semibold text-accent-foreground"
            >
              <Phone className="size-4" /> Call 707-552-8195
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export function UrgentBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container-wide flex min-h-12 flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-center text-base font-semibold sm:justify-between sm:text-left">
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent" /> Dental emergency?
          Same-day visits are available.
        </span>
        <a
          href="tel:7075528195"
          data-testid="link-urgent-call"
          className="focus-ring min-h-8 py-1 underline decoration-primary-foreground/40 underline-offset-4 hover:decoration-primary-foreground"
        >
          Call 707-552-8195
        </a>
      </div>
    </div>
  );
}

export function Footer() {
  const [location] = useLocation();
  const showMap = location.replace(/\/$/, "") !== "/contact";

  return (
    <footer className="bg-primary pb-20 text-background lg:pb-0">
      <div className="container-wide grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_.8fr]">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-2xl font-bold text-background">
              Fairgrounds Dental Practice
            </p>
            <p className="mt-4 max-w-md text-lg leading-8 text-background/80">
              Thoughtful dentistry for Vallejo families, with clear answers,
              insurance help, and a direct phone line when you need us.
            </p>
            <a
              href="tel:7075528195"
              data-testid="link-footer-phone"
              className="focus-ring mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-5 text-lg font-bold text-accent-foreground"
            >
              <Phone className="size-5" /> 707-552-8195
            </a>
          </div>
          <div>
            <p className="text-base font-bold uppercase tracking-[0.12em] text-background/70">
              Explore
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-lg text-background/80 sm:flex sm:flex-col sm:items-start">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-testid={`link-footer-${item.label.toLowerCase().replaceAll(" ", "-")}`}
                  className="focus-ring transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:pl-8">
          <p className="text-base font-bold uppercase tracking-[0.12em] text-background/70">
            Find us
          </p>
          <div className="mt-5 space-y-4 text-lg leading-8 text-background/80">
            {showMap && (
              <div className="overflow-hidden rounded-lg border border-background/15">
                <iframe
                  title="Fairgrounds Dental Practice map"
                  src="https://www.google.com/maps?q=200+Fairgrounds+Dr,+Vallejo,+CA+94589&output=embed"
                  className="h-52 w-full md:h-72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
            <p className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" />
              200 Fairgrounds Dr
              <br />
              Vallejo, CA 94589
            </p>
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-footer-directions"
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg border border-background/15 px-4 py-2 text-base font-bold text-background transition-colors hover:bg-background/10"
            >
              <Navigation className="size-4 text-accent" />
              Google Maps directions
            </a>
            <div className="flex gap-3 rounded-lg border border-background/15 px-4 py-3">
              <Clock3 className="mt-1 size-4 shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-background/70">
                  Office hours
                </p>
                <dl className="mt-2 grid gap-x-6 gap-y-1.5 text-base sm:grid-cols-2">
                  <div className="flex justify-between gap-5">
                    <dt>Monday</dt>
                    <dd className="font-semibold text-background">8am-5pm</dd>
                  </div>
                  <div className="flex justify-between gap-5">
                    <dt>Tuesday</dt>
                    <dd className="font-semibold text-background">8am-5pm</dd>
                  </div>
                  <div className="flex justify-between gap-5">
                    <dt>Wednesday</dt>
                    <dd className="font-semibold text-background">8am-5pm</dd>
                  </div>
                  <div className="flex justify-between gap-5">
                    <dt>Thursday</dt>
                    <dd className="font-semibold text-background">8am-5pm</dd>
                  </div>
                  <div className="flex justify-between gap-5 sm:col-span-2">
                    <dt>Friday-Sunday</dt>
                    <dd className="font-semibold text-background">Closed</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/15">
        <div className="container-wide flex flex-wrap justify-between gap-3 py-6 text-sm text-background/55">
          <span>© {new Date().getFullYear()} Fairgrounds Dental Practice</span>
          <span>Vallejo, California</span>
        </div>
      </div>
    </footer>
  );
}

function DeferredMobileActionBar({ hidden }: { hidden: boolean }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    let frame = 0;

    const updateVisibility = () => {
      const revealOffset = Math.max(window.innerHeight * 1.25, 800);
      const shouldShow = !hidden && window.scrollY >= revealOffset;

      setIsVisible(shouldShow);

      if (shouldShow) {
        setShouldLoad(true);
      }
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateVisibility);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [hidden]);

  if (!shouldLoad || !isVisible) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <LazyMobileActionBar />
    </Suspense>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden">
      <UrgentBar />
      <Header onMenuOpenChange={setIsMobileMenuOpen} />
      <div>{children}</div>
      <Footer />
      <DeferredMobileActionBar hidden={isMobileMenuOpen} />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p
        className={`text-sm font-bold uppercase ${light ? "text-accent" : "text-primary"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-[2rem] font-bold leading-tight sm:text-5xl ${light ? "text-background" : "text-foreground"}`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`mt-5 max-w-xl text-lg leading-8 ${light ? "text-background/80" : "text-muted-foreground"}`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="focus-ring rounded text-primary hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageIntro({
  eyebrow,
  title,
  body,
  breadcrumbs,
  visual,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  breadcrumbs?: BreadcrumbItem[];
  visual?: ReactNode;
  children?: ReactNode;
}) {
  const content = (
    <div className="max-w-3xl animate-rise">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <p className="text-sm font-bold uppercase text-primary">{eyebrow}</p>
      <h1 className="font-logo mt-4 text-[2.75rem] font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        {body}
      </p>
      {children}
    </div>
  );

  if (!visual) {
    return (
      <section className="relative overflow-hidden bg-secondary/55">
        <div className="container-wide relative py-14 sm:py-20 lg:py-24">
          {content}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-secondary/55">
      <div className="container-wide relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-16 lg:py-24">
        {content}
        <div
          className="animate-rise lg:justify-self-end"
          style={{ animationDelay: ".08s" }}
        >
          {visual}
        </div>
      </div>
    </section>
  );
}
