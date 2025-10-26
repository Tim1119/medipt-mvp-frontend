import { privateAxiosInstance } from '@/api/base_api';
import {
  // ALL_CAREGIVERS_ENDPOINT,
  ALL_CAREGIVERS_IN_ORGANIZATION_ENDPOINT,
  // CAREGIVER_ACCEPT_ORGANIZATION_INVITE_ENDPOINT,
  INVITE_CAREGIVER_ENDPOINT,
  // LATEST_CAREGIVERS_ENDPOINT,
  // TOGGLE_CAREGIVER_STATUS_ENDPOINT,
} from '@/api/endpoints';
import type {
  // CaregiverAcceptOrganizationInvitationData,
  InviteCaregiverData,
} from '@/schemas/caregiver'
// /**
//  * Fetch the latest caregivers
//  */
// export const fetchLatestCaregiversService = async () => {
//   const response = await privateAxiosInstance.get(LATEST_CAREGIVERS_ENDPOINT);
//   // Backend structure assumption: { data: [...] }
//   return response.data.data;
// };

// /**
//  * Toggle caregiver status (active/inactive)
//  */
// export const toggleCaregiverStatusService = async (caregiverSlug: string) => {
//   const response = await privateAxiosInstance.patch(
//     `${TOGGLE_CAREGIVER_STATUS_ENDPOINT}${caregiverSlug}/`
//   );
//   // Backend structure assumption: { data: {...caregiverObject} }
//   return response.data.data;
// };

// /**
//  * Fetch paginated caregiver invite history
//  */
// export const fetchCaregiverInviteHistoryService = async (
//   page: number,
//   pageSize: number,
//   searchTerm: string
// ) => {
//   const response = await privateAxiosInstance.get(ALL_CAREGIVERS_ENDPOINT, {
//     params: {
//       page,
//       page_size: pageSize,
//       search: searchTerm,
//     },
//   });

//   // Structure assumption: { data: { results: [...], count: number } }
//   return {
//     data: response.data.data.results,
//     totalCount: response.data.data.count,
//   };
// };

/**
 * Send an invite to a caregiver
 */
export const sendInviteToCaregiverService = async (
  invitedCaregiver: InviteCaregiverData
) => {
  const response = await privateAxiosInstance.post(
    INVITE_CAREGIVER_ENDPOINT,
    invitedCaregiver
  );
  // Structure assumption: { data: {...invitationObject} }
  console.log('_____> raw request',response.data.data)
  return response.data.data;
};

// /**
//  * Caregiver accepts organization invitation
//  */
// export const caregiverAcceptOrganizationInvitationService = async (
//   token: string,
//   data: CaregiverAcceptOrganizationInvitationData
// ) => {
//   const response = await privateAxiosInstance.post(
//     `${CAREGIVER_ACCEPT_ORGANIZATION_INVITE_ENDPOINT}${token}/`,
//     data
//   );
//   return response.data.data;
// };

/**
 * Fetch all caregivers within the current organization
 */
export const fetchAllCaregiversInOrganizationService = async () => {
  const response = await privateAxiosInstance.get(
    ALL_CAREGIVERS_IN_ORGANIZATION_ENDPOINT
  );
  return response.data.data;
};

const caregiverService = {
  // fetchLatestCaregiversService,
  // toggleCaregiverStatusService,
  // fetchCaregiverInviteHistoryService,
  sendInviteToCaregiverService,
  // caregiverAcceptOrganizationInvitationService,
  fetchAllCaregiversInOrganizationService,
};

export default caregiverService;
