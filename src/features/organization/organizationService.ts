import { privateAxiosInstance } from '@/api/base_api';
// import { ORGANIZATION_STATISTICS_ENDPOINT } from '@/api/endpoints';
import { ORGANIZATION_STATISTICS_ENDPOINT} from '@/api/endpoints'
// import { ORGANIZATION_STATISTICS_ENDPOINT} from '@/api/endpoints'
// import { OrganizationProfile } from '@/utils/types/organization';
import { AxiosError } from 'axios';

/**
 * Interface for organization statistics response
 */
interface OrganizationStatisticsResponse {
  caregivers: {
    total: number;
    active: number;
    verified: number;
  };
  patients: {
    total: number;
    active: number;
    verified: number;
    active_male: number;
    active_female: number;
    verified_male: number;
    verified_female: number;
  };
}

/**
 * Standard API response wrapper
 */
interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

/**
 * Fetches organization statistics
 * @returns Promise containing organization statistics
 * @throws {AxiosError} When the API request fails
 */
export const organizationStatisticsService = async (): Promise<OrganizationStatisticsResponse> => {
  try {
    const response = await privateAxiosInstance.get<ApiResponse<{ data: OrganizationStatisticsResponse }>>(
      ORGANIZATION_STATISTICS_ENDPOINT
    );
    return response.data.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch organization statistics'
      );
    }
    throw error;
  }
};

// /**
//  * Fetches organization profile
//  * @returns Promise containing organization profile data
//  * @throws {AxiosError} When the API request fails
//  */
// export const getOrganizationProfileService = async (): Promise<OrganizationProfile> => {
//   try {
//     const response = await privateAxiosInstance.get<ApiResponse<OrganizationProfile>>(
//       ORGANIZATION_PROFILE_ENDPOINT
//     );
//     return response.data.data;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       throw new Error(
//         error.response?.data?.message || 'Failed to fetch organization profile'
//       );
//     }
//     throw error;
//   }
// };

// /**
//  * Updates organization profile
//  * @param formData - FormData containing organization profile updates
//  * @returns Promise containing updated organization profile
//  * @throws {AxiosError} When the API request fails
//  */
// export const updateOrganizationProfileService = async (
//   formData: FormData
// ): Promise<OrganizationProfile> => {
//   try {
//     const response = await privateAxiosInstance.put<ApiResponse<OrganizationProfile>>(
//       ORGANIZATION_PROFILE_ENDPOINT,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     return response.data.data;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       throw new Error(
//         error.response?.data?.message || 'Failed to update organization profile'
//       );
//     }
//     throw error;
//   }
// };

const organizationService = {
  organizationStatisticsService,
  // getOrganizationProfileService,
  // updateOrganizationProfileService,
};

export default organizationService;