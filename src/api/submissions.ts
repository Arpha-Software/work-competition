import { api } from '@/api/api';
import { headers } from 'next/headers';

export type Submission = {
  id: number;
  fullName: string;
  category: string;
  region: string;
  email: string;
  phoneNumber: string;
  age: number;
  comment: string;
  agreement: string;
  file: {
    id: number;
    mimeType: string;
    accessLink: string;
  };
  submittedAt: string;
  numberOfVotes: number;
  currentUserVoted: boolean;
  public: boolean;
  hidden: boolean;
};

export type SubmissionsResponse = {
  content: Submission[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
};

export type VisibilityRequest = {
  records: {
    id: number;
    isVisible: boolean;
  }[];
};

export type PublicityRequest = {
  records: {
    id: number;
    isPublic: boolean;
  }[];
};

export const getSubmissions = async (region?: string, category?: string, subcategory?: string): Promise<SubmissionsResponse> => {
  const params = new URLSearchParams();
  if (region && region !== 'all') {
    params.append('region', region);
  }
  if (category && category !== 'all') {
    params.append('category', category);
  }
  if (subcategory && subcategory !== 'all') {
    params.append('subcategory', subcategory);
  }

  const response = await api.get<SubmissionsResponse>(`/submissions?${params.toString()}`);
  return response.data;
};

export const updateVisibility = async (data: VisibilityRequest): Promise<void> => {
  await api.put('/submissions/visibility', data);
};

export const updatePublicity = async (data: PublicityRequest): Promise<void> => {
  await api.put('/submissions/publicity', data);
};

export const deleteSubmission = async (id: number): Promise<void> => {
  await api.delete(`/submissions/${id}`);
};

export const likeSubmission = async (id: number) => {
  return await api.post(`/submissions/${id}/vote`);
};

export type FeatureResponse = {
  featureName: string;
  enabled: boolean;
};

export type FeatureRequest = {
  enabled: boolean;
};

export const getFeature = async (featureName: string): Promise<FeatureResponse> => {
  const response = await api.get<FeatureResponse>(`/features/${featureName}`);
  return response.data;
};

export const updateFeature = async (featureName: string, enabled: boolean): Promise<void> => {
  await api.put(`/features/${featureName}`, { enabled });
};

export type Moderator = {
  id: number;
  username: string;
  password: string;
  allowedRegions: string[];
};

export type CreateModeratorRequest = {
  username: string;
  password: string;
  allowedRegions: string[];
};

export const getModerators = async (): Promise<Moderator[]> => {
  const response = await api.get<Moderator[]>('/moderators');
  return response.data;
};

export const getModerator = async (id: number): Promise<Moderator> => {
  const response = await api.get<Moderator>(`/moderators/${id}`);
  return response.data;
};

export const createModerator = async (data: CreateModeratorRequest): Promise<Moderator> => {
  const response = await api.post<Moderator>('/moderators', data);
  return response.data;
};

export const deleteModerator = async (id: number): Promise<void> => {
  await api.delete(`/moderators/${id}`);
}; 