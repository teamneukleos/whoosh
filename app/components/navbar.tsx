'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Discover', href: '/discover' },
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Payments', href: '/payments' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo/logo.svg" alt="Woosh" width={100} height={60} priority />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 lg:flex">
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

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <button className="rounded-xs bg-[#091B68] px-6 py-2 font-medium text-white transition hover:opacity-90">
            New Campaign
          </button>
          <button className="overflow-hidden rounded-full">
            <Image
              src="/avatar.png"
              alt="User"
              width={52}
              height={52}
              className="h-12 w-12 object-cover"
            />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
            <button className="rounded-sm bg-[#091B68] py-2 font-medium text-white">
              New Campaign
            </button>
            <button className="flex items-center gap-3">
              <Image src="/avatar.png" alt="User" width={40} height={40} className="rounded-full" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
