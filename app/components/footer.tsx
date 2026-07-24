'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const links = [
    {
      label: 'Privacy',
      href: '/privacy',
    },
    {
      label: 'Terms',
      href: '/terms',
    },
    {
      label: 'Support',
      href: '/support',
    },
    {
      label: 'API',
      href: '/api',
    },
  ];

  return (
    <footer className="bg-[#091B68]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo/logo-white.svg"
              alt="Woosh"
              width={180}
              height={80}
              className="h-auto w-auto"
            />
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-white/70">
            ©2026 Woosh. Empowering African Creators.
          </p>

        </div>
      </div>
    </footer>
  );
}