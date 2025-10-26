import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatisticCard from "@/components/dashboard/StatisticsCard";
import InviteCaregiverModal from "@/components/modals/InviteCaregiverModal";
// import ContinueWithMedicalId from "@/components/modal/ContinueWithMedicalId";
import StatisticCardSkeleton from "@/components/loading/skeletons/StatisticCardSkeleton";
import StatisticCardGenderSkeleton from "@/components/loading/skeletons/StatisticCardGenderSkeleton";
// import NonPaginatedCaregiverInviteHistoryTable from "@/components/tables/unpaginated/NonPaginatedCaregiverInviteHistoryTable";
// import NonPaginatedPatientRegistrationHistory from "@/components/tables/unpaginated/NonPaginatedPatientRegistrationHistory";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchOrganizationDashboardStatisticsData } from "@/features/organization/organizationSlice";
import visitIcon from "@/assets/icons/visits.svg";
import patientsIcon from "@/assets/icons/patients.svg";
import genderIcon from "@/assets/icons/gender.svg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const OrganizationDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { statistics } = useSelector((state: RootState) => state.organization);

  useEffect(() => {
    if (!statistics) {
      dispatch(fetchOrganizationDashboardStatisticsData());
    }
  }, [dispatch, statistics]);

  console.log('page',statistics)

  return (
    <motion.div
      className="px-4 sm:px-6 lg:px-8 py-4 md:py-8"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {/* Top Actions */}
      <motion.div
        // variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full"
      >
        <InviteCaregiverModal />
        {/* <ContinueWithMedicalId secondaryButton /> */}
        <Button
          className="border xl:w-[270px] border-[#1786A2] text-[#1786A2] bg-white outline-none hover:bg-[#1786A2] hover:text-white transition-all duration-300"
        >
          <Link
            to="/organization/register-patient"
            className="w-full h-full flex items-center justify-center"
          >
            Register a patient
          </Link>
        </Button>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        // variants={fadeInUp}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10"
      >
        {statistics ? (
          <>
            <StatisticCard
              icon={visitIcon}
              bgContainer="#FFFBFB"
              bgIconContainer="#FFEBEC"
              title="Caregivers"
              value={statistics?.caregivers?.active || 0}
            />
            <StatisticCard
              icon={patientsIcon}
              bgContainer="#FAFCFF"
              bgIconContainer="#ECF3FF"
              title="Patients"
              value={statistics?.patients.active || 0}
            />
            <StatisticCard
              icon={genderIcon}
              bgContainer="#FAFCFF"
              header="Patients by Gender"
              compareGenders
            />
          </>
        ) : (
          <>
            <StatisticCardSkeleton />
            <StatisticCardSkeleton />
            <StatisticCardGenderSkeleton />
          </>
        )}
      </motion.div>

      {/* Tables Section
      <motion.div  className="mt-12 space-y-8">
        <NonPaginatedCaregiverInviteHistoryTable />
        <NonPaginatedPatientRegistrationHistory />
      </motion.div> */}
    </motion.div>
  );
};

export default OrganizationDashboard;
