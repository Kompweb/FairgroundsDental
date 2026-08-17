import { type ReactNode, useState } from "react";
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
        className="h-auto w-[min(68vw,340px)] max-w-none lg:w-[420px]"
      />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md">
      <div className="container-wide flex min-h-[132px] items-center justify-between gap-4 lg:min-h-[156px]">
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
              className={`focus-ring text-[15px] font-semibold transition-colors hover:text-primary ${location === item.href ? "text-primary" : "text-muted-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 2xl:flex">
          <a
            href="tel:7075528195"
            data-testid="link-header-phone"
            className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-lg border border-primary/25 px-4 text-base font-bold text-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            <Phone className="size-4 text-accent" aria-hidden="true" />
            <span>Call 707-552-8195</span>
          </a>
          <Link
            href="/contact"
            data-testid="link-header-appointment"
            className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
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
        <div className="animate-fade border-t border-border/70 bg-card px-5 py-5 lg:hidden">
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

export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/95 px-4 pt-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_hsl(201_37%_18%/.08)] backdrop-blur-md lg:hidden"
      aria-label="Quick actions"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a
          href="tel:7075528195"
          data-testid="link-mobile-sticky-call"
          className="focus-ring flex min-h-14 items-center justify-center gap-2 rounded-lg bg-accent px-2 text-base font-bold text-accent-foreground"
        >
          <Phone className="size-5" /> Call office
        </a>
        <Link
          href="/contact"
          data-testid="link-mobile-sticky-appointment"
          className="focus-ring flex min-h-14 items-center justify-center gap-2 rounded-lg bg-primary px-2 text-base font-bold text-primary-foreground"
        >
          <CalendarDays className="size-5" /> Appointment
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground pb-20 text-background lg:pb-0">
      <div className="container-wide grid gap-12 py-14 md:grid-cols-[1.25fr_1fr_1fr] md:py-20">
        <div>
          <p className="text-xl font-bold text-background">
            Fairgrounds Dental Practice
          </p>
          <p className="mt-4 max-w-sm text-base leading-7 text-background/80">
            Thoughtful dentistry for Vallejo families, with clear answers,
            insurance help, and a direct phone line when you need us.
          </p>
          <a
            href="tel:7075528195"
            data-testid="link-footer-phone"
            className="focus-ring mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-4 text-base font-bold text-accent-foreground"
          >
            <Phone className="size-5" /> 707-552-8195
          </a>
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-background/65">
            Explore
          </p>
          <div className="mt-5 flex flex-col items-start gap-3 text-base text-background/80">
            {navItems.slice(0, 4).map((item) => (
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
        <div>
          <p className="text-sm font-bold uppercase text-background/65">
            Find us
          </p>
          <div className="mt-5 space-y-4 text-base leading-7 text-background/80">
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
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg border border-background/15 px-3 py-2 text-sm font-bold text-background transition-colors hover:bg-background/10"
            >
              <Navigation className="size-4 text-accent" />
              Google Maps directions
            </a>
            <p className="flex gap-3">
              <Clock3 className="mt-1 size-4 shrink-0 text-accent" />
              Mon–Thu · 8am–5pm
              <br />
              Fri–Sun · Closed
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-background/15">
        <div className="container-wide flex flex-wrap justify-between gap-3 py-5 text-xs text-background/45">
          <span>© {new Date().getFullYear()} Fairgrounds Dental Practice</span>
          <span>Vallejo, California</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden">
      <UrgentBar />
      <Header />
      <div className="pb-20 lg:pb-0">{children}</div>
      <Footer />
      <MobileActionBar />
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

export function PageIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden bg-secondary/55">
      <div className="container-wide relative py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl animate-rise">
          <p className="text-sm font-bold uppercase text-primary">{eyebrow}</p>
          <h1 className="mt-4 text-[2.75rem] font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
