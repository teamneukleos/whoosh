'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function HamburgerIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12V10.167H16V12H0ZM0 6.917V5.083H16V6.917H0ZM0 1.833V0H16V1.833H0Z" fill="#D8E1FF" />
    </svg>
  );
}

function DiscoveryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7556 16L9.15556 10.4C8.71111 10.7556 8.2 11.037 7.62222 11.2444C7.04444 11.4519 6.42963 11.5556 5.77778 11.5556C4.16296 11.5556 2.7963 10.9963 1.67778 9.87778C0.559259 8.75926 0 7.39259 0 5.77778C0 4.16296 0.559259 2.7963 1.67778 1.67778C2.7963 0.559259 4.16296 0 5.77778 0C7.39259 0 8.75926 0.559259 9.87778 1.67778C10.9963 2.7963 11.5556 4.16296 11.5556 5.77778C11.5556 6.42963 11.4519 7.04444 11.2444 7.62222C11.037 8.2 10.7556 8.71111 10.4 9.15556L16 14.7556L14.7556 16ZM5.77778 9.77778C6.88889 9.77778 7.83333 9.38889 8.61111 8.61111C9.38889 7.83333 9.77778 6.88889 9.77778 5.77778C9.77778 4.66667 9.38889 3.72222 8.61111 2.94444C7.83333 2.16667 6.88889 1.77778 5.77778 1.77778C4.66667 1.77778 3.72222 2.16667 2.94444 2.94444C2.16667 3.72222 1.77778 4.66667 1.77778 5.77778C1.77778 6.88889 2.16667 7.83333 2.94444 8.61111C3.72222 9.38889 4.66667 9.77778 5.77778 9.77778Z" fill="#D8E1FF" />
    </svg>
  );
}

function CampaignIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.222555 6.632L3.62157 3.23281C3.81041 3.04396 4.03296 2.90908 4.28924 2.82814C4.54551 2.74721 4.80853 2.73372 5.07829 2.78768L6.13037 3.01024C5.40201 3.87353 4.82876 4.65588 4.41063 5.3573C3.9925 6.05872 3.58785 6.90852 3.1967 7.90669L0.222555 6.632ZM4.37017 8.47322C4.68039 7.50203 5.1019 6.58479 5.63468 5.7215C6.16746 4.85821 6.81152 4.04888 7.56686 3.29351C8.75382 2.10649 10.1094 1.2196 11.6335 0.632833C13.1577 0.0460683 14.5807 -0.132659 15.9025 0.0966515C16.1318 1.41856 15.9565 2.84163 15.3765 4.36587C14.7965 5.89011 13.913 7.24574 12.7261 8.43276C11.9842 9.17464 11.1749 9.81874 10.2982 10.365C9.42148 10.9113 8.49755 11.3396 7.5264 11.6498L4.37017 8.47322ZM9.95427 6.04523C10.2645 6.35548 10.6455 6.5106 11.0974 6.5106C11.5492 6.5106 11.9303 6.35548 12.2405 6.04523C12.5507 5.73499 12.7059 5.35393 12.7059 4.90205C12.7059 4.45018 12.5507 4.06912 12.2405 3.75887C11.9303 3.44863 11.5492 3.29351 11.0974 3.29351C10.6455 3.29351 10.2645 3.44863 9.95427 3.75887C9.64404 4.06912 9.48893 4.45018 9.48893 4.90205C9.48893 5.35393 9.64404 5.73499 9.95427 6.04523ZM9.38776 15.7774L8.0929 12.8031C9.09102 12.412 9.94415 12.0073 10.6523 11.5891C11.3604 11.171 12.1461 10.5977 13.0093 9.86932L13.2117 10.9215C13.2656 11.1912 13.2521 11.4576 13.1712 11.7207C13.0903 11.9837 12.9554 12.2096 12.7665 12.3985L9.38776 15.7774ZM1.51742 11.0631C1.9895 10.591 2.56275 10.3515 3.23716 10.3448C3.91157 10.3381 4.48482 10.5707 4.9569 11.0429C5.42899 11.515 5.66503 12.0882 5.66503 12.7627C5.66503 13.4371 5.42899 14.0104 4.9569 14.4825C4.6197 14.8197 4.05657 15.1097 3.26751 15.3525C2.47845 15.5953 1.38928 15.8112 0 16C0.188834 14.6106 0.404645 13.5248 0.647432 12.7424C0.890219 11.9601 1.18021 11.4003 1.51742 11.0631Z" fill="#D8E1FF" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16V14.2222L1.77778 12.4444V16H0ZM3.55556 16V10.6667L5.33333 8.88889V16H3.55556ZM7.11111 16V8.88889L8.88889 10.6889V16H7.11111ZM10.6667 16V10.6889L12.4444 8.91111V16H10.6667ZM14.2222 16V7.11111L16 5.33333V16H14.2222ZM0 11.4V8.88889L6.22222 2.66667L9.77778 6.22222L16 0V2.51111L9.77778 8.73333L6.22222 5.17778L0 11.4Z" fill="#D8E1FF" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.68421 13.3333V1.66667C1.68421 1.66667 1.68421 1.97569 1.68421 2.59375C1.68421 3.21181 1.68421 4.01389 1.68421 5V10C1.68421 10.9861 1.68421 11.7882 1.68421 12.4062C1.68421 13.0243 1.68421 13.3333 1.68421 13.3333ZM1.68421 15C1.22105 15 0.824561 14.8368 0.494737 14.5104C0.164912 14.184 0 13.7917 0 13.3333V1.66667C0 1.20833 0.164912 0.815972 0.494737 0.489583C0.824561 0.163194 1.22105 0 1.68421 0H13.4737C13.9368 0 14.3333 0.163194 14.6632 0.489583C14.993 0.815972 15.1579 1.20833 15.1579 1.66667V3.75H13.4737V1.66667H1.68421V13.3333H13.4737V11.25H15.1579V13.3333C15.1579 13.7917 14.993 14.184 14.6632 14.5104C14.3333 14.8368 13.9368 15 13.4737 15H1.68421ZM8.42105 11.6667C7.95789 11.6667 7.5614 11.5035 7.23158 11.1771C6.90175 10.8507 6.73684 10.4583 6.73684 10V5C6.73684 4.54167 6.90175 4.14931 7.23158 3.82292C7.5614 3.49653 7.95789 3.33333 8.42105 3.33333H14.3158C14.7789 3.33333 15.1754 3.49653 15.5053 3.82292C15.8351 4.14931 16 4.54167 16 5V10C16 10.4583 15.8351 10.8507 15.5053 11.1771C15.1754 11.5035 14.7789 11.6667 14.3158 11.6667H8.42105ZM14.3158 10V5H8.42105V10H14.3158ZM10.9474 8.75C11.2982 8.75 11.5965 8.62847 11.8421 8.38542C12.0877 8.14236 12.2105 7.84722 12.2105 7.5C12.2105 7.15278 12.0877 6.85764 11.8421 6.61458C11.5965 6.37153 11.2982 6.25 10.9474 6.25C10.5965 6.25 10.2982 6.37153 10.0526 6.61458C9.80702 6.85764 9.68421 7.15278 9.68421 7.5C9.68421 7.84722 9.80702 8.14236 10.0526 8.38542C10.2982 8.62847 10.5965 8.75 10.9474 8.75Z" fill="#D8E1FF" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const navItems = [
  { label: 'Discovery Engine', href: '/discover', icon: DiscoveryIcon },
  { label: 'Campaign Manager', href: '/campaigns', icon: CampaignIcon },
  { label: 'Performance Analytics', href: '/analytics', icon: AnalyticsIcon },
  { label: 'Payment', href: '/payments', icon: PaymentIcon },
];

export default function SidebarMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className="fixed left-0 top-[72px] rounded-md bottom-[1px] z-40 hidden w-[264px] flex-col lg:flex"
        style={{ backgroundColor: '#091B68' }}
      >
        {/* Top: hamburger + logo text */}
        <div className="flex h-[84px] flex-col justify-center px-6 gap-3">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="flex w-fit items-center"
          >
            <HamburgerIcon />
          </button>
          <span className="text-xs font-medium tracking-widest" style={{ color: '#EFEFEF' }}>
            Menu
          </span>
        </div>

        {/* Divider */}
        <div className="mx-3 h-px" style={{ backgroundColor: '#D9D9D9', opacity: 0.2 }} />

        {/* Nav items */}
        <nav className="mt-1 flex flex-col px-3">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded px-3 py-3 text-sm font-medium transition-colors ${isActive
                  ? 'bg-[#003AF4] text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span className="shrink-0">
                  <Icon />
                </span>
                <span style={{ color: isActive ? '#D8E1FF' : '#EFEFEF' }}>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Create Brief CTA */}
        <div className="mt-auto px-3 pb-8">
          <div className="rounded bg-[#D8E1FF] px-3 py-3">
            <Link
              href="/campaigns/create"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 text-sm font-semibold"
              style={{ color: '#091B68' }}
            >
              <PlusIcon />
              Create Brief
            </Link>
          </div>
        </div>
      </aside>

      
    </>
  );
}