import { type FormEvent, useState } from "react";
import { Check, LoaderCircle, Send } from "lucide-react";

const services = [
  "General or family dentistry",
  "Exam and cleaning",
  "Cosmetic dentistry",
  "Orthodontics",
  "Same-day crown",
  "Dental emergency",
  "Something else",
];

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});
  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Please add your name.";
    if (!form.phone.trim()) nextErrors.phone = "Please add a phone number.";
    else if (form.phone.replace(/\D/g, "").length < 7)
      nextErrors.phone = "Please check this phone number.";
    if (!form.email.trim()) nextErrors.email = "Please add your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Please check this email.";
    if (!form.service) nextErrors.service = "Please choose a service.";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 650);
  };
  if (status === "success") {
    return (
      <div
        className={`flex flex-col items-start justify-center rounded-lg border border-primary/20 bg-secondary/60 ${compact ? "min-h-[280px] p-6" : "min-h-[420px] p-8 sm:p-10"}`}
        data-testid="status-appointment-success"
      >
        <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-6" />
        </span>
        <h3 className="mt-6 text-3xl font-bold text-foreground">
          We’ve got your request.
        </h3>
        <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
          Thank you, {form.name.split(" ")[0]}. Our team will reach out during
          office hours to find a time that works for you.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrors({});
            setForm({
              name: "",
              phone: "",
              email: "",
              service: "",
              message: "",
            });
          }}
          data-testid="button-new-appointment-request"
          className="focus-ring mt-7 min-h-12 text-base font-bold text-primary underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }
  const inputClass =
    "focus-ring w-full rounded-lg border border-input bg-background px-4 py-4 text-base text-foreground placeholder:text-muted-foreground/70";
  return (
    <form
      onSubmit={submit}
      className={compact ? "space-y-4" : "space-y-5"}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label
          htmlFor="appointment-name"
          className="text-base font-semibold text-foreground"
        >
          Name{" "}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
          <input
            id="appointment-name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? "appointment-name-error" : undefined
            }
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            data-testid="input-name"
            className={`${inputClass} mt-2`}
            placeholder="Your name"
          />
          {errors.name && (
            <span
              id="appointment-name-error"
              className="mt-2 block text-sm font-medium text-destructive"
            >
              {errors.name}
            </span>
          )}
        </label>
        <label
          htmlFor="appointment-phone"
          className="text-base font-semibold text-foreground"
        >
          Phone{" "}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
          <input
            id="appointment-phone"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={
              errors.phone ? "appointment-phone-error" : undefined
            }
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            data-testid="input-phone"
            className={`${inputClass} mt-2`}
            placeholder="707-555-0198"
          />
          {errors.phone && (
            <span
              id="appointment-phone-error"
              className="mt-2 block text-sm font-medium text-destructive"
            >
              {errors.phone}
            </span>
          )}
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label
          htmlFor="appointment-email"
          className="text-base font-semibold text-foreground"
        >
          Email{" "}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
          <input
            id="appointment-email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? "appointment-email-error" : undefined
            }
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            data-testid="input-email"
            className={`${inputClass} mt-2`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <span
              id="appointment-email-error"
              className="mt-2 block text-sm font-medium text-destructive"
            >
              {errors.email}
            </span>
          )}
        </label>
        <label
          htmlFor="appointment-service"
          className="text-base font-semibold text-foreground"
        >
          Preferred service{" "}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
          <select
            id="appointment-service"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? "appointment-service-error" : undefined
            }
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            data-testid="select-preferred-service"
            className={`${inputClass} mt-2`}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && (
            <span
              id="appointment-service-error"
              className="mt-2 block text-sm font-medium text-destructive"
            >
              {errors.service}
            </span>
          )}
        </label>
      </div>
      <label
        htmlFor="appointment-message"
        className="block text-base font-semibold text-foreground"
      >
        Message{" "}
        <span className="font-normal text-muted-foreground">(optional)</span>
        <textarea
          id="appointment-message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          data-testid="input-message"
          className={`${inputClass} mt-2 min-h-32 resize-y`}
          placeholder="Anything you’d like us to know?"
        />
      </label>
      {Object.keys(errors).length > 0 && (
        <p
          role="alert"
          className="text-sm font-medium text-destructive"
          data-testid="status-form-error"
        >
          Please review the highlighted fields and try again.
        </p>
      )}
      <button
        disabled={status === "submitting"}
        type="submit"
        data-testid="button-submit-appointment"
        className="focus-ring inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="size-5 animate-spin" /> Sending request
          </>
        ) : (
          <>
            <Send className="size-5" /> Request an appointment
          </>
        )}
      </button>
      <p className="text-center text-sm leading-6 text-muted-foreground">
        We’ll confirm availability by phone. This form is not monitored for
        emergencies.
      </p>
    </form>
  );
}
