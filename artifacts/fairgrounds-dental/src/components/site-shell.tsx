import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, CalendarDays, Clock3, MapPin, Menu, Phone, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/new-patients', label: 'New patients' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export function Logo() {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-3" data-testid="link-logo">
      <span className="grid size-10 place-items-center rounded-[13px] bg-primary text-primary-foreground shadow-sm">
        <span className="relative block h-5 w-4 rounded-b-[9px] rounded-t-[12px] bg-accent">
          <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary" />
        </span>
      </span>
      <span className="leading-none">
        <span className="block text-sm font-bold tracking-[.15em] text-primary">FAIRGROUNDS</span>
        <span className="mt-1 block text-xs font-medium tracking-[.1em] text-muted-foreground">DENTAL PRACTICE</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container-wide flex min-h-[82px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-4 xl:gap-5 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={location === item.href ? 'page' : undefined} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`focus-ring text-[13px] font-semibold transition-colors hover:text-primary ${location === item.href ? 'text-primary' : 'text-muted-foreground'}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:7075528195" data-testid="link-header-phone" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/20 px-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary hover:text-primary">
            <Phone className="size-4 text-accent" aria-hidden="true" />
            <span>Call 707-552-8195</span>
          </a>
          <Link href="/contact" data-testid="link-header-appointment" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">
            Request appointment <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu" className="focus-ring grid size-11 place-items-center rounded-xl text-foreground lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div className="animate-fade border-t border-border/70 bg-card px-5 py-5 lg:hidden">
          <nav className="container-wide flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`} className="focus-ring flex min-h-12 items-center rounded-xl px-3 py-3 text-lg font-semibold text-foreground hover:bg-secondary">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} data-testid="link-mobile-appointment" className="focus-ring mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 font-semibold text-primary-foreground">
              <CalendarDays className="size-4" /> Request an appointment
            </Link>
            <a href="tel:7075528195" data-testid="link-mobile-phone" className="focus-ring flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-3 py-3 font-semibold text-accent-foreground">
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
      <div className="container-wide flex min-h-11 flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-center text-sm font-semibold sm:justify-between sm:text-left">
        <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-accent" /> Dental emergency? Same-day visits are available.</span>
        <a href="tel:7075528195" data-testid="link-urgent-call" className="focus-ring min-h-8 py-1 underline decoration-primary-foreground/40 underline-offset-4 hover:decoration-primary-foreground">Call 707-552-8195</a>
      </div>
    </div>
  );
}

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/95 p-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_hsl(201_37%_18%/.08)] backdrop-blur-md lg:hidden" aria-label="Quick actions">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a href="tel:7075528195" data-testid="link-mobile-sticky-call" className="focus-ring flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-2 text-sm font-bold text-accent-foreground"><Phone className="size-4" /> Call now</a>
        <Link href="/contact" data-testid="link-mobile-sticky-appointment" className="focus-ring flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-2 text-sm font-bold text-primary-foreground"><CalendarDays className="size-4" /> Request appointment</Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground pb-20 text-background lg:pb-0">
      <div className="container-wide grid gap-12 py-14 md:grid-cols-[1.25fr_1fr_1fr] md:py-20">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-base leading-7 text-background/75">Thoughtful dentistry for Vallejo families, with a little more time for the questions that matter.</p>
          <a href="tel:7075528195" data-testid="link-footer-phone" className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent"><Phone className="size-4" /> 707-552-8195</a>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-background/50">Explore</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-base text-background/80">
            {navItems.slice(0, 4).map((item) => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`} className="focus-ring transition-colors hover:text-accent">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-background/50">Find us</p>
          <div className="mt-5 space-y-4 text-base leading-7 text-background/80">
            <p className="flex gap-3"><MapPin className="mt-1 size-4 shrink-0 text-accent" />200 Fairgrounds Dr<br />Vallejo, CA 94589</p>
            <p className="flex gap-3"><Clock3 className="mt-1 size-4 shrink-0 text-accent" />Mon–Thu · 8am–5pm<br />Fri–Sun · Closed</p>
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
  return <div className="grain min-h-[100dvh] overflow-x-hidden"><UrgentBar /><Header /><div className="pb-20 lg:pb-0">{children}</div><Footer /><MobileActionBar /></div>;
}

export function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      <p className={`text-xs font-bold uppercase tracking-[.19em] ${light ? 'text-accent' : 'text-primary'}`}>{eyebrow}</p>
      <h2 className={`font-display mt-3 text-[2.15rem] leading-[.98] tracking-tight sm:text-5xl ${light ? 'text-background' : 'text-foreground'}`}>{title}</h2>
      {body && <p className={`mt-5 max-w-xl text-base leading-7 ${light ? 'text-background/70' : 'text-muted-foreground'}`}>{body}</p>}
    </div>
  );
}

export function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="relative overflow-hidden bg-secondary/55">
      <div className="container-wide relative py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl animate-rise">
          <p className="text-xs font-bold uppercase tracking-[.19em] text-primary">{eyebrow}</p>
          <h1 className="font-display mt-4 text-[3.55rem] leading-[.9] tracking-tight text-foreground sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{body}</p>
        </div>
        <div className="absolute -right-20 -top-24 hidden size-72 rounded-full border-[34px] border-accent/25 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}