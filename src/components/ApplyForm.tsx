"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PLATFORMS } from "@/lib/site";
import { PLATFORM_ICONS, ArrowIcon, CheckIcon } from "@/components/Icons";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Record<string, string>;

const FIELD =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-paper placeholder:text-sand/40 outline-none transition-all duration-200 focus:border-electric/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-electric/20";

const LABEL = "mb-2 block text-sm font-medium text-paper/85";
const ERR = "mt-1.5 text-sm text-ember";

export function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setErrors({});
    setServerError("");
    setStatus("submitting");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      website: fd.get("website"),
      company: fd.get("company"), // honeypot
      socials: {
        instagram: fd.get("instagram"),
        tiktok: fd.get("tiktok"),
        facebook: fd.get("facebook"),
        x: fd.get("x"),
        youtube: fd.get("youtube"),
        followers: fd.get("followers"),
      },
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error || "Please fix the highlighted fields and try again.");
      setStatus("error");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="card rounded-2xl p-10 text-center sm:p-14"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-electric/15 text-electric">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="font-display text-3xl font-bold text-paper">
          You&apos;re on the list.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sand/75">
          Your application is in. We review partners weekly — keep an eye on your
          inbox for an invite to the next live drop.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card rounded-2xl p-6 sm:p-9">
      {/* honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="name">
            Full name <span className="text-ember">*</span>
          </label>
          <input id="name" name="name" className={FIELD} placeholder="Jordan Rivera" autoComplete="name" />
          {errors.name && <p className={ERR}>{errors.name}</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor="email">
            Email <span className="text-ember">*</span>
          </label>
          <input id="email" name="email" type="email" className={FIELD} placeholder="you@email.com" autoComplete="email" />
          {errors.email && <p className={ERR}>{errors.email}</p>}
        </div>

        <div>
          <label className={LABEL} htmlFor="phone">
            Phone <span className="text-ember">*</span>
          </label>
          <input id="phone" name="phone" type="tel" className={FIELD} placeholder="(555) 123-4567" autoComplete="tel" />
          {errors.phone && <p className={ERR}>{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="website">
            Website <span className="text-sand/45">(optional)</span>
          </label>
          <input id="website" name="website" className={FIELD} placeholder="https://yoursite.com" autoComplete="url" />
        </div>
      </div>

      <div className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-sand/45">
          Where you create
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PLATFORMS.map((p) => {
          const Icon = PLATFORM_ICONS[p.key];
          return (
            <div key={p.key}>
              <label className={LABEL} htmlFor={p.key}>
                {p.label}
              </label>
              <div className="group relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sand/45 transition-colors group-focus-within:text-electric">
                  <Icon className="h-5 w-5" />
                </span>
                <input
                  id={p.key}
                  name={p.key}
                  className={`${FIELD} pl-11`}
                  placeholder={p.placeholder}
                  autoComplete="off"
                />
              </div>
            </div>
          );
        })}

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="followers">
            Estimated total audience / follower count{" "}
            <span className="text-sand/45">(optional)</span>
          </label>
          <input
            id="followers"
            name="followers"
            className={FIELD}
            placeholder="e.g. 125,000 across platforms"
            autoComplete="off"
            inputMode="numeric"
          />
        </div>
      </div>

      {errors.socials && (
        <p className="mt-4 rounded-lg border border-ember/30 bg-ember/10 px-4 py-2.5 text-sm text-ember">
          {errors.socials}
        </p>
      )}

      <AnimatePresence>
        {status === "error" && serverError && !errors.socials && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-lg border border-ember/30 bg-ember/10 px-4 py-2.5 text-sm text-ember"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-ember px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-ember/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Submitting…
          </>
        ) : (
          <>
            Apply to partner
            <ArrowIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-sand/45">
        Applications reviewed weekly · No spam, ever.
      </p>
    </form>
  );
}
