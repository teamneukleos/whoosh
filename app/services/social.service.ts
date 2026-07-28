import { api } from '../lib/axios';

export type SocialPlatform = 'YOUTUBE' | 'INSTAGRAM' | 'TIKTOK';

export interface SocialConnection {
  id: string;
  platform: SocialPlatform;
  handle: string;
  profileUrl: string | null;
  followerCount: number;
  isPrimary: boolean;
  lastSyncedAt: string | null;
  connected: boolean;
}

export interface AuthorizationUrlResponse {
  authorizationUrl: string;
}

export interface SocialMessageResponse {
  message: string;
}

export const socialService = {
  list: async (): Promise<SocialConnection[]> => {
    const response = await api.get<SocialConnection[]>('/creators/social');
    return response.data;
  },

  getYouTubeConnectUrl: async (): Promise<AuthorizationUrlResponse> => {
    const response = await api.get<AuthorizationUrlResponse>(
      '/creators/social/youtube/connect'
    );
    return response.data;
  },

  syncYouTube: async (): Promise<SocialConnection> => {
    const response = await api.post<SocialConnection>(
      '/creators/social/youtube/sync'
    );
    return response.data;
  },

  disconnectYouTube: async (): Promise<SocialMessageResponse> => {
    const response = await api.delete<SocialMessageResponse>(
      '/creators/social/youtube'
    );
    return response.data;
  },
};
