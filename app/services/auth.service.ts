import { api } from '../lib/axios';

export type IntendedRole = 'BRAND' | 'CREATOR';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  intendedRole: IntendedRole;
  avatarUrl: string | null;
  createdAt: string;
}

export interface UserBrandMembership {
  brandId: string;
  name: string;
  role: string;
}

export interface MeResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  intendedRole: IntendedRole;
  avatarUrl: unknown;
  createdAt: string;
  isCreator: boolean;
  creatorId: unknown;
  brands: UserBrandMembership[];
  needsOnboarding: boolean;
}

export interface AuthTokenResponse {
  accessToken: string;
  user: AuthUser;
}

export interface RegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  intendedRole: IntendedRole;
}

export type RegisterResponse = AuthTokenResponse;

export interface LoginPayload {
  email: string;
  password: string;
}

export type LoginResponse = AuthTokenResponse;

export interface CreatorOnboardPayload {
  displayName: string;
  locationState: string;
  locationCity: string;
  bio: string;
  tier: 'NANO' | 'MICRO' | 'MID' | 'MACRO';
  primaryLanguage: 'EN' | 'PIDGIN' | 'YORUBA' | 'HAUSA' | 'IGBO';
  languages: Array<'EN' | 'PIDGIN' | 'YORUBA' | 'HAUSA' | 'IGBO'>;
  referredByCode?: string;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  displayName: string;
  bio: unknown;
  locationState: string;
  locationCity: unknown;
  tier: 'NANO' | 'MICRO' | 'MID' | 'MACRO';
  primaryLanguage: string;
  verificationStatus: string;
  referralCode: string;
  languages: string[];
  createdAt: string;
}

export type CreatorOnboardResponse = CreatorProfile;

export type BrandIndustry =
  | 'FMCG'
  | 'FINTECH'
  | 'FASHION'
  | 'TELCO'
  | 'BEAUTY'
  | 'FOOD'
  | 'OTHER';

export interface BrandOnboardPayload {
  name: string;
  slug: string;
  industry: BrandIndustry;
  billingEmail: string;
  website?: string;
  serviceMode: 'MANAGED' | 'SELF_SERVE';
  memberRole: 'OWNER' | 'ADMIN' | 'MEMBER';
}

export interface BrandProfile {
  brandId: string;
  name: string;
  slug: string;
  industry: string;
  status: string;
  serviceMode: string;
  role: string;
  billingEmail: string;
  website: unknown;
  createdAt: string;
}

export type BrandOnboardResponse = BrandProfile;

export function toAuthUser(me: MeResponse): AuthUser {
  return {
    id: me.id,
    email: me.email,
    firstName: me.firstName,
    lastName: me.lastName,
    status: me.status,
    intendedRole: me.intendedRole,
    avatarUrl: typeof me.avatarUrl === 'string' ? me.avatarUrl : null,
    createdAt: me.createdAt,
  };
}

export const authService = {
  register: async (data: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  getMe: async (): Promise<MeResponse> => {
    const response = await api.get<MeResponse>('/auth/me');
    return response.data;
  },

  getCreatorMe: async (): Promise<CreatorProfile> => {
    const response = await api.get<CreatorProfile>('/creators/me');
    return response.data;
  },

  getBrandsMe: async (): Promise<BrandProfile[]> => {
    const response = await api.get<BrandProfile[]>('/brands/me');
    return response.data;
  },

  needsOnboarding: async (): Promise<boolean> => {
    const me = await authService.getMe();
    return me.needsOnboarding;
  },

  onboardCreator: async (
    data: CreatorOnboardPayload
  ): Promise<CreatorOnboardResponse> => {
    const response = await api.post<CreatorOnboardResponse>(
      '/creators/onboard',
      data
    );
    return response.data;
  },

  onboardBrand: async (
    data: BrandOnboardPayload
  ): Promise<BrandOnboardResponse> => {
    const response = await api.post<BrandOnboardResponse>(
      '/brands/onboard',
      data
    );
    return response.data;
  },
};
