import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Clock3, MapPin, Menu, Phone, X } from 'lucide-react';

const navItems = [
  { href: '/about', label: 'Our practice' },
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
        <span className="block text-[13px] font-bold tracking-[.17em] text-primary">FAIRGROUNDS</span>
        <span className="mt-1 block text-[11px] font-medium tracking-[.12em] text-muted-foreground">DENTAL PRACTICE</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container-wide flex h-[74px] items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`focus-ring text-[13px] font-semibold transition-colors hover:text-primary ${location === item.href ? 'text-primary' : 'text-muted-foreground'}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <a href="tel:7075528195" data-testid="link-header-phone" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
            <Phone className="size-4 text-accent" aria-hidden="true" />
            <span className="hidden xl:inline">707-552-8195</span>
            <span className="xl:hidden">Call us</span>
          </a>
          <Link href="/contact" data-testid="link-header-appointment" className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
            Book a visit <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu" className="focus-ring rounded-xl p-2 text-foreground sm:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div className="animate-fade border-t border-border/70 bg-card px-5 py-5 sm:hidden">
          <nav className="container-wide flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`} className="focus-ring rounded-xl px-3 py-3 text-base font-semibold text-foreground hover:bg-secondary">
                {item.label}
              </Link>
            ))}
            <a href="tel:7075528195" data-testid="link-mobile-phone" className="focus-ring mt-3 flex items-center gap-2 rounded-xl bg-accent px-3 py-3 font-semibold text-accent-foreground">
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
      <div className="container-wide flex min-h-10 flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-center text-xs font-semibold sm:justify-between sm:text-left">
        <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-accent" /> Same-day emergency visits available</span>
        <a href="tel:7075528195" data-testid="link-urgent-call" className="focus-ring underline decoration-primary-foreground/40 underline-offset-4 hover:decoration-primary-foreground">Call 707-552-8195</a>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide grid gap-12 py-14 md:grid-cols-[1.25fr_1fr_1fr] md:py-20">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-6 text-background/65">Thoughtful dentistry for Vallejo families, with a little more time for the questions that matter.</p>
          <a href="tel:7075528195" data-testid="link-footer-phone" className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent"><Phone className="size-4" /> 707-552-8195</a>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-background/50">Explore</p>
          <div className="mt-5 flex flex-col items-start gap-3 text-sm text-background/75">
            {navItems.slice(0, 4).map((item) => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`} className="focus-ring transition-colors hover:text-accent">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-background/50">Find us</p>
          <div className="mt-5 space-y-4 text-sm leading-6 text-background/75">
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
  return <div className="grain min-h-[100dvh] overflow-x-hidden"><UrgentBar /><Header />{children}<Footer /></div>;
}

export function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      <p className={`text-xs font-bold uppercase tracking-[.19em] ${light ? 'text-accent' : 'text-primary'}`}>{eyebrow}</p>
      <h2 className={`font-display mt-3 text-4xl leading-[.98] tracking-tight sm:text-5xl ${light ? 'text-background' : 'text-foreground'}`}>{title}</h2>
      {body && <p className={`mt-5 max-w-xl text-base leading-7 ${light ? 'text-background/70' : 'text-muted-foreground'}`}>{body}</p>}
    </div>
  );
}

export function PageIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="relative overflow-hidden bg-secondary/55">
      <div className="container-wide relative py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl animate-rise">
          <p className="text-xs font-bold uppercase tracking-[.19em] text-primary">{eyebrow}</p>
          <h1 className="font-display mt-4 text-5xl leading-[.92] tracking-tight text-foreground sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{body}</p>
        </div>
        <div className="absolute -right-20 -top-24 hidden size-72 rounded-full border-[34px] border-accent/25 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}