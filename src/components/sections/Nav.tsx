"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="section-x mx-auto flex max-w-7xl items-center justify-between py-4">
          <Link href="#top" className="flex items-center" aria-label="AGAVE home">
            <Logo className="h-5 w-auto text-ink" />
          </Link>

          <div className="flex items-center gap-6 md:gap-7">
            <nav className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.slice(0, 3).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button href="#apply" size="sm">
                Join the network
              </Button>
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
                <Button href="#apply" size="lg" className="w-full">
                  Join the network
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
