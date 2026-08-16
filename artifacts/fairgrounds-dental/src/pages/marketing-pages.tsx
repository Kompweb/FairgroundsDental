import { type ReactNode, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  CreditCard,
  HeartHandshake,
  MapPin,
  Navigation,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { PageMeta } from "@/components/seo";
import { PageIntro, SectionHeading } from "@/components/site-shell";

const googleMapsDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=200+Fairgrounds+Dr%2C+Vallejo%2C+CA+94589";

const officeStreetViewUrl =
  "https://maps.google.com/maps?layer=c&cbll=38.123570,-122.230946&cbp=11,285,0,0,0&output=svembed";

const services = [
  {
    title: "Everyday care",
    text: "Exams, cleanings, fillings, and a steady plan for keeping your smile comfortable.",
    icon: ShieldCheck,
  },
  {
    title: "Family dentistry",
    text: "A patient, encouraging place for growing smiles, busy parents, and every age in between.",
    icon: UsersRound,
  },
  {
    title: "Confident smiles",
    text: "Whitening, crowns, orthodontics, and cosmetic care shaped around your goals.",
    icon: Sparkles,
  },
  {
    title: "When it cannot wait",
    text: "Same-day emergency appointments when pain or a broken tooth needs attention now.",
    icon: CircleAlert,
  },
  {
    title: "Restorative care",
    text: "Implants, root canals, and same-day crowns designed to get life moving again.",
    icon: Stethoscope,
  },
  {
    title: "Night guards",
    text: "Custom protection for teeth that grind, clench, or need a little more care overnight.",
    icon: HeartHandshake,
  },
];

const testimonials = [
  {
    quote:
      "The whole team made me feel like a person, not a number. They explained every step and never rushed me.",
    name: "A Fairgrounds patient",
    detail: "Vallejo, CA",
  },
  {
    quote:
      "I was able to get a same-day crown and leave with my normal smile back. Kind, clear, and very efficient.",
    name: "A Fairgrounds patient",
    detail: "Vallejo, CA",
  },
  {
    quote:
      "My kids are actually comfortable going to the dentist now. That says everything about this office.",
    name: "A Fairgrounds parent",
    detail: "Vallejo, CA",
  },
];

function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      data-testid={`link-cta-${href.replace("/", "") || "home"}`}
      className={`focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-bold transition-colors ${secondary ? "border border-primary/25 bg-background text-primary hover:bg-secondary" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
    >
      {children}
      <ArrowRight className="size-5" aria-hidden="true" />
    </Link>
  );
}

function HeroVisual() {
  return (
    <aside
      className="mx-auto w-full max-w-[520px] overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]"
      aria-label="Fairgrounds Dental office location"
    >
      <div className="relative aspect-[4/3] min-h-[300px] bg-secondary">
        <iframe
          title="Street view of Fairgrounds Dental Practice at 200 Fairgrounds Drive"
          src={officeStreetViewUrl}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="border-t border-border p-5 sm:p-6">
        <p className="text-sm font-bold uppercase text-primary">
          Visit us in Vallejo
        </p>
        <h2 className="mt-2 text-2xl font-bold leading-tight text-foreground">
          Fairgrounds Dental Practice
        </h2>
        <p className="mt-3 flex gap-3 text-base leading-7 text-muted-foreground">
          <MapPin className="mt-1 size-5 shrink-0 text-accent" />
          <span>
            200 Fairgrounds Dr
            <br />
            Vallejo, CA 94589
          </span>
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="link-hero-directions"
            className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-base font-bold text-primary-foreground"
          >
            <Navigation className="size-5" /> Directions
          </a>
          <a
            href="tel:7075528195"
            className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-primary/25 bg-background px-4 text-base font-bold text-primary"
          >
            <Phone className="size-5" /> Call office
          </a>
        </div>
      </div>
      <div className="divide-y divide-border border-t border-border bg-background">
        {[
          [
            "Same-day emergency visits",
            "Call for tooth pain, swelling, or a broken tooth.",
          ],
          [
            "Most PPO insurance accepted",
            "We can help check your benefits before treatment.",
          ],
          ["Same-day crowns available", "Ask whether your case may qualify."],
        ].map(([title, detail]) => (
          <div key={title} className="flex gap-4 p-4">
            <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Check className="size-4" />
            </span>
            <div>
              <strong className="block text-base text-foreground">
                {title}
              </strong>
              <span className="mt-1 block text-base leading-7 text-muted-foreground">
                {detail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-border bg-card">
      <div className="container-wide grid gap-5 py-7 text-base sm:grid-cols-3 sm:gap-8">
        <div className="flex gap-3">
          <BadgeCheck className="mt-0.5 size-6 shrink-0 text-primary" />
          <div>
            <strong className="block text-foreground">
              Accepting new patients
            </strong>
            <span className="text-muted-foreground">
              Simple scheduling by phone or form.
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 size-6 shrink-0 text-primary" />
          <div>
            <strong className="block text-foreground">Insurance help</strong>
            <span className="text-muted-foreground">
              Most PPO plans accepted.
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Clock3 className="mt-0.5 size-6 shrink-0 text-primary" />
          <div>
            <strong className="block text-foreground">
              Same-day emergencies
            </strong>
            <span className="text-muted-foreground">
              Call when pain cannot wait.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicePreview() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Care that fits real life"
          title="Your smile has a story. We listen first."
          body="From a first cleaning to a same-day crown, our care is built around clear choices and a team you can trust."
        />
        <ButtonLink href="/services" secondary>
          See all services
        </ButtonLink>
      </div>
      <div className="mt-12 divide-y divide-border border-y border-border">
        {services.slice(0, 6).map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              href="/services"
              key={service.title}
              data-testid={`card-service-${index}`}
              className="focus-ring group grid gap-4 bg-background py-6 transition-colors hover:bg-secondary/35 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6"
            >
              <span className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-6" />
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  0{index + 1}
                </span>
              </span>
              <span>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-1 max-w-2xl text-base leading-7 text-muted-foreground">
                  {service.text}
                </p>
              </span>
              <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function DoctorMini() {
  return (
    <section className="bg-secondary/55 py-20 sm:py-28">
      <div className="container-wide grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
        <SectionHeading
          eyebrow="The people behind the practice"
          title="Experienced hands. Present humans."
          body="Dr. Ayoub Al Alousi and Dr. Wid Al Hussain believe good dentistry starts with a conversation. You’ll always know what we see, what we recommend, and why."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <DoctorCard
            initials="AA"
            imageAlt="Ayoub Al Alousi, DDS"
            imageSrc="/images/doctors/dr-ayoub.jpg"
            name="Ayoub Al Alousi"
          />
          <DoctorCard
            initials="WH"
            imageAlt="Wid Al Hussain, DDS"
            imageSrc="/images/doctors/dr-wid.jpg"
            name="Wid Al Hussain"
            coral
          />
        </div>
        <div className="flex flex-wrap gap-4 lg:col-start-2">
          <Link
            href="/about"
            data-testid="link-home-doctors"
            className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary"
          >
            Meet the doctors <ArrowRight className="size-4" />
          </Link>
          <a
            href="tel:7075528195"
            data-testid="link-home-doctor-call"
            className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary"
          >
            Talk with our team <Phone className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function DoctorCard({
  initials,
  imageAlt,
  imageSrc,
  name,
  coral = false,
}: {
  initials: string;
  imageAlt?: string;
  imageSrc?: string;
  name: string;
  coral?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div
        className={`flex aspect-[4/3] min-h-48 items-center justify-center overflow-hidden ${coral ? "bg-accent/35" : "bg-secondary"}`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? `${name}, DDS`}
            className="size-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <span className="grid size-24 place-items-center rounded-lg bg-background text-3xl font-bold text-primary shadow-sm">
            {initials}
          </span>
        )}
      </div>
      <div className="p-6">
        <p className="text-sm font-bold uppercase text-primary">Dentist</p>
        <h3 className="mt-2 text-xl font-bold">{name}, DDS</h3>
        <p className="mt-2 text-base leading-7 text-muted-foreground">
          A thoughtful partner in your care who explains treatment clearly.
        </p>
      </div>
    </div>
  );
}

function ReviewPreview() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr]">
        <SectionHeading
          eyebrow="Words from the chair"
          title="Care you can feel."
          body="The best compliment is a patient who leaves feeling heard, informed, and a little more confident."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.slice(0, 2).map((item, i) => (
            <figure
              key={item.quote}
              className={`rounded-lg p-6 ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card"}`}
            >
              <Quote
                className={`size-7 ${i === 0 ? "text-accent" : "text-primary"}`}
              />
              <blockquote className="mt-7 text-xl leading-8">
                {item.quote}
              </blockquote>
              <figcaption
                className={`mt-8 text-sm font-bold uppercase ${i === 0 ? "text-primary-foreground/80" : "text-muted-foreground"}`}
              >
                {item.name} · {item.detail}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <ButtonLink href="/reviews" secondary>
          Read more patient stories
        </ButtonLink>
      </div>
    </section>
  );
}

function LocationBlock() {
  return (
    <section className="bg-foreground py-16 text-background sm:py-20">
      <div className="container-wide grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
        <div>
          <SectionHeading
            light
            eyebrow="Right here in Vallejo"
            title="Make yourself at home."
            body="Find us on Fairgrounds Drive. We’re easy to reach and ready when your family needs a dental home."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Plan your visit</ButtonLink>
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-home-location-directions"
              className="focus-ring inline-flex min-h-14 items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-bold text-accent-foreground transition-colors hover:bg-accent/85"
            >
              <Navigation className="size-5" /> Directions
            </a>
            <a
              href="tel:7075528195"
              data-testid="link-home-location-call"
              className="focus-ring inline-flex min-h-14 items-center gap-2 rounded-lg border border-background/25 px-6 py-3 text-base font-bold text-background transition-colors hover:bg-background/10"
            >
              <Phone className="size-5" /> Call the office
            </a>
          </div>
        </div>
        <div className="border-t border-background/20 pt-6 text-base text-background/80 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="flex gap-3">
            <MapPin className="size-5 shrink-0 text-accent" />
            200 Fairgrounds Dr
            <br />
            Vallejo, CA 94589
          </p>
          <p className="mt-5 flex gap-3">
            <Clock3 className="size-5 shrink-0 text-accent" />
            Monday–Thursday, 8am–5pm
            <br />
            Friday–Sunday, closed
          </p>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Fairgrounds Dental Practice | Vallejo, CA"
        description="Family, cosmetic, emergency, and same-day crown dentistry in Vallejo. New patients welcome, most PPO insurance accepted, and Cherry financing available."
        path="/"
      />
      <main>
        <section className="relative overflow-hidden bg-background">
          <div className="container-wide grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-16 lg:py-20">
            <div className="relative z-10 animate-rise">
              <p className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-secondary px-4 py-2 text-sm font-bold uppercase text-primary">
                Fairgrounds Dental · Vallejo, CA
              </p>
              <h1 className="mt-6 max-w-3xl text-[2.85rem] font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Family, cosmetic, emergency, and same-day crown dental care.
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-9 text-muted-foreground">
                Clear answers, a calm visit, and easy scheduling for Vallejo
                patients and families.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact">Request appointment</ButtonLink>
                <a
                  href="tel:7075528195"
                  data-testid="link-home-call"
                  className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-primary/25 bg-background px-6 py-3 text-base font-bold text-primary transition-colors hover:bg-secondary"
                >
                  <Phone className="size-5" /> Call 707-552-8195
                </a>
                <a
                  href="tel:7075528195"
                  data-testid="link-home-emergency"
                  className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-accent/60 bg-accent/20 px-6 py-3 text-base font-bold text-foreground transition-colors hover:bg-accent/35"
                >
                  <CircleAlert className="size-5 text-destructive" /> Dental
                  emergency?
                </a>
              </div>
              <div className="mt-6 grid gap-3 text-base font-semibold text-foreground sm:grid-cols-2">
                {[
                  "New patients welcome",
                  "Most PPO insurance accepted",
                  "Cherry financing available",
                  "Same-day emergencies available",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check className="size-5 shrink-0 text-primary" /> {item}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="animate-rise lg:justify-self-end"
              style={{ animationDelay: ".08s" }}
            >
              <HeroVisual />
            </div>
          </div>
        </section>
        <TrustStrip />
        <ServicePreview />
        <DoctorMini />
        <section className="bg-accent/20 py-20 sm:py-24">
          <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Insurance and payment help"
                title="Know the cost before treatment starts."
                body="We accept most PPO insurance plans and can help you understand benefits before care begins. Cherry financing is available for eligible treatment."
              />
              <div className="mt-7 flex flex-wrap gap-2">
                {[
                  "Delta Dental PPO",
                  "MetLife",
                  "Humana",
                  "Guardian",
                  "Cigna",
                  "Zelis",
                  "Argus",
                ].map((plan) => (
                  <span
                    key={plan}
                    className="rounded-lg border border-foreground/15 bg-background/70 px-3 py-2 text-sm font-semibold"
                  >
                    {plan}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-foreground/10 bg-background/75 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div>
                  <p className="text-sm font-bold uppercase text-primary">
                    Your options
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    Clear from the beginning
                  </h3>
                </div>
                <CreditCard className="size-8 text-primary" />
              </div>
              <div className="divide-y divide-border">
                {[
                  "Most PPO plans accepted",
                  "Cherry financing available",
                  "A plan before treatment begins",
                ].map((line) => (
                  <div
                    key={line}
                    className="flex items-center gap-3 py-4 text-base font-semibold"
                  >
                    <Check className="size-5 text-primary" />
                    {line}
                  </div>
                ))}
              </div>
              <ButtonLink href="/new-patients" secondary>
                Explore new patient info
              </ButtonLink>
            </div>
          </div>
        </section>
        <ReviewPreview />
        <LocationBlock />
      </main>
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Fairgrounds Dental | Vallejo, CA"
        description="Meet the dentists and people behind Fairgrounds Dental Practice in Vallejo, California."
        path="/about"
      />
      <main>
        <PageIntro
          eyebrow="A better kind of dental visit"
          title="A practice built around people."
          body="We’re here to make dental care feel more understandable, more comfortable, and more connected to the community we call home."
        />
        <section className="container-wide grid gap-12 py-20 sm:py-28 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <p className="text-sm font-bold uppercase text-primary">
              What to expect
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground">
              A little more time for questions.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Not just a treatment plan. A conversation, a second look, and a
              team in your corner.
            </p>
            <div className="mt-6 space-y-3 text-base font-semibold text-foreground">
              {[
                "Clear explanations",
                "Insurance guidance",
                "Comfortable, practical care",
              ].map((item) => (
                <span key={item} className="flex items-center gap-3">
                  <Check className="size-5 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Our approach"
              title="You deserve a dentist who makes space for the whole picture."
              body="Oral health touches everyday life, and every patient arrives with a different history, comfort level, and goal. We take the time to understand yours before recommending a path forward."
            />
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              <div className="border-t-2 border-accent pt-4">
                <h3 className="text-xl font-bold">Listen carefully</h3>
                <p className="mt-2 text-base leading-7 text-muted-foreground">
                  Your questions and priorities belong in the treatment plan.
                </p>
              </div>
              <div className="border-t-2 border-primary pt-4">
                <h3 className="text-xl font-bold">Explain clearly</h3>
                <p className="mt-2 text-base leading-7 text-muted-foreground">
                  No confusing handoffs or surprises about what comes next.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-secondary/55 py-20 sm:py-28">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Meet your doctors"
              title="Skilled clinicians, steady guides."
              body="Our doctors bring a team-oriented approach to general, family, cosmetic, and restorative dentistry."
            />
            <div className="mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
              <DoctorCard
                initials="AA"
                imageAlt="Ayoub Al Alousi, DDS"
                imageSrc="/images/doctors/dr-ayoub.jpg"
                name="Ayoub Al Alousi"
              />
              <DoctorCard
                initials="WH"
                imageAlt="Wid Al Hussain, DDS"
                imageSrc="/images/doctors/dr-wid.jpg"
                name="Wid Al Hussain"
                coral
              />
            </div>
          </div>
        </section>
        <section className="container-wide py-20 text-center sm:py-28">
          <HeartHandshake className="mx-auto size-10 text-accent" />
          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Come in for the dentistry. Stay for the way you’re treated.
          </h2>
          <div className="mt-8">
            <ButtonLink href="/contact">Meet us in Vallejo</ButtonLink>
          </div>
        </section>
      </main>
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Dental Services | Fairgrounds Dental Practice"
        description="Explore family, general, cosmetic, orthodontic, restorative, and emergency dental services at Fairgrounds Dental Practice."
        path="/services"
      />
      <main>
        <PageIntro
          eyebrow="Thoughtful care, all in one place"
          title="A complete plan for your smile."
          body="From prevention to the moments that need a little more expertise, our services are designed to keep your care close, clear, and comfortable."
        />
        <section className="container-wide py-20 sm:py-28">
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className={`rounded-lg border p-6 transition-colors sm:p-8 ${index === 2 ? "border-primary bg-primary text-primary-foreground md:col-span-2 lg:col-span-1" : "border-border bg-card hover:bg-secondary/35"}`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid size-12 place-items-center rounded-lg ${index === 2 ? "bg-background/15 text-accent" : "bg-secondary text-primary"}`}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span
                      className={`font-mono text-sm ${index === 2 ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <h2 className="mt-10 text-2xl font-bold">{service.title}</h2>
                  <p
                    className={`mt-3 max-w-md text-base leading-7 ${index === 2 ? "text-primary-foreground/85" : "text-muted-foreground"}`}
                  >
                    {service.text}
                  </p>
                  <a
                    href="tel:7075528195"
                    data-testid={`link-service-call-${index}`}
                    className={`focus-ring mt-8 inline-flex min-h-12 items-center gap-2 text-base font-bold ${index === 2 ? "text-accent" : "text-primary"}`}
                  >
                    Talk with our team <ArrowRight className="size-5" />
                  </a>
                </article>
              );
            })}
          </div>
        </section>
        <section className="bg-foreground py-16 text-background sm:py-20">
          <div className="container-wide flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-accent">
                Not sure where to start?
              </p>
              <h2 className="mt-3 text-4xl font-bold leading-tight">
                Tell us what’s going on.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-background/80">
                A quick phone call can help you decide whether to schedule a
                cleaning, consultation, or urgent visit.
              </p>
            </div>
            <ButtonLink href="/contact">Request a visit</ButtonLink>
          </div>
        </section>
      </main>
    </>
  );
}

export function NewPatientsPage() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    {
      q: "What should I bring?",
      a: "Bring a photo ID, your insurance information, and any current medication details. Most importantly, bring your questions.",
    },
    {
      q: "Do you accept my insurance?",
      a: "We accept most PPO insurance plans and are in-network with Delta Dental PPO, MetLife, Humana, Guardian, Cigna, Zelis, and Argus. Our team can help you understand your benefits.",
    },
    {
      q: "Can I use financing?",
      a: "Yes. Cherry financing is available for eligible care, so you can talk through a plan that fits your needs.",
    },
  ];
  return (
    <>
      <PageMeta
        title="New Patients | Fairgrounds Dental Practice"
        description="New to Fairgrounds Dental Practice? Learn about insurance, Cherry financing, your first visit, and how to request an appointment."
        path="/new-patients"
      />
      <main>
        <PageIntro
          eyebrow="Welcome in"
          title="Your first visit should feel simple."
          body="We’ll help with the practical details and the human ones, from insurance questions to knowing what to expect when you take a seat."
        />
        <section className="container-wide grid gap-12 py-20 sm:py-28 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Before you arrive"
              title="A little prepared. Never over-prepared."
              body="We’ll meet you where you are and make space for a real conversation about your health, comfort, and goals."
            />
            <div className="mt-8 space-y-5">
              {[
                "Share your goals and health history",
                "Meet your care team and ask anything",
                "Leave with a clear next step",
              ].map((step, i) => (
                <div key={step} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{step}</h3>
                    <p className="mt-1 text-base leading-7 text-muted-foreground">
                      {
                        [
                          "We’ll review the details that help us care for you well.",
                          "We’ll explain what we’re looking at and why it matters.",
                          "If treatment is needed, we’ll talk through options together.",
                        ][i]
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="tel:7075528195"
                data-testid="link-new-patient-call"
                className="focus-ring inline-flex min-h-12 items-center gap-2 text-base font-bold text-primary"
              >
                <Phone className="size-5" /> Questions? Call 707-552-8195
              </a>
              <ButtonLink href="/contact" secondary>
                Request a visit
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <p className="text-sm font-bold uppercase text-primary">
              Common questions
            </p>
            <div className="mt-5 divide-y divide-border">
              {faqs.map((faq, i) => (
                <div key={faq.q}>
                  <button
                    type="button"
                    aria-expanded={open === i}
                    data-testid={`button-faq-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                    className="focus-ring flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left text-base font-bold"
                  >
                    {faq.q}
                    <ChevronDown
                      className={`size-5 shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open === i && (
                    <p className="animate-fade max-w-xl pb-5 pr-6 text-base leading-7 text-muted-foreground">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-foreground py-12 text-background sm:py-16">
          <div className="container-wide grid gap-6 sm:grid-cols-3 sm:gap-8">
            <div>
              <p className="text-sm font-bold uppercase text-accent">
                Insurance
              </p>
              <p className="mt-2 text-base leading-7 text-background/80">
                Most PPO plans accepted, including Delta Dental PPO, MetLife,
                Humana, Guardian, Cigna, Zelis, and Argus.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase text-accent">
                Financing
              </p>
              <p className="mt-2 text-base leading-7 text-background/80">
                Cherry financing is available for eligible care. Ask our team
                about your options.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase text-accent">
                Urgent needs
              </p>
              <p className="mt-2 text-base leading-7 text-background/80">
                Same-day emergency appointments are available. Call{" "}
                <a
                  href="tel:7075528195"
                  className="font-bold text-accent underline underline-offset-4"
                >
                  707-552-8195
                </a>
                .
              </p>
            </div>
          </div>
        </section>
        <section className="bg-secondary/55 py-20 sm:py-28">
          <div className="container-wide grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <SectionHeading
                eyebrow="Let’s make a plan"
                title="Start with a conversation."
                body="Send a request and our team will follow up during office hours. Or call if you’d rather talk it through."
              />
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <AppointmentForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export function ReviewsPage() {
  return (
    <>
      <PageMeta
        title="Patient Reviews | Fairgrounds Dental Practice"
        description="Read what patients say about the warm, clear, personal care at Fairgrounds Dental Practice in Vallejo."
        path="/reviews"
      />
      <main>
        <PageIntro
          eyebrow="From our patients"
          title="The feeling we hope you take home."
          body="Every review is a reminder that the details matter: a careful explanation, a kind hello, a little less worry."
        />
        <section className="container-wide py-20 sm:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              eyebrow="Patient stories"
              title="A few words from the chair."
            />
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-base font-bold">
              <span className="flex gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="size-5 fill-current" />
                ))}
              </span>{" "}
              Trusted by Vallejo families
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((item, i) => (
              <figure
                key={item.quote}
                className={`rounded-lg p-7 sm:p-9 ${i === 1 ? "bg-primary text-primary-foreground" : "border border-border bg-card"}`}
              >
                <Quote
                  className={`size-8 ${i === 1 ? "text-accent" : "text-primary"}`}
                />
                <blockquote className="mt-8 max-w-lg text-2xl font-bold leading-tight">
                  “{item.quote}”
                </blockquote>
                <figcaption
                  className={`mt-10 text-sm font-bold uppercase ${i === 1 ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                >
                  {item.name}
                  <br />
                  <span className="normal-case">{item.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="bg-accent/25 py-16 sm:py-20">
          <div className="container-wide flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-primary">
                Have a story to share?
              </p>
              <h2 className="mt-2 text-4xl font-bold leading-tight">
                Your experience helps a neighbor.
              </h2>
            </div>
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              data-testid="link-google-review"
              className="focus-ring inline-flex min-h-14 items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-primary-foreground"
            >
              Leave a Google review <ArrowRight className="size-5" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact Fairgrounds Dental | Vallejo, CA"
        description="Call, email, find, or request an appointment with Fairgrounds Dental Practice at 200 Fairgrounds Dr in Vallejo."
        path="/contact"
      />
      <main>
        <PageIntro
          eyebrow="We’re here to help"
          title="Let’s find a good time."
          body="Call for the quickest response, or send a request below and we’ll be in touch during office hours."
        />
        <section className="container-wide grid gap-10 py-20 sm:py-28 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <SectionHeading
              eyebrow="Reach the office"
              title="Good questions welcome."
              body="Whether you’re ready to book or just trying to understand your options, our team is happy to help."
            />
            <div className="mt-10 space-y-5">
              <a
                href="tel:7075528195"
                data-testid="link-contact-phone"
                className="focus-ring flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:bg-secondary"
              >
                <span className="grid size-12 place-items-center rounded-lg bg-accent/40 text-primary">
                  <Phone className="size-6" />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase text-muted-foreground">
                    Call us
                  </span>
                  <strong className="mt-1 block text-2xl text-primary">
                    707-552-8195
                  </strong>
                </span>
              </a>
              <a
                href="mailto:office@fairgroundsdental.com"
                data-testid="link-contact-email"
                className="focus-ring flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:bg-secondary"
              >
                <span className="grid size-12 place-items-center rounded-lg bg-secondary text-xl font-bold text-primary">
                  @
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase text-muted-foreground">
                    Email
                  </span>
                  <strong className="mt-1 block break-all text-base text-primary">
                    office@fairgroundsdental.com
                  </strong>
                </span>
              </a>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="link-contact-directions-card"
                className="focus-ring flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:bg-secondary"
              >
                <span className="grid size-12 place-items-center rounded-lg bg-accent/40 text-primary">
                  <MapPin className="size-6" />
                </span>
                <span className="text-base leading-7">
                  <span className="block text-sm font-bold uppercase text-muted-foreground">
                    Office location
                  </span>
                  <strong className="mt-1 block text-xl text-primary">
                    200 Fairgrounds Dr
                  </strong>
                  <span className="block text-foreground">
                    Vallejo, CA 94589
                  </span>
                  <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Open Google Maps <Navigation className="size-4" />
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-4 p-5">
                <Clock3 className="mt-1 size-6 shrink-0 text-accent" />
                <p className="text-base leading-7">
                  <strong className="block">Monday–Thursday · 8am–5pm</strong>
                  Friday–Sunday · Closed
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase text-primary">
                  Request a visit
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  Tell us a little about what you need.
                </h2>
              </div>
              <CalendarDays className="size-8 text-accent" />
            </div>
            <AppointmentForm />
          </div>
        </section>
        <section className="container-wide pb-20 sm:pb-28">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase text-primary">
                Directions
              </p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-foreground">
                Open the route before you leave.
              </h2>
            </div>
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="link-contact-map-directions"
              className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Navigation className="size-5" /> Google Maps directions
            </a>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-secondary">
            <iframe
              title="Map showing Fairgrounds Dental Practice in Vallejo"
              src="https://www.google.com/maps?q=200+Fairgrounds+Dr,+Vallejo,+CA+94589&output=embed"
              className="h-[300px] w-full border-0 grayscale-[.2] sm:h-[380px]"
              loading="lazy"
            />
          </div>
        </section>
      </main>
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page not found | Fairgrounds Dental Practice"
        description="The page you were looking for could not be found."
        path="/404"
      />
      <main className="container-wide flex min-h-[65vh] flex-col items-start justify-center py-20">
        <p className="text-sm font-bold uppercase text-primary">404</p>
        <h1 className="mt-4 text-5xl font-bold leading-tight">
          That page took a wrong turn.
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted-foreground">
          Let’s get you back to a calmer place.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </main>
    </>
  );
}
