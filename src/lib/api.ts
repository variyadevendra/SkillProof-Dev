import useSWR, { SWRConfiguration } from 'swr';

// Base API fetcher function
const apiFetcher = async (url: string) => {
  const response = await fetch(url);
  
  // Handle HTTP errors
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    const info = await response.json();
    (error as any).info = info;
    (error as any).status = response.status;
    throw error;
  }
  
  return response.json();
};

// Generic hook creator for API endpoints
const useApiData = <T>(endpoint: string, config?: SWRConfiguration) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<T>(
    endpoint,
    apiFetcher,
    {
      revalidateOnFocus: false,
      ...config,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    isValidating,
    mutate
  };
};

// Dashboard specific hooks
export const useDashboardStats = (userType: string) => {
  return useApiData(`/api/dashboard/stats?userType=${userType}`);
};

export const useDashboardActivity = (userType: string) => {
  return useApiData(`/api/dashboard/activity?userType=${userType}`);
};

export const useUpcomingSchedule = () => {
  return useApiData('/api/dashboard/schedule');
};

export const useSkillGrowth = (timeframe: string) => {
  return useApiData(`/api/dashboard/skills/growth?timeframe=${timeframe}`);
};

// Challenges hooks
export const useChallenges = (filters?: {
  type?: string;
  skill?: string;
  difficulty?: string;
  search?: string;
}) => {
  // Construct query string based on filters
  const queryParams = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== `All ${key}s`) {
        queryParams.append(key, value);
      }
    });
  }
  
  const queryString = queryParams.toString();
  const endpoint = `/api/challenges${queryString ? `?${queryString}` : ''}`;
  
  return useApiData(endpoint);
};

// Submissions hooks
export const useSubmissions = () => {
  return useApiData('/api/submissions');
};

// Interview hooks
export const useInterviews = () => {
  return useApiData('/api/interviews');
};

// Employer specific hooks
export const useCandidateSubmissions = () => {
  return useApiData('/api/employer/submissions');
};

export const useInterviewRequests = () => {
  return useApiData('/api/employer/interview-requests');
};

export const useAnalytics = (timeframe: string) => {
  return useApiData(`/api/employer/analytics?timeframe=${timeframe}`);
}; 