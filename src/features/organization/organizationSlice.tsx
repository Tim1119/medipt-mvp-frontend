import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import organizationService from './organizationService';
import { handleApiError } from '@/api/error-handler';
// import { OrganizationProfile } from '@/utils/types/organization';

/**
 * Dashboard statistics interface
 */
interface DashboardStatistics {
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
 * Dashboard state interface
 */
interface DashboardState {
  statistics: DashboardStatistics | null;
  // organizationProfile: OrganizationProfile | null;
  loading: boolean;
  error: string | null;
}

/**
 * Initial state for the organization dashboard
 */
const initialState: DashboardState = {
  statistics: null,
  // organizationProfile: null,
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch organization dashboard statistics
 */
export const fetchOrganizationDashboardStatisticsData = createAsyncThunk<
  DashboardStatistics,
  void,
  { rejectValue: string }
>(
  'organization/fetchOrganizationDashboardData',
  async (_, thunkAPI) => {
    try {
      const statistics = await organizationService.organizationStatisticsService();
//       console.log(statistics.statistics
// ,"statistics----<")
      return statistics;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error fetching dashboard data';
      handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// /**
//  * Async thunk to fetch organization profile
//  */
// export const fetchOrganizationProfile = createAsyncThunk<
//   OrganizationProfile,
//   void,
//   { rejectValue: string }
// >(
//   'organization/fetchOrganizationProfile',
//   async (_, thunkAPI) => {
//     try {
//       const profile = await organizationService.getOrganizationProfileService();
//       return profile;
//     } catch (error) {
//       const errorMessage = error instanceof Error 
//         ? error.message 
//         : 'Error fetching organization profile data';
//       handleApiError(error);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// /**
//  * Async thunk to update organization profile
//  */
// export const updateOrganizationProfile = createAsyncThunk<
//   OrganizationProfile,
//   FormData,
//   { rejectValue: string }
// >(
//   'organization/updateOrganizationProfile',
//   async (formData, thunkAPI) => {
//     try {
//       const updatedProfile = await organizationService.updateOrganizationProfileService(formData);
//       return updatedProfile;
//     } catch (error) {
//       const errorMessage = error instanceof Error 
//         ? error.message 
//         : 'Error updating organization profile';
//       handleApiError(error);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

/**
 * Organization slice
 */
const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    /**
     * Clear error state
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Reset organization state to initial values
     */
    resetOrganizationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Organization Dashboard Statistics
      .addCase(fetchOrganizationDashboardStatisticsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrganizationDashboardStatisticsData.fulfilled,
        (state, action: PayloadAction<DashboardStatistics>) => {
          state.statistics = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        fetchOrganizationDashboardStatisticsData.rejected,
        (state, action) => {
          state.error = action.payload || 'Failed to fetch dashboard data';
          state.loading = false;
        }
      )

      // // Fetch Organization Profile
      // .addCase(fetchOrganizationProfile.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(
      //   fetchOrganizationProfile.fulfilled,
      //   (state, action: PayloadAction<OrganizationProfile>) => {
      //     state.organizationProfile = action.payload;
      //     state.loading = false;
      //     state.error = null;
      //   }
      // )
      // .addCase(fetchOrganizationProfile.rejected, (state, action) => {
      //   state.error = action.payload || 'Failed to fetch organization profile data';
      //   state.loading = false;
      // })

      // // Update Organization Profile
      // .addCase(updateOrganizationProfile.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(
      //   updateOrganizationProfile.fulfilled,
      //   (state, action: PayloadAction<OrganizationProfile>) => {
      //     state.organizationProfile = action.payload;
      //     state.loading = false;
      //     state.error = null;
      //   }
      // )
      // .addCase(updateOrganizationProfile.rejected, (state, action) => {
      //   state.error = action.payload || 'Failed to update organization profile';
      //   state.loading = false;
      // });
  },
});

export const { clearError, resetOrganizationState } = organizationSlice.actions;
export default organizationSlice.reducer;