import { FormEvent, useState } from 'react';
import { Check, LoaderCircle, Send } from 'lucide-react';

const services = ['General or family dentistry', 'Exam and cleaning', 'Cosmetic dentistry', 'Orthodontics', 'Same-day crown', 'Dental emergency', 'Something else'];

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.service) {
      setError('Please add your name, phone, email, and preferred service.');
      return;
    }
    setError('');
    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 650);
  };
  if (status === 'success') {
    return (
      <div className={`flex flex-col items-start justify-center rounded-2xl border border-primary/20 bg-secondary/60 ${compact ? 'min-h-[280px] p-6' : 'min-h-[420px] p-8 sm:p-10'}`} data-testid="status-appointment-success">
        <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-6" /></span>
        <h3 className="font-display mt-6 text-3xl text-foreground">We’ve got your request.</h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Thank you, {form.name.split(' ')[0]}. Our team will reach out during office hours to find a time that works for you.</p>
        <button type="button" onClick={() => { setStatus('idle'); setForm({ name: '', phone: '', email: '', service: '', message: '' }); }} data-testid="button-new-appointment-request" className="focus-ring mt-7 text-sm font-bold text-primary underline underline-offset-4">Send another request</button>
      </div>
    );
  }
  const inputClass = 'focus-ring w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70';
  return (
    <form onSubmit={submit} className={compact ? 'space-y-4' : 'space-y-5'} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">Name <input required value={form.name} onChange={(e) => update('name', e.target.value)} data-testid="input-name" className={`${inputClass} mt-2`} placeholder="Your name" /></label>
        <label className="text-sm font-semibold text-foreground">Phone <input required type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} data-testid="input-phone" className={`${inputClass} mt-2`} placeholder="707-555-0198" /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">Email <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} data-testid="input-email" className={`${inputClass} mt-2`} placeholder="you@example.com" /></label>
        <label className="text-sm font-semibold text-foreground">Preferred service
          <select required value={form.service} onChange={(e) => update('service', e.target.value)} data-testid="select-preferred-service" className={`${inputClass} mt-2`}>
            <option value="">Select a service</option>{services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </label>
      </div>
      <label className="block text-sm font-semibold text-foreground">Message <textarea value={form.message} onChange={(e) => update('message', e.target.value)} data-testid="input-message" className={`${inputClass} mt-2 min-h-28 resize-y`} placeholder="Anything you’d like us to know?" /></label>
      {error && <p className="text-sm font-medium text-destructive" data-testid="status-form-error">{error}</p>}
      <button disabled={status === 'submitting'} type="submit" data-testid="button-submit-appointment" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">
        {status === 'submitting' ? <><LoaderCircle className="size-4 animate-spin" /> Sending request</> : <><Send className="size-4" /> Request an appointment</>}
      </button>
      <p className="text-center text-xs leading-5 text-muted-foreground">We’ll confirm availability by phone. This form is not monitored for emergencies.</p>
    </form>
  );
}