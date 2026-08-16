import { type FormEvent, useState } from "react";
import { CalendarDays, Check, Clock3, LoaderCircle, Send } from "lucide-react";

const services = [
  "General or family dentistry",
  "Exam and cleaning",
  "Cosmetic dentistry",
  "Orthodontics",
  "Same-day crown",
  "Dental emergency",
  "Something else",
];

const timeWindows = [
  { label: "Morning", detail: "8am-11am", value: "Morning, 8am-11am" },
  { label: "Midday", detail: "11am-1pm", value: "Midday, 11am-1pm" },
  { label: "Afternoon", detail: "1pm-4pm", value: "Afternoon, 1pm-4pm" },
  { label: "First available", detail: "Any opening", value: "First available" },
];

function formatInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMinimumAppointmentDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatInputDate(tomorrow);
}

function isClosedOfficeDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);
  const dayOfWeek = selectedDate.getDay();
  return dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
}

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const minimumAppointmentDate = getMinimumAppointmentDate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
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
    if (form.preferredDate) {
      if (form.preferredDate < minimumAppointmentDate) {
        nextErrors.preferredDate = "Please choose a future office day.";
      } else if (isClosedOfficeDay(form.preferredDate)) {
        nextErrors.preferredDate =
          "Please choose Monday through Thursday, or call us for help.";
      }
    }
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
          office hours to confirm the closest available appointment time.
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
              preferredDate: "",
              preferredTime: "",
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
      <section
        className="rounded-lg border border-border bg-secondary/55 p-4 sm:p-5"
        aria-labelledby="appointment-time-heading"
      >
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-background text-primary">
            <CalendarDays className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h3
              id="appointment-time-heading"
              className="text-xl font-bold leading-snug text-foreground"
            >
              Preferred appointment time
            </h3>
            <p className="mt-1 text-base leading-7 text-muted-foreground">
              Pick a day and time window if you have one in mind. We’ll call to
              confirm the exact opening.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <label
            htmlFor="appointment-date"
            className="text-base font-semibold text-foreground"
          >
            Preferred date{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
            <input
              id="appointment-date"
              type="date"
              min={minimumAppointmentDate}
              aria-invalid={Boolean(errors.preferredDate)}
              aria-describedby={
                errors.preferredDate
                  ? "appointment-date-help appointment-date-error"
                  : "appointment-date-help"
              }
              value={form.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
              data-testid="input-preferred-date"
              className={`${inputClass} mt-2`}
            />
            <span
              id="appointment-date-help"
              className="mt-2 block text-sm font-medium text-muted-foreground"
            >
              Office visits are available Monday through Thursday.
            </span>
            {errors.preferredDate && (
              <span
                id="appointment-date-error"
                className="mt-2 block text-sm font-medium text-destructive"
              >
                {errors.preferredDate}
              </span>
            )}
          </label>
          <fieldset>
            <legend className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Clock3 className="size-5 text-accent" aria-hidden="true" />
              Best time to come in{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {timeWindows.map((window) => {
                const selected = form.preferredTime === window.value;
                return (
                  <label key={window.value} className="block cursor-pointer">
                    <input
                      type="radio"
                      name="appointment-preferred-time"
                      value={window.value}
                      checked={selected}
                      onChange={(e) =>
                        update("preferredTime", e.currentTarget.value)
                      }
                      className="peer sr-only"
                    />
                    <span
                      className={`flex min-h-16 flex-col justify-center rounded-lg border px-4 py-3 text-base transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background ${selected ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background text-foreground hover:bg-card"}`}
                    >
                      <span className="font-bold">{window.label}</span>
                      <span
                        className={`text-sm font-medium ${selected ? "text-primary-foreground/85" : "text-muted-foreground"}`}
                      >
                        {window.detail}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      </section>
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
