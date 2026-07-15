"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-[#DAD1C7] bg-white px-4 lg:px-20">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          <Link href="https://clients.goagave.io/" className="flex items-center" aria-label="AGAVE home">
            <Logo className="h-5 w-auto text-ink" />
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group relative text-xs font-bold uppercase tracking-widest text-[#193759] transition-colors hover:text-[#A79D95]"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#A79D95] transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <Link
                href="#apply"
                className="rounded-full bg-[#e9714c] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#d05a36] hover:shadow-lg active:scale-95"
              >
                Join the Network
              </Link>
            </div>

            <button
              className="flex h-10 w-10 items-center justify-center md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-ink transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 rounded bg-ink transition-all duration-300 ${
                  open ? "bottom-1.5 -rotate-45" : ""
                }`}
              />
            </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-paper md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-3 px-8">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2.5 text-4xl font-bold text-ink"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6">
                <Link
                  href="#apply"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full bg-[#e9714c] px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#d05a36] active:scale-95"
                >
                  Join the Network
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
