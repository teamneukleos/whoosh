'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSocialConnections } from '@/app/hooks/social/useSocialConnections';
import { useConnectYouTube } from '@/app/hooks/social/useConnectYouTube';
import { useSyncYouTube } from '@/app/hooks/social/useSyncYouTube';
import { useDisconnectYouTube } from '@/app/hooks/social/useDisconnectYouTube';
import { getApiErrorMessage } from '@/app/lib/api-error';
import type { SocialConnection } from '@/app/services/social.service';

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}

function formatFollowers(count: number) {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

function formatSyncedAt(value: string | null) {
  if (!value) return 'Never synced';
  try {
    return `Synced ${new Date(value).toLocaleString()}`;
  } catch {
    return 'Synced recently';
  }
}

type SocialAccountsPanelProps = {
  returnPath: string;
  showManagementActions?: boolean;
};

export default function SocialAccountsPanel({
  returnPath,
  showManagementActions = true,
}: SocialAccountsPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useSocialConnections();
  const { mutate: connectYouTube, isPending: isConnecting } = useConnectYouTube();
  const { mutate: syncYouTube, isPending: isSyncing } = useSyncYouTube();
  const { mutate: disconnectYouTube, isPending: isDisconnecting } =
    useDisconnectYouTube();

  const [banner, setBanner] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    const status = searchParams.get('youtube');
    if (!status) return;

    if (status === 'connected') {
      setBanner({
        type: 'success',
        message: 'YouTube connected successfully.',
      });
      void refetch();
    } else if (status === 'error') {
      setBanner({
        type: 'error',
        message:
          searchParams.get('message')?.replace(/_/g, ' ') ||
          'Could not connect YouTube. Please try again.',
      });
    }

    router.replace(returnPath, { scroll: false });
  }, [searchParams, router, returnPath, refetch]);

  const youtube = useMemo(
    () => data?.find((account) => account.platform === 'YOUTUBE') ?? null,
    [data]
  );

  function handleConnect() {
    setActionError(null);
    connectYouTube(returnPath, {
      onError: (err) => {
        setActionError(
          getApiErrorMessage(err, 'Could not start YouTube connection.')
        );
      },
    });
  }

  function handleSync() {
    setActionError(null);
    syncYouTube(undefined, {
      onError: (err) => {
        setActionError(getApiErrorMessage(err, 'Could not sync YouTube.'));
      },
    });
  }

  function handleDisconnect() {
    setActionError(null);
    disconnectYouTube(undefined, {
      onSuccess: () => {
        setBanner({
          type: 'success',
          message: 'YouTube disconnected.',
        });
      },
      onError: (err) => {
        setActionError(
          getApiErrorMessage(err, 'Could not disconnect YouTube.')
        );
      },
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {banner && (
        <div
          className={`rounded border px-4 py-3 text-sm ${
            banner.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {banner.message}
        </div>
      )}

      {(actionError || isError) && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError ||
            getApiErrorMessage(error, 'Could not load social accounts.')}
        </div>
      )}

      <PlatformCard
        name="YouTube"
        description="Connect your channel so brands can see your reach."
        icon={<YouTubeIcon className="h-5 w-5 text-[#FF0000]" />}
        account={youtube}
        isLoading={isLoading || isFetching}
        isConnecting={isConnecting}
        isSyncing={isSyncing}
        isDisconnecting={isDisconnecting}
        showManagementActions={showManagementActions}
        onConnect={handleConnect}
        onSync={handleSync}
        onDisconnect={handleDisconnect}
      />

      <PlatformCard
        name="Instagram"
        description="Coming soon"
        disabled
      />

      <PlatformCard
        name="TikTok"
        description="Coming soon"
        disabled
      />
    </div>
  );
}

function PlatformCard({
  name,
  description,
  icon,
  account,
  disabled,
  isLoading,
  isConnecting,
  isSyncing,
  isDisconnecting,
  showManagementActions,
  onConnect,
  onSync,
  onDisconnect,
}: {
  name: string;
  description: string;
  icon?: ReactNode;
  account?: SocialConnection | null;
  disabled?: boolean;
  isLoading?: boolean;
  isConnecting?: boolean;
  isSyncing?: boolean;
  isDisconnecting?: boolean;
  showManagementActions?: boolean;
  onConnect?: () => void;
  onSync?: () => void;
  onDisconnect?: () => void;
}) {
  const connected = Boolean(account?.connected);

  return (
    <div
      className={`rounded border border-[#D0D5DD] px-4 py-4 ${
        disabled ? 'opacity-60' : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded bg-[#F2F4F7]">
            {icon ?? (
              <span className="text-xs font-semibold text-[#667085]">
                {name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#191C1D]">{name}</p>
            {connected && account ? (
              <div className="mt-1 space-y-0.5 text-sm text-[#4B4E5F]">
                <p>
                  @{account.handle.replace(/^@/, '')}
                  {account.followerCount > 0
                    ? ` · ${formatFollowers(account.followerCount)} followers`
                    : ''}
                </p>
                <p className="text-xs text-[#667085]">
                  {formatSyncedAt(account.lastSyncedAt)}
                </p>
                {account.profileUrl && (
                  <a
                    href={account.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-[#091B68] hover:underline"
                  >
                    View channel
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-1 text-sm text-[#4B4E5F]">{description}</p>
            )}
          </div>
        </div>

        {!disabled && (
          <div className="flex shrink-0 flex-col items-end gap-2">
            {!connected ? (
              <button
                type="button"
                onClick={onConnect}
                disabled={isConnecting || isLoading}
                className="rounded bg-[#091B68] px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {isConnecting ? 'Redirecting...' : 'Connect'}
              </button>
            ) : showManagementActions ? (
              <>
                <button
                  type="button"
                  onClick={onSync}
                  disabled={isSyncing || isDisconnecting}
                  className="rounded border border-[#1C52FF] bg-white px-3 py-2 text-xs font-medium text-[#091B68] transition hover:bg-[#f0f4ff] disabled:opacity-50"
                >
                  {isSyncing ? 'Syncing...' : 'Sync now'}
                </button>
                <button
                  type="button"
                  onClick={onDisconnect}
                  disabled={isDisconnecting || isSyncing}
                  className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
                >
                  {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
                </button>
              </>
            ) : (
              <span className="rounded bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                Connected
              </span>
            )}
          </div>
        )}

        {disabled && (
          <span className="rounded bg-[#F2F4F7] px-2.5 py-1 text-xs font-medium text-[#667085]">
            Soon
          </span>
        )}
      </div>
    </div>
  );
}
