'use client';

import { Search, ChevronDown, Bookmark, Star } from 'lucide-react';
import SidebarMenu from '../../components/sidebarmenu';

const MOCK_CREATORS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: 'Tomiwa Alade',
  rating: 5.0,
  niche: 'Tech enthusiast & Lifest...',
  price: '$250',
  location: 'Lagos, Nigeria',
}));

const FILTERS = ['Location', 'Creator type', 'Niche', 'Reach'];

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-white">
      <SidebarMenu />

      <main className="lg:pl-[264px] pt-[72px]">
        <div className="px-8 py-6">

          {/* SEARCH */}
          <div className="relative mb-5">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded border py-3 pl-5 pr-12 text-sm text-[#171A22] placeholder-gray-400 outline-none"
              style={{ borderColor: '#091B68', borderWidth: '0.1px' }}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              <Search size={18} />
            </button>
          </div>

          {/* FILTERS */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-2 rounded-sm border bg-white px-4 py-2 text-sm text-[#191C1D] transition hover:border-[#091B68]"
                style={{ borderColor: '#C4C5D5' }}
              >
                {filter}
                <ChevronDown size={14} className="text-[#6B7280]" />
              </button>
            ))}
            <button className="text-sm font-medium text-[#5B6170] hover:text-[#091B68]">
              Reset Filters
            </button>
          </div>

          {/* CREATOR GRID */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_CREATORS.map((creator) => (
              <div
                key={creator.id}
                className="overflow-hidden bg-white"
              >
                {/* Image area */}
                <div className="relative h-[296px] w-full bg-[#D9D9D9]">
                  {/* Bookmark */}
                  <button className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-sm bg-white text-gray-500 transition hover:text-[#091B68]">
                    <Bookmark size={14} />
                  </button>
                  {/* Creator avatar — bottom center */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                    <div className="h-6 w-6 rounded-full bg-gray-500" />
                  </div>
                </div>

                {/* Card info */}
                <div className="px-0 pt-2 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#171A22]">{creator.name}</span>
                    <div className="flex items-center gap-1 text-xs text-[#5B6170]">
                      <Star size={11} className="fill-yellow-400 text-yellow-400" />
                      {creator.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between">
                    <span className="truncate text-xs text-[#5B6170]">{creator.niche}</span>
                    <span className="ml-2 shrink-0 text-sm font-semibold text-[#171A22]">{creator.price}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#5B6170]">{creator.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* LOAD MORE */}
          <div className="mt-12 flex justify-center pb-8">
            <button
              className="rounded px-16 py-2.5 text-sm font-medium transition hover:opacity-80"
              style={{ border: '2px solid #091B68', color: '#091B68' }}
            >
              Load More Creators
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}