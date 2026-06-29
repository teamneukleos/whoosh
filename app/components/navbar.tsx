'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const landingLinks = [
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'For Creators', href: '#creators' },
  { label: 'FAQ', href: '#faq' },
];

const dashboardLinks = [
  { label: 'Discover', href: '/discover' },
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Payments', href: '/payments' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const links = isLanding ? landingLinks : dashboardLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/">
          <Image src="/logo/logo.svg" alt="Kreate" width={100} height={60} priority />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-bold text-gray-700 transition hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {isLanding ? (
            <>
              <Link
                href="/campaigns/create"
                className="rounded-xs bg-[#091B68] px-5 py-2 font-medium text-white transition hover:opacity-90"
              >
                Start a Campaign
              </Link>
              <Link
                href="/signup"
                className="rounded-xs border border-[#091B68] px-5 py-2 font-medium text-[#091B68] transition hover:bg-[#091B68] hover:text-white"
              >
                Join as a Creator
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/campaigns/create"
                className="rounded-xs bg-[#091B68] px-6 py-2 font-medium text-white transition hover:opacity-90"
              >
                New Campaign
              </Link>
              <button className="overflow-hidden rounded-full">
                <Image
                  src="/avatar.png"
                  alt="User"
                  width={52}
                  height={52}
                  className="h-12 w-12 object-cover"
                />
              </button>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Toggle menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-20 bottom-0 bg-white lg:hidden overflow-y-auto">
          <div className="flex flex-col gap-6 px-4 py-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-bold text-gray-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isLanding ? (
              <>
                <Link
                  href="/campaigns/create"
                  className="rounded-sm bg-[#091B68] py-2 text-center font-medium text-white"
                  onClick={() => setOpen(false)}
                >
                  Start a Campaign
                </Link>
                <Link
                  href="/signup"
                  className="rounded-sm border border-[#091B68] py-2 text-center font-medium text-[#091B68]"
                  onClick={() => setOpen(false)}
                >
                  Join as a Creator
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/campaigns/create"
                  className="rounded-sm bg-[#091B68] py-2 text-center font-medium text-white"
                  onClick={() => setOpen(false)}
                >
                  New Campaign
                </Link>
                <button className="flex items-center gap-3">
                  <Image src="/avatar.png" alt="User" width={40} height={40} className="rounded-full" />
                  <span>Profile</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
