import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import caregiverService from './caregiverService';
import { handleApiError } from '@/api/error-handler';
import type {
  Caregiver,
  CaregiverBasicInfo,
} from '@/utils/types/caregiver';
import type {
  // CaregiverAcceptOrganizationInvitationData,
  InviteCaregiverData,
} from '@/schemas/caregiver';

interface CaregiverState {
  // latestCaregivers: Caregiver[];
  // organizationCaregivers: CaregiverBasicInfo[];
  // caregivers: Caregiver[];
  // loading: boolean;
  // error: string | null;
  // hasFetchedLatestCaregivers: boolean;
  // totalCount: number;

  allCaregivers: Caregiver[];
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  loading: boolean;
  hasFetched: boolean;
  error: string | null;
}

const initialState: CaregiverState = {
  // latestCaregivers: [],
  // organizationCaregivers: [],
  // caregivers: [],
  // loading: false,
  // error: null,
  // hasFetchedLatestCaregivers: false,
  // totalCount: 0,
  allCaregivers: [],
  pagination: { count: 0, next: null, previous: null },
  loading: false,
  hasFetched: false,
  error: null,
};

// interface AcceptInvitationResponse {
//   user_id: string;
//   email: string;
//   organization: string;
// }

// /* ---------------------------------- Thunks ---------------------------------- */

// export const fetchLatestCaregivers = createAsyncThunk<
//   Caregiver[],
//   void,
//   { rejectValue: string }
// >('caregiver/fetchLatestCaregivers', async (_, thunkAPI) => {
//   try {
//     return await caregiverService.fetchLatestCaregiversService();
//   } catch (error) {
//     handleApiError(error);
//     return thunkAPI.rejectWithValue('Error fetching latest caregivers');
//   }
// });

// export const toggleCaregiverStatus = createAsyncThunk<
//   Caregiver,
//   string,
//   { rejectValue: string }
// >('caregiver/toggleCaregiverStatus', async (caregiverSlug, thunkAPI) => {
//   try {
//     return await caregiverService.toggleCaregiverStatusService(caregiverSlug);
//   } catch (error) {
//     handleApiError(error);
//     return thunkAPI.rejectWithValue('Error toggling caregiver status');
//   }
// });


export const fetchAllCaregiversInOrganization = createAsyncThunk<
  { results: Caregiver[]; count: number; next: string | null; previous: string | null },
  void,
  { rejectValue: string }
>('caregiver/fetchAllCaregiversInOrganization', async (_, thunkAPI) => {
  try {
    await new Promise((r) => setTimeout(r, 500)); // small delay
    const data = await caregiverService.fetchAllCaregiversInOrganizationService();
    console.log('_____> invite data', data);

    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    handleApiError(error);
    return thunkAPI.rejectWithValue('Error fetching caregivers');
  }
});


// export const fetchCaregiverInviteHistory = createAsyncThunk<
//   { data: Caregiver[]; totalCount: number },
//   { page: number; pageSize: number; searchTerm: string },
//   { rejectValue: string }
// >('caregiver/fetchCaregiverInviteHistory', async (params, thunkAPI) => {
//   try {
//     return await caregiverService.fetchCaregiverInviteHistoryService(
//       params.page,
//       params.pageSize,
//       params.searchTerm
//     );
//   } catch (error) {
//     handleApiError(error);
//     return thunkAPI.rejectWithValue('Error fetching invite history');
//   }
// });

export const sendInvitationToCaregiver = createAsyncThunk<
  { invitation_id: string; email: string; role: string; status: string },
  InviteCaregiverData,
  { rejectValue: string }
>('caregiver/sendInvitationToCaregiver', async (invitedCaregiver, thunkAPI) => {
  try {
    return await caregiverService.sendInviteToCaregiverService(invitedCaregiver);
  } catch (error) {
    handleApiError(error);
    return thunkAPI.rejectWithValue('Failed to invite caregiver');
  }
});

// export const caregiverAcceptOrganizationInvitation = createAsyncThunk<
//   AcceptInvitationResponse,
//   { token: string; data: CaregiverAcceptOrganizationInvitationData },
//   { rejectValue: string }
// >(
//   'caregiver/acceptOrganizationInvitation',
//   async ({ token, data }, thunkAPI) => {
//     try {
//       return await caregiverService.caregiverAcceptOrganizationInvitationService(
//         token,
//         data
//       );
//     } catch (error) {
//       handleApiError(error);
//       return thunkAPI.rejectWithValue('Error accepting invitation');
//     }
//   }
// );

/* ---------------------------------- Slice ---------------------------------- */

const caregiverSlice = createSlice({
  name: 'caregiver',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // // --- Latest caregivers ---
      // .addCase(fetchLatestCaregivers.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchLatestCaregivers.fulfilled, (state, action) => {
      //   state.latestCaregivers = action.payload;
      //   state.loading = false;
      //   state.hasFetchedLatestCaregivers = true;
      // })
      // .addCase(fetchLatestCaregivers.rejected, (state, action) => {
      //   state.error = action.payload || 'Failed to fetch latest caregivers';
      //   state.loading = false;
      //   state.hasFetchedLatestCaregivers = true;
      // })

      // // --- Toggle caregiver status ---
      // .addCase(toggleCaregiverStatus.fulfilled, (state, action) => {
      //   const updated = action.payload;
      //   state.latestCaregivers = state.latestCaregivers.map((cg) =>
      //     cg.id === updated.id ? updated : cg
      //   );
      //   state.caregivers = state.caregivers.map((cg) =>
      //     cg.id === updated.id ? updated : cg
      //   );
      // })
      // .addCase(toggleCaregiverStatus.rejected, (state, action) => {
      //   state.error = action.payload || 'Failed to toggle caregiver status';
      // })

      // // --- Invite history ---
      // .addCase(fetchCaregiverInviteHistory.fulfilled, (state, action) => {
      //   state.caregivers = action.payload.data;
      //   state.totalCount = action.payload.totalCount;
      //   state.loading = false;
      // })
      // .addCase(fetchCaregiverInviteHistory.rejected, (state, action) => {
      //   state.error = action.payload || 'Failed to fetch invite history';
      //   state.loading = false;
      // })

      // --- Invitation sending ---
      .addCase(sendInvitationToCaregiver.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendInvitationToCaregiver.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendInvitationToCaregiver.rejected, (state, action) => {
        state.error = action.payload || 'Failed to invite caregiver';
        state.loading = false;
      })

      // // --- Accept invitation ---
      // .addCase(caregiverAcceptOrganizationInvitation.fulfilled, (state) => {
      //   state.loading = false;
      // })
      // .addCase(caregiverAcceptOrganizationInvitation.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || 'Failed to accept invitation';
      // })

      // // --- Organization caregivers ---
      

      // .addCase(fetchAllCaregiversInOrganization.fulfilled, (state, action) => {
      //   state.organizationCaregivers = action.payload.caregivers;
      //   state.loading = false;
      // })

      builder
      .addCase(fetchAllCaregiversInOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCaregiversInOrganization.fulfilled, (state, action) => {
        state.allCaregivers = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        };
        state.loading = false;
        state.hasFetched = true;
      })
      .addCase(fetchAllCaregiversInOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching caregivers';
      });
  },
});

// export const { clearLastAction } = caregiverSlice.actions;
export default caregiverSlice.reducer;
