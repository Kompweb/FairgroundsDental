import { CalendarDays, Phone } from "lucide-react";
import { Link } from "wouter";

export default function MobileActionBar() {
  return (
    <div
      className="animate-fade fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/95 px-4 pt-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_hsl(201_37%_18%/.08)] backdrop-blur-md lg:hidden"
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
