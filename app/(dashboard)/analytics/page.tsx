'use client';

import { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────

type StatusType = 'HEALTHY' | 'OPTIMAL' | 'TRENDING';

interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface CampaignRow {
  name: string;
  launched: string;
  platform: string;
  reach: string;
  spend: string;
  status: StatusType;
}

interface Creator {
  name: string;
  niche: string;
  er: string;
  reach: string;
  avatar: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STAT_CARDS: StatCard[] = [
  {
    label: 'TOTAL REACH',
    value: '1.2M',
    change: '+12%',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" stroke="#444653" strokeWidth="1.5" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#444653" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#444653" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.87" stroke="#444653" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'ENGAGEMENT RATE',
    value: '5.8%',
    change: '+4.2%',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#444653" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'ESTIMATED ROI',
    value: '3.4×',
    change: '+24%',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="#444653" strokeWidth="1.5" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#444653" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="12" y2="16" stroke="#444653" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="14" x2="14" y2="14" stroke="#444653" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'TOTAL SPEND',
    value: '$42k',
    change: '',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="#444653" strokeWidth="1.5" />
        <line x1="2" y1="10" x2="22" y2="10" stroke="#444653" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const STATUS_STYLES: Record<StatusType, { dot: string; text: string }> = {
  HEALTHY: { dot: 'bg-[#0DE3AF]', text: 'text-[#007A5C]' },
  OPTIMAL: { dot: 'bg-[#003AF4]', text: 'text-[#003AF4]' },
  TRENDING: { dot: 'bg-[#FF4D4D]', text: 'text-[#CC0000]' },
};

const CAMPAIGNS: CampaignRow[] = [
  { name: 'Summer Vibes Vol. 2', launched: 'June 12', platform: 'TikTok + IG', reach: '452,000', spend: '$12,400', status: 'HEALTHY' },
  { name: 'Tech Founders Series', launched: 'May 28', platform: 'LinkedIn', reach: '120,500', spend: '$8,200', status: 'OPTIMAL' },
  { name: 'Lagos Fashion Week', launched: 'Oct 15', platform: 'Instagram', reach: '680,000', spend: '$22,000', status: 'TRENDING' },
];

const TREND_DATA = [
  { week: 'Week 1', reach: 40000, conversions: 1200 },
  { week: 'Week 2', reach: 85000, conversions: 2100 },
  { week: 'Week 3', reach: 62000, conversions: 1800 },
  { week: 'Week 4', reach: 120000, conversions: 3400 },
  { week: 'Week 5', reach: 95000, conversions: 2900 },
  { week: 'Week 6', reach: 145000, conversions: 4200 },
];

const TOP_CREATORS: Creator[] = [
  { name: 'Kwame Mensah', niche: 'Tech & Lifestyle', er: '8.4% ER', reach: '240k Reach', avatar: 'KM' },
  { name: 'Amara Okafor', niche: 'Beauty & Travel', er: '7.2% ER', reach: '185k Reach', avatar: 'AO' },
  { name: 'Zane Molefe', niche: 'Gaming & AR', er: '6.9% ER', reach: '310k Reach', avatar: 'ZM' },
];

const AVATAR_COLORS = ['bg-[#4C77FF]', 'bg-[#0DE3AF]', 'bg-[#E6A000]'];

// ─── Sub-components ────────────────────────────────────────────────────────────

function TrendUpIcon({ color = '#0DE3AF' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 6 23 6 23 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatCardItem({ card }: { card: StatCard }) {
  return (
    <div className="min-w-[150px] sm:min-w-[180px] flex-1 border-r border-gray-200 last:border-r-0 px-4 py-4 sm:px-7 sm:py-6 bg-[#FBFCFF]">
      <div className="flex items-center justify-between mb-2.5">
        <div className="text-[#444653]">{card.icon}</div>
        {card.change && (
          <div className="flex items-center gap-1">
            <TrendUpIcon color="#0DE3AF" />
            <span className="text-xs font-semibold text-[#0DE3AF]">{card.change}</span>
          </div>
        )}
      </div>
      <p className="text-[10px] sm:text-[11px] tracking-wide font-medium text-[#444653] mb-1.5">
        {card.label}
      </p>
      <p className="text-2xl sm:text-3xl font-extrabold text-[#191C1D] leading-none">
        {card.value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: StatusType }) {
  const s = STATUS_STYLES[status];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full inline-block ${s.dot}`} />
      <span className={`text-xs font-bold tracking-wide ${s.text}`}>{status}</span>
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PerformanceAnalyticsPage() {
  const [period, setPeriod] = useState('Last 30 Days');

  return (
    <div className="min-h-screen bg-white font-sans lg:pl-[264px] pt-[72px]">
      <main className="px-4 py-6 sm:px-6 md:px-10 md:py-10 pb-12 sm:pb-16">

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7 sm:mb-9">
          <div>
            <h1 className="text-2xl sm:text-[32px] font-extrabold text-[#091B68] leading-tight">
              Campaign Performance
            </h1>
            <p className="text-sm text-[#444653] mt-2">
              Real-time metrics for your active and past campaigns across Africa.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Period dropdown */}
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-3.5 py-2.5 border border-[#C4C5D5] rounded text-[13px] font-medium text-[#191C1D] bg-white cursor-pointer whitespace-nowrap"
            >
              {period}
              <ChevronDown size={14} color="#6B7280" />
            </button>

            {/* Download button */}
            <button className="flex items-center justify-center w-[38px] h-[38px] border border-[#C4C5D5] rounded bg-white cursor-pointer shrink-0">
              <Download size={16} color="#191C1D" />
            </button>
          </div>
        </div>

        {/* ── Stats Row ───────────────────────────────────────────────── */}
        <div className="flex border border-gray-200 rounded overflow-x-auto mb-8 sm:mb-9 [-webkit-overflow-scrolling:touch]">
          {STAT_CARDS.map((card, i) => (
            <StatCardItem key={i} card={card} />
          ))}
        </div>

        {/* ── Campaign Breakdown ──────────────────────────────────────── */}
        <div className="mb-8 sm:mb-9">
          <h2 className="text-lg sm:text-xl font-bold text-[#191C1D] mb-4 sm:mb-5">
            Campaign Breakdown
          </h2>

          <div className="border border-gray-200 rounded overflow-hidden">
            {/* Desktop / tablet table header (hidden on mobile) */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-gray-50 border-b border-gray-200 px-5 py-3">
              {['Campaign Name', 'Platform', 'Reach', 'Spend', 'Status'].map((h) => (
                <span key={h} className="text-xs font-medium text-[#444653]">{h}</span>
              ))}
            </div>

            {/* Rows */}
            {CAMPAIGNS.map((row, i) => (
              <div
                key={i}
                className={`px-5 py-4 ${i < CAMPAIGNS.length - 1 ? 'border-b border-gray-100' : ''}
                  grid grid-cols-1 gap-2
                  sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] sm:gap-0 sm:items-center`}
              >
                <div>
                  <p className="text-sm font-bold text-[#191C1D]">{row.name}</p>
                  <p className="text-xs text-[#444653] mt-0.5">Launched {row.launched}</p>
                </div>

                {/* Mobile: labeled rows / Desktop: plain cells */}
                <div className="flex justify-between sm:block">
                  <span className="text-xs text-[#444653] sm:hidden">Platform</span>
                  <span className="text-[13px] text-[#444653]">{row.platform}</span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="text-xs text-[#444653] sm:hidden">Reach</span>
                  <span className="text-[13px] text-[#444653]">{row.reach}</span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="text-xs text-[#444653] sm:hidden">Spend</span>
                  <span className="text-[13px] text-[#444653]">{row.spend}</span>
                </div>
                <div className="flex justify-between items-center sm:block">
                  <span className="text-xs text-[#444653] sm:hidden">Status</span>
                  <StatusBadge status={row.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom row: Trend + Top Creators ───────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-7 lg:gap-8 items-start">

          {/* Trend Analysis */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-[#191C1D]">Trend Analysis</h2>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-[#444653]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#091B68] inline-block" />
                  Reach
                </span>
                <span className="flex items-center gap-1.5 text-xs text-[#444653]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0DE3AF] inline-block" />
                  Conversions
                </span>
              </div>
            </div>

            <div className="h-[220px] sm:h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TREND_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 11, fill: '#444653' }}
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#444653' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reach"
                    stroke="#091B68"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#091B68', strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                    name="Reach"
                  />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="#0DE3AF"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#0DE3AF', strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                    name="Conversions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Creators */}
          <div className="w-full lg:w-[260px] shrink-0">
            <h2 className="text-lg sm:text-xl font-bold text-[#191C1D] mb-5">
              Top Creators
            </h2>

            <div className="flex flex-col gap-4">
              {TOP_CREATORS.map((creator, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0 ${AVATAR_COLORS[i]}`}>
                    {creator.avatar}
                  </div>

                  {/* Name + niche */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#191C1D] truncate">
                      {creator.name}
                    </p>
                    <p className="text-[11px] text-[#444653] mt-0.5 truncate">{creator.niche}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-[#003AF4]">{creator.er}</p>
                    <p className="text-[11px] text-[#444653] mt-0.5">{creator.reach}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* View All button */}
            <button className="mt-6 w-full py-2.5 border border-[#C4C5D5] rounded text-[13px] font-medium text-[#191C1D] bg-white cursor-pointer">
              View All Creators
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}