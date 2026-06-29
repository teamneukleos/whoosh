'use client';

import { useState } from 'react';
import { Plus, Calendar, MoreVertical, MapPin, Search } from 'lucide-react';
import SidebarMenu from '../../components/sidebarmenu';

// Types 

type CampaignStatus = 'Live' | 'Pending' | 'Completed' | 'Draft';

interface Campaign {
  id: number;
  name: string;
  status: CampaignStatus;
  brand: string;
  niche: string;
  creators: number;
  budget: string;
  startDate: string;
  endDate: string;
  reach: number[];
  location: string;
}

interface Creator {
  name: string;
  audience: string;
  platform: string;
  content: string;
  likes: string;
  views: string;
  state: 'Active' | 'Terminated';
}

//Mock Data 

const CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    name: 'Summer Afro-Beats Launch',
    status: 'Live',
    brand: 'PrimaryBrand Co.',
    niche: 'Lifestyle & Music',
    creators: 44,
    budget: '₦250,000',
    startDate: '2026-05-12',
    endDate: '2026-05-30',
    reach: [40, 65, 50, 80, 60, 90],
    location: 'Nigeria & Ghana',
  },
  {
    id: 2,
    name: 'Eco Friendly Skincare Sales',
    status: 'Pending',
    brand: 'Derma Beauty Ltd.',
    niche: 'Beauty & Sustainability',
    creators: 8,
    budget: '₦180,000',
    startDate: '2026-05-12',
    endDate: '2026-05-28',
    reach: [30, 45, 55, 40, 70, 50],
    location: 'Abuja, Nigeria',
  },
  {
    id: 3,
    name: 'Tech Unboxed Series',
    status: 'Completed',
    brand: 'GadgetHub NG',
    niche: 'Tech & Gadgets',
    creators: 5,
    budget: '₦120,000',
    startDate: '2026-03-01',
    endDate: '2026-03-20',
    reach: [55, 70, 65, 80, 75, 90],
    location: 'Lagos, Nigeria',
  },
];

const CAMPAIGN_CREATORS: Creator[] = [
  {
    name: 'Ajao Nifemi',
    audience: '15.7k',
    platform: 'Tik Tok',
    content: 'Short Video',
    likes: '20k Likes',
    views: '450k Views',
    state: 'Active',
  },
  {
    name: 'Bambe Oluw...',
    audience: '15.7k',
    platform: 'Tik Tok',
    content: 'Short Video',
    likes: '20k Likes',
    views: '450k Views',
    state: 'Terminated',
  },
];

//Campaign Card 

function CampaignCard({
  campaign,
  selected,
  onClick,
}: {
  campaign: Campaign;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left transition-all ${
        selected
          ? 'rounded border border-[#2F82FF] bg-white'
          : 'border-t border-[#EEF1F7] bg-[#FBFCFF]'
      }`}
    >
      <article className="px-4 py-4 lg:px-5 lg:py-5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="truncate text-lg font-medium text-[#24272B]">
            {campaign.name}
          </h3>
          {campaign.status === 'Live' && (
            <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#071A68]">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <path
                  d="M2.5 13.5 7.4 8.6l3.2 3.2L17.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 5h4.5v4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>+25.7%</span>
            </div>
          )}
        </div>

        {/* Niche + date */}
        <div className="mt-3 flex items-center justify-between">
          <p className="truncate text-sm text-[#4E5160]">
            {campaign.niche} • {campaign.location}
          </p>
          <div className="ml-2 flex shrink-0 items-center gap-1 text-sm text-[#4E5160]">
            <Calendar size={14} />
            <span>
              {new Date(campaign.startDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Reach bars + status */}
        <div className="mt-6">
          <div className="flex items-center">
            <div className="flex overflow-hidden rounded">
              {['#D9D9D9', '#E4E9FF', '#B9C7FF', '#5475FF', '#0A36D9', '#071A68'].map(
                (color, index) => (
                  <span key={index} className="h-6 w-3" style={{ backgroundColor: color }} />
                )
              )}
            </div>
            <span className="ml-2 text-sm text-[#111217]">+{campaign.creators}</span>
          </div>

          <div className="mt-4">
            <span
              className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${
                campaign.status === 'Live'
                  ? 'bg-[#00D69B] text-white'
                  : campaign.status === 'Pending'
                  ? 'bg-[#EFA900] text-white'
                  : campaign.status === 'Completed'
                  ? 'bg-[#091B68] text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {campaign.status === 'Pending' ? 'Pending Approval' : campaign.status}
            </span>
          </div>
        </div>
      </article>
    </button>
  );
}

// Creator Row (desktop table)

function CreatorRow({
  creator,
  index,
  openMenu,
  setOpenMenu,
}: {
  creator: Creator;
  index: number;
  openMenu: number | null;
  setOpenMenu: (i: number | null) => void;
}) {
  return (
    <div className="grid grid-cols-[2fr_1fr_1.2fr_1.2fr_1fr_40px] items-center px-4 py-4">
      {/* Name + avatar */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 shrink-0 rounded bg-[#071A68]" />
        <div>
          <p className="text-xs font-medium text-[#191C1D]">{creator.name}</p>
          <p className="text-xs text-[#667085]">{creator.audience}</p>
        </div>
      </div>

      <span className="text-xs text-black">{creator.platform}</span>
      <span className="text-xs text-black">{creator.content}</span>

      <div className="text-xs text-black">
        <p>{creator.likes}</p>
        <p>{creator.views}</p>
      </div>

      <span
        className={`text-xs font-medium ${
          creator.state === 'Active' ? 'text-[#00D69B]' : 'text-black'
        }`}
      >
        {creator.state}
      </span>

      {/* Kebab menu */}
      <div className="relative">
        <button
          onClick={() => setOpenMenu(openMenu === index ? null : index)}
          className="rounded p-1 text-black hover:bg-gray-100"
        >
          <MoreVertical size={16} />
        </button>

        {openMenu === index && (
          <div className="absolute right-0 top-8 z-50 w-52 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <button className="w-full px-4 py-2 text-left text-xs text-black hover:bg-gray-50">
              WhatsApp
            </button>
            <button className="w-full px-4 py-2 text-left text-xs text-black hover:bg-gray-50">
              View Analytics
            </button>
            <button className="w-full px-4 py-2 text-left text-xs text-black hover:bg-gray-50">
              Manage Influencer
            </button>
            <button className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50">
              Delete Influencer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Creator Card (mobile)

function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="h-10 w-10 shrink-0 rounded bg-[#071A68]" />
          <div>
            <h4 className="text-sm font-medium text-black">{creator.name}</h4>
            <p className="text-xs text-[#667085]">{creator.audience}</p>
          </div>
        </div>
        <button className="text-black">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#667085]">Platform</span>
          <span className="text-black">{creator.platform}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">Content</span>
          <span className="text-black">{creator.content}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">Reach</span>
          <span className="text-black">{creator.views}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#667085]">State</span>
          <span
            className={creator.state === 'Active' ? 'text-[#00D69B]' : 'text-black'}
          >
            {creator.state}
          </span>
        </div>
      </div>
    </div>
  );
}

// Detail Panel

function CampaignDetail({ campaign }: { campaign: Campaign }) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div className="flex-1 overflow-y-auto border-t border-[#DBE4FF] bg-white px-6 py-5">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold leading-tight text-[#071A68] sm:text-3xl lg:text-5xl">
            {campaign.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-[#484B59]">
            <div className="flex items-center gap-2">
              {/* Filter/niche icon */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M4 4h16l-6 7v6l-4 2v-8L4 4Z" />
              </svg>
              <span>{campaign.niche}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{campaign.location}</span>
            </div>

            <button className="border-b border-[#484B59] text-sm">+3 more</button>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-[#444653]">
          <Calendar size={18} />
          <span>05/12</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-8 max-w-4xl text-lg leading-relaxed text-[#4B4E5F]">
        Driving awareness for the new beverage line across premium creator audiences in Lagos and
        Accra. Focus on vibrant, high-energy video content.
      </p>

      {/* View Brief button */}
      <button className="mt-6 inline-flex items-center gap-2 rounded bg-[#071A68] px-3 py-1.5 text-sm font-semibold text-white">
        View Brief
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Desktop table ── */}
      <div className="mt-10 hidden lg:block">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1.2fr_1.2fr_1fr_40px] bg-[#FBFCFF] px-4 py-3 text-xs font-medium text-black">
          <span>Name</span>
          <span>Platform</span>
          <span>Content Type</span>
          <span>Reach</span>
          <span>State</span>
          <span />
        </div>

        {/* Table rows */}
        {CAMPAIGN_CREATORS.map((creator, index) => (
          <CreatorRow
            key={index}
            creator={creator}
            index={index}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        ))}
      </div>

      {/* ── Mobile cards ── */}
      <div className="mt-6 space-y-3 lg:hidden">
        {CAMPAIGN_CREATORS.map((creator, index) => (
          <CreatorCard key={index} creator={creator} />
        ))}
      </div>
    </div>
  );
}

// Page 

type ActiveTab = 'Campaigns' | 'Brief' | 'Applications';

export default function CampaignPage() {
  const [selectedId, setSelectedId] = useState(CAMPAIGNS[0].id);
  const [activeTab, setActiveTab] = useState<ActiveTab>('Campaigns');

  const selectedCampaign = CAMPAIGNS.find((c) => c.id === selectedId) ?? CAMPAIGNS[0];

  return (
    <div className="min-h-screen bg-white">
      <SidebarMenu />

      <main className="pt-[72px] lg:pl-[264px]">
        <div className="flex min-h-[calc(100vh-72px)] flex-col px-4 py-4 lg:px-8 lg:py-6">

          {/* Search bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search Campaigns"
              className="w-full rounded-xl border border-[#E5E7EB] bg-white py-3 pl-5 pr-12 text-sm text-black outline-none focus:border-[#091B68]"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex items-center gap-6 overflow-x-auto whitespace-nowrap border-b border-[#E5E7EB]">
            {(['Campaigns', 'Brief', 'Applications'] as ActiveTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-[#091B68] font-medium text-[#091B68]'
                    : 'text-[#667085]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'Campaigns' && (
            <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:min-h-0">
              {/* Left: campaign list */}
              <div className="flex w-full shrink-0 flex-col gap-0 overflow-y-auto lg:w-[320px] lg:pr-1">
                {CAMPAIGNS.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    selected={campaign.id === selectedId}
                    onClick={() => setSelectedId(campaign.id)}
                  />
                ))}
              </div>

              {/* Right: detail */}
              <CampaignDetail campaign={selectedCampaign} />
            </div>
          )}

          {activeTab === 'Brief' && (
            <div className="flex flex-1 items-center justify-center text-sm text-[#667085]">
              Brief tab — coming soon
            </div>
          )}

          {activeTab === 'Applications' && (
            <div className="flex flex-1 items-center justify-center text-sm text-[#667085]">
              Applications tab — coming soon
            </div>
          )}

        </div>
      </main>
    </div>
  );
}