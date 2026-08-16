import { type ReactNode, useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowDownRight,
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
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  UsersRound,
} from 'lucide-react';
import { AppointmentForm } from '@/components/appointment-form';
import { PageMeta } from '@/components/seo';
import { PageIntro, SectionHeading } from '@/components/site-shell';

const services = [
  { title: 'Everyday care', text: 'Exams, cleanings, fillings, and a steady plan for keeping your smile comfortable.', icon: ShieldCheck },
  { title: 'Family dentistry', text: 'A patient, encouraging place for growing smiles, busy parents, and every age in between.', icon: UsersRound },
  { title: 'Confident smiles', text: 'Whitening, crowns, orthodontics, and cosmetic care shaped around your goals.', icon: Sparkles },
  { title: 'When it cannot wait', text: 'Same-day emergency appointments when pain or a broken tooth needs attention now.', icon: CircleAlert },
  { title: 'Restorative care', text: 'Implants, root canals, and same-day crowns designed to get life moving again.', icon: Stethoscope },
  { title: 'Night guards', text: 'Custom protection for teeth that grind, clench, or need a little more care overnight.', icon: HeartHandshake },
];

const testimonials = [
  { quote: 'The whole team made me feel like a person, not a number. They explained every step and never rushed me.', name: 'A Fairgrounds patient', detail: 'Vallejo, CA' },
  { quote: 'I was able to get a same-day crown and leave with my normal smile back. Kind, clear, and very efficient.', name: 'A Fairgrounds patient', detail: 'Vallejo, CA' },
  { quote: 'My kids are actually comfortable going to the dentist now. That says everything about this office.', name: 'A Fairgrounds parent', detail: 'Vallejo, CA' },
];

function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} data-testid={`link-cta-${href.replace('/', '') || 'home'}`} className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5 ${secondary ? 'border border-primary/25 bg-background text-primary hover:bg-secondary' : 'bg-primary text-primary-foreground'}`}>{children}<ArrowRight className="size-4" aria-hidden="true" /></Link>;
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[.86] w-full max-w-[470px] overflow-hidden rounded-[2.2rem] bg-primary p-5 shadow-[var(--shadow-soft)] sm:p-7" aria-label="Abstract illustration of a bright, welcoming dental office" role="img">
      <div className="absolute -right-20 -top-20 size-64 rounded-full border-[42px] border-accent/70" />
      <div className="absolute -bottom-20 -left-16 size-64 rounded-full border-[28px] border-secondary/60" />
      <div className="relative flex h-full flex-col justify-between rounded-[1.7rem] border border-primary-foreground/20 bg-primary-foreground/10 p-6 text-primary-foreground backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-accent-foreground">Vallejo, CA</span>
          <span className="grid size-11 place-items-center rounded-full bg-background/15"><Sparkles className="size-5 text-accent" /></span>
        </div>
        <div>
          <div className="mb-7 flex items-end gap-2">
            <span className="h-28 w-8 rounded-t-full rounded-b-lg bg-background/85" />
            <span className="h-40 w-8 rounded-t-full rounded-b-lg bg-accent" />
            <span className="h-20 w-8 rounded-t-full rounded-b-lg bg-secondary" />
            <span className="h-32 w-8 rounded-t-full rounded-b-lg bg-background/55" />
          </div>
          <p className="font-display text-4xl leading-none">A calmer<br /><em>kind</em> of care.</p>
          <p className="mt-5 max-w-[220px] text-sm leading-6 text-primary-foreground/70">Modern dentistry with room for the human part.</p>
        </div>
      </div>
    </div>
  );
}

function TrustStrip() {
  return <section className="border-b border-border bg-card"><div className="container-wide grid gap-5 py-6 text-sm sm:grid-cols-3 sm:gap-8"><div className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" /><div><strong className="block text-foreground">Accepting new patients</strong><span className="text-muted-foreground">Come as you are.</span></div></div><div className="flex gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" /><div><strong className="block text-foreground">Most PPO insurance accepted</strong><span className="text-muted-foreground">We’ll help you understand it.</span></div></div><div className="flex gap-3"><Clock3 className="mt-0.5 size-5 shrink-0 text-primary" /><div><strong className="block text-foreground">Same-day emergencies</strong><span className="text-muted-foreground">Call when you need us.</span></div></div></div></section>;
}

function ServicePreview() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Care that fits real life" title="Your smile has a story. We listen first." body="From a first cleaning to a same-day crown, our care is built around clear choices and a team you can trust." />
        <ButtonLink href="/services" secondary>See all services</ButtonLink>
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 6).map((service, index) => {
          const Icon = service.icon;
          return <Link href="/services" key={service.title} data-testid={`card-service-${index}`} className="focus-ring group bg-card p-6 transition-colors hover:bg-secondary/60 sm:p-7"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary"><Icon className="size-5" /></span><ArrowDownRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></div><h3 className="mt-8 text-lg font-bold">{service.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{service.text}</p></Link>;
        })}
      </div>
    </section>
  );
}

function DoctorMini() {
  return (
    <section className="bg-secondary/55 py-20 sm:py-28">
      <div className="container-wide grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
        <SectionHeading eyebrow="The people behind the practice" title="Experienced hands. Present humans." body="Dr. Ayoub Al Alousi and Dr. Wid Al Hussain believe good dentistry starts with a conversation. You’ll always know what we see, what we recommend, and why." />
        <div className="grid gap-5 sm:grid-cols-2">
          <DoctorCard initials="AA" name="Ayoub Al Alousi" />
          <DoctorCard initials="WH" name="Wid Al Hussain" coral />
        </div>
      </div>
    </section>
  );
}

function DoctorCard({ initials, name, coral = false }: { initials: string; name: string; coral?: boolean }) {
  return <div className="group overflow-hidden rounded-2xl border border-border bg-card"><div className={`relative flex aspect-[.95] items-end overflow-hidden p-5 ${coral ? 'bg-accent/80' : 'bg-primary/90'}`}><div className="absolute -right-8 -top-8 size-36 rounded-full border-[22px] border-background/25" /><div className="absolute bottom-8 left-8 size-28 rounded-full bg-background/20" /><span className="font-display text-[8rem] leading-none text-background/80">{initials}</span><span className="absolute bottom-5 right-5 rounded-full bg-background/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">DDS</span></div><div className="p-5"><h3 className="font-bold">{name}, DDS</h3><p className="mt-1 text-sm text-muted-foreground">A thoughtful partner in your care</p></div></div>;
}

function ReviewPreview() {
  return <section className="container-wide py-20 sm:py-28"><div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr]"><SectionHeading eyebrow="Words from the chair" title="Care you can feel." body="The best compliment is a patient who leaves feeling heard, informed, and a little more confident." /><div className="grid gap-4 sm:grid-cols-2">{testimonials.slice(0, 2).map((item, i) => <figure key={item.quote} className={`rounded-2xl p-6 ${i === 0 ? 'bg-primary text-primary-foreground' : 'border border-border bg-card'}`}><Quote className={`size-7 ${i === 0 ? 'text-accent' : 'text-primary'}`} /><blockquote className="mt-7 text-lg leading-7">{item.quote}</blockquote><figcaption className={`mt-8 text-xs font-bold uppercase tracking-wider ${i === 0 ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{item.name} · {item.detail}</figcaption></figure>)}</div></div><div className="mt-8"><ButtonLink href="/reviews" secondary>Read more patient stories</ButtonLink></div></section>;
}

function LocationBlock() {
  return <section className="bg-foreground py-16 text-background sm:py-20"><div className="container-wide grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><SectionHeading light eyebrow="Right here in Vallejo" title="Make yourself at home." body="Find us on Fairgrounds Drive. We’re easy to reach and ready when your family needs a dental home." /><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact">Plan your visit</ButtonLink><a href="tel:7075528195" data-testid="link-home-location-call" className="focus-ring inline-flex items-center gap-2 rounded-full border border-background/25 px-5 py-3.5 text-sm font-bold text-background transition-colors hover:bg-background/10"><Phone className="size-4" /> Call the office</a></div></div><div className="border-t border-background/20 pt-6 text-sm text-background/70 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><p className="flex gap-3"><MapPin className="size-5 shrink-0 text-accent" />200 Fairgrounds Dr<br />Vallejo, CA 94589</p><p className="mt-5 flex gap-3"><Clock3 className="size-5 shrink-0 text-accent" />Monday–Thursday, 8am–5pm<br />Friday–Sunday, closed</p></div></div></section>;
}

export function HomePage() {
  return <><PageMeta title="Fairgrounds Dental Practice | Vallejo, CA" description="Warm, modern family and cosmetic dentistry in Vallejo. New patients welcome, most PPO insurance accepted, and same-day emergency visits available." path="/" /><main>
    <section className="relative overflow-hidden"><div className="container-wide grid min-h-[680px] gap-14 py-14 sm:py-20 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-16 lg:py-24"><div className="relative z-10 animate-rise"><p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-3.5 py-2 text-xs font-bold uppercase tracking-[.14em] text-primary"><span className="size-2 rounded-full bg-accent" /> A dental home in Vallejo</p><h1 className="font-display mt-7 max-w-3xl text-[4.1rem] leading-[.88] tracking-[-.04em] text-foreground sm:text-8xl">Care that feels <em className="text-primary">personal.</em></h1><p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">Fairgrounds Dental Practice is a family and cosmetic office where you get thoughtful answers, modern treatment, and the time to feel confident about your care.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><ButtonLink href="/contact">Request an appointment</ButtonLink><a href="tel:7075528195" data-testid="link-home-call" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-background px-5 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-secondary"><Phone className="size-4" /> 707-552-8195</a></div><p className="mt-5 text-xs font-semibold text-muted-foreground">New patients welcome · Cherry financing available</p></div><div className="animate-rise lg:justify-self-end" style={{ animationDelay: '.12s' }}><HeroVisual /></div></div><div className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full border-[45px] border-accent/15" /></section>
    <TrustStrip /><ServicePreview /><DoctorMini /><section className="bg-accent/20 py-20 sm:py-24"><div className="container-wide grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center"><div><SectionHeading eyebrow="A little help with the details" title="Good care should be easy to understand." body="We accept most PPO insurance plans and can walk you through your options before treatment. Cherry financing is available for the care you’re ready for." /><div className="mt-7 flex flex-wrap gap-2">{['Delta Dental PPO', 'MetLife', 'Humana', 'Guardian', 'Cigna', 'Zelis', 'Argus'].map((plan) => <span key={plan} className="rounded-full border border-foreground/15 bg-background/50 px-3 py-2 text-xs font-semibold">{plan}</span>)}</div></div><div className="rounded-2xl border border-foreground/10 bg-background/65 p-6 sm:p-8"><div className="flex items-center justify-between border-b border-border pb-5"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-primary">Your options</p><h3 className="mt-2 text-xl font-bold">Clear from the beginning</h3></div><CreditCard className="size-7 text-primary" /></div><div className="divide-y divide-border">{['Most PPO plans accepted', 'Cherry financing available', 'A plan before treatment begins'].map((line) => <div key={line} className="flex items-center gap-3 py-4 text-sm font-semibold"><Check className="size-4 text-primary" />{line}</div>)}</div><ButtonLink href="/new-patients" secondary>Explore new patient info</ButtonLink></div></div></section><ReviewPreview /><LocationBlock />
  </main></>;
}

export function AboutPage() {
  return <><PageMeta title="About Fairgrounds Dental | Vallejo, CA" description="Meet the dentists and people behind Fairgrounds Dental Practice in Vallejo, California." path="/about" /><main><PageIntro eyebrow="A better kind of dental visit" title="A practice built around people." body="We’re here to make dental care feel more understandable, more comfortable, and more connected to the community we call home." /><section className="container-wide grid gap-12 py-20 sm:py-28 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="relative aspect-square max-w-md overflow-hidden rounded-[2rem] bg-primary p-8 text-primary-foreground"><div className="absolute -right-14 -top-14 size-56 rounded-full border-[35px] border-accent/70" /><div className="relative flex h-full flex-col justify-end"><p className="text-xs font-bold uppercase tracking-[.18em] text-accent">Since day one</p><p className="font-display mt-4 text-6xl leading-[.9]">A little<br /><em>more care.</em></p><p className="mt-6 max-w-xs text-sm leading-6 text-primary-foreground/70">Not just a treatment plan. A conversation, a second look, and a team in your corner.</p></div></div><div><SectionHeading eyebrow="Our approach" title="You deserve a dentist who makes space for the whole picture." body="Oral health touches everyday life, and every patient arrives with a different history, comfort level, and goal. We take the time to understand yours before recommending a path forward." /><div className="mt-9 grid gap-5 sm:grid-cols-2"><div className="border-t-2 border-accent pt-4"><h3 className="font-bold">Listen carefully</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Your questions and priorities belong in the treatment plan.</p></div><div className="border-t-2 border-primary pt-4"><h3 className="font-bold">Explain clearly</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">No confusing handoffs or surprises about what comes next.</p></div></div></div></section><section className="bg-secondary/55 py-20 sm:py-28"><div className="container-wide"><SectionHeading eyebrow="Meet your doctors" title="Skilled clinicians, steady guides." body="Our doctors bring a team-oriented approach to general, family, cosmetic, and restorative dentistry." /><div className="mt-12 grid max-w-3xl gap-6 sm:grid-cols-2"><DoctorCard initials="AA" name="Ayoub Al Alousi" /><DoctorCard initials="WH" name="Wid Al Hussain" coral /></div></div></section><section className="container-wide py-20 text-center sm:py-28"><HeartHandshake className="mx-auto size-9 text-accent" /><h2 className="font-display mx-auto mt-5 max-w-2xl text-4xl leading-none sm:text-5xl">Come in for the dentistry. Stay for the way you’re treated.</h2><div className="mt-8"><ButtonLink href="/contact">Meet us in Vallejo</ButtonLink></div></section></main></>;
}

export function ServicesPage() {
  return <><PageMeta title="Dental Services | Fairgrounds Dental Practice" description="Explore family, general, cosmetic, orthodontic, restorative, and emergency dental services at Fairgrounds Dental Practice." path="/services" /><main><PageIntro eyebrow="Thoughtful care, all in one place" title="A complete plan for your smile." body="From prevention to the moments that need a little more expertise, our services are designed to keep your care close, clear, and comfortable." /><section className="container-wide py-20 sm:py-28"><div className="grid gap-5 md:grid-cols-2">{services.map((service, index) => { const Icon = service.icon; return <article key={service.title} className={`group rounded-2xl border p-6 transition-transform hover:-translate-y-1 sm:p-8 ${index === 2 ? 'border-primary bg-primary text-primary-foreground md:col-span-2 lg:col-span-1' : 'border-border bg-card'}`}><div className="flex items-start justify-between"><span className={`grid size-12 place-items-center rounded-xl ${index === 2 ? 'bg-background/15 text-accent' : 'bg-secondary text-primary'}`}><Icon className="size-5" /></span><span className={`font-mono text-xs ${index === 2 ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>0{index + 1}</span></div><h2 className="mt-12 text-2xl font-bold">{service.title}</h2><p className={`mt-3 max-w-md text-sm leading-6 ${index === 2 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{service.text}</p><a href="tel:7075528195" data-testid={`link-service-call-${index}`} className={`focus-ring mt-8 inline-flex items-center gap-2 text-sm font-bold ${index === 2 ? 'text-accent' : 'text-primary'}`}>Talk with our team <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a></article>; })}</div></section><section className="bg-foreground py-16 text-background sm:py-20"><div className="container-wide flex flex-col justify-between gap-8 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-accent">Not sure where to start?</p><h2 className="font-display mt-3 text-4xl leading-none">Tell us what’s going on.</h2></div><ButtonLink href="/contact">Request a visit</ButtonLink></div></section></main></>;
}

export function NewPatientsPage() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [{ q: 'What should I bring?', a: 'Bring a photo ID, your insurance information, and any current medication details. Most importantly, bring your questions.' }, { q: 'Do you accept my insurance?', a: 'We accept most PPO insurance plans and are in-network with Delta Dental PPO, MetLife, Humana, Guardian, Cigna, Zelis, and Argus. Our team can help you understand your benefits.' }, { q: 'Can I use financing?', a: 'Yes. Cherry financing is available for eligible care, so you can talk through a plan that fits your needs.' }];
  return <><PageMeta title="New Patients | Fairgrounds Dental Practice" description="New to Fairgrounds Dental Practice? Learn about insurance, Cherry financing, your first visit, and how to request an appointment." path="/new-patients" /><main><PageIntro eyebrow="Welcome in" title="Your first visit should feel simple." body="We’ll help with the practical details and the human ones, from insurance questions to knowing what to expect when you take a seat." /><section className="container-wide grid gap-12 py-20 sm:py-28 lg:grid-cols-[.8fr_1.2fr]"><div><SectionHeading eyebrow="Before you arrive" title="A little prepared. Never over-prepared." body="We’ll meet you where you are and make space for a real conversation about your health, comfort, and goals." /><div className="mt-8 space-y-5">{['Share your goals and health history', 'Meet your care team and ask anything', 'Leave with a clear next step'].map((step, i) => <div key={step} className="flex gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold">{i + 1}</span><div><h3 className="font-bold">{step}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{['We’ll review the details that help us care for you well.', 'We’ll explain what we’re looking at and why it matters.', 'If treatment is needed, we’ll talk through options together.'][i]}</p></div></div>)}</div><a href="tel:7075528195" data-testid="link-new-patient-call" className="focus-ring mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary"><Phone className="size-4" /> Questions? Call 707-552-8195</a></div><div className="rounded-2xl border border-border bg-card p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Common questions</p><div className="mt-5 divide-y divide-border">{faqs.map((faq, i) => <div key={faq.q}><button type="button" aria-expanded={open === i} data-testid={`button-faq-${i}`} onClick={() => setOpen(open === i ? null : i)} className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-bold">{faq.q}<ChevronDown className={`size-4 shrink-0 text-primary transition-transform ${open === i ? 'rotate-180' : ''}`} /></button>{open === i && <p className="animate-fade max-w-xl pb-5 pr-6 text-sm leading-6 text-muted-foreground">{faq.a}</p>}</div>)}</div></div></section><section className="bg-secondary/55 py-20 sm:py-28"><div className="container-wide grid gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><SectionHeading eyebrow="Let’s make a plan" title="Start with a conversation." body="Send a request and our team will follow up during office hours. Or call if you’d rather talk it through." /></div><div className="rounded-2xl border border-border bg-card p-6 sm:p-8"><AppointmentForm /></div></div></section></main></>;
}

export function ReviewsPage() {
  return <><PageMeta title="Patient Reviews | Fairgrounds Dental Practice" description="Read what patients say about the warm, clear, personal care at Fairgrounds Dental Practice in Vallejo." path="/reviews" /><main><PageIntro eyebrow="From our patients" title="The feeling we hope you take home." body="Every review is a reminder that the details matter: a careful explanation, a kind hello, a little less worry." /><section className="container-wide py-20 sm:py-28"><div className="mb-12 flex flex-wrap items-end justify-between gap-5"><SectionHeading eyebrow="Patient stories" title="A few words from the chair." /><div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-bold"><span className="flex gap-1 text-accent">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="size-4 fill-current" />)}</span> Trusted by Vallejo families</div></div><div className="grid gap-5 md:grid-cols-2">{testimonials.map((item, i) => <figure key={item.quote} className={`rounded-2xl p-7 sm:p-9 ${i === 1 ? 'bg-primary text-primary-foreground md:translate-y-8' : 'border border-border bg-card'}`}><Quote className={`size-8 ${i === 1 ? 'text-accent' : 'text-primary'}`} /><blockquote className="mt-8 max-w-lg font-display text-3xl leading-[1.03]">“{item.quote}”</blockquote><figcaption className={`mt-10 text-xs font-bold uppercase tracking-[.15em] ${i === 1 ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{item.name}<br /><span className="normal-case tracking-normal">{item.detail}</span></figcaption></figure>)}</div></section><section className="bg-accent/25 py-16 sm:py-20"><div className="container-wide flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Have a story to share?</p><h2 className="font-display mt-2 text-4xl leading-none">Your experience helps a neighbor.</h2></div><a href="#" onClick={(event) => event.preventDefault()} data-testid="link-google-review" className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground">Leave a Google review <ArrowRight className="size-4" /></a></div></section></main></>;
}

export function ContactPage() {
  return <><PageMeta title="Contact Fairgrounds Dental | Vallejo, CA" description="Call, email, find, or request an appointment with Fairgrounds Dental Practice at 200 Fairgrounds Dr in Vallejo." path="/contact" /><main><PageIntro eyebrow="We’re here to help" title="Let’s find a good time." body="Call for the quickest response, or send a request below and we’ll be in touch during office hours." /><section className="container-wide grid gap-10 py-20 sm:py-28 lg:grid-cols-[.72fr_1.28fr]"><div><SectionHeading eyebrow="Reach the office" title="Good questions welcome." body="Whether you’re ready to book or just trying to understand your options, our team is happy to help." /><div className="mt-10 space-y-6"><a href="tel:7075528195" data-testid="link-contact-phone" className="focus-ring flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary"><span className="grid size-10 place-items-center rounded-lg bg-accent/40 text-primary"><Phone className="size-5" /></span><span><span className="block text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Call us</span><strong className="mt-1 block text-lg text-primary">707-552-8195</strong></span></a><a href="mailto:office@fairgroundsdental.com" data-testid="link-contact-email" className="focus-ring flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary"><span className="grid size-10 place-items-center rounded-lg bg-secondary text-primary">@</span><span><span className="block text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Email</span><strong className="mt-1 block text-sm text-primary">office@fairgroundsdental.com</strong></span></a><div className="flex items-start gap-4 p-4"><MapPin className="mt-1 size-5 shrink-0 text-accent" /><p className="text-sm leading-6"><strong className="block">200 Fairgrounds Dr</strong>Vallejo, CA 94589</p></div><div className="flex items-start gap-4 p-4"><Clock3 className="mt-1 size-5 shrink-0 text-accent" /><p className="text-sm leading-6"><strong className="block">Monday–Thursday · 8am–5pm</strong>Friday–Sunday · Closed</p></div></div></div><div className="rounded-2xl border border-border bg-card p-6 sm:p-8"><div className="mb-7 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Request a visit</p><h2 className="font-display mt-2 text-3xl">Tell us a little about what you need.</h2></div><CalendarDays className="size-7 text-accent" /></div><AppointmentForm /></div></section><section className="container-wide pb-20 sm:pb-28"><div className="overflow-hidden rounded-2xl border border-border bg-secondary"><iframe title="Map showing Fairgrounds Dental Practice in Vallejo" src="https://www.google.com/maps?q=200+Fairgrounds+Dr,+Vallejo,+CA+94589&output=embed" className="h-[300px] w-full border-0 grayscale-[.2] sm:h-[380px]" loading="lazy" /></div></section></main></>;
}

export function NotFoundPage() {
  return <><PageMeta title="Page not found | Fairgrounds Dental Practice" description="The page you were looking for could not be found." path="/404" /><main className="container-wide flex min-h-[65vh] flex-col items-start justify-center py-20"><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">404</p><h1 className="font-display mt-4 text-6xl leading-none">That page took a wrong turn.</h1><p className="mt-5 max-w-md text-muted-foreground">Let’s get you back to a calmer place.</p><div className="mt-8"><ButtonLink href="/">Back to home</ButtonLink></div></main></>;
}