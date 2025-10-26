import { useEffect, useMemo, useState } from 'react';
import {
  useMantineReactTable,
  MRT_Table,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'mantine-react-table';
import { Box, Button, Skeleton } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import defaultAvatarImage from '@/assets/images/default-avatar.png';
import type { Caregiver } from '@/utils/types/caregiver';
import { convertToDate } from '@/utils/helper-funtions';
import { fetchAllCaregiversInOrganization } from '@/features/caregiver/caregiverSlice';
import ToggleCareGiverStatusModal from '@/components/modals/ToggleCareGiverStatusModal';

const NonPaginatedCaregiverInviteHistoryTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [selectedCareGiverId, setSelectedCareGiverId] = useState<string | null>(null);

  const { allCaregivers, loading, hasFetched } = useSelector(
    (state: RootState) => state.caregiver
  );

  const isTableLoading = loading && !hasFetched;

  const handleOpenModal = (id: string) => {
    setSelectedCareGiverId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCareGiverId(null);
  };

  const handleExportRows = (rows: MRT_Row<Caregiver>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row, index) => [
      (index + 1).toString(),
      `${row.original.first_name} ${row.original.last_name}`,
      row.original.staff_number ?? '',
      row.original.caregiver_type ?? '',
      row.original.created_at ? convertToDate(row.original.created_at) : '',
    ]);

    autoTable(doc, {
      head: [['S/N', 'Full Name', 'Staff No', 'Role', 'Date/Time']],
      body: tableData,
    });

    doc.save('Caregiver Invite History.pdf');
  };

  const columns = useMemo<MRT_ColumnDef<Caregiver>[]>(
    () => [
      {
        accessorKey: 'profile_picture',
        header: 'Picture',
        Cell: ({ cell }) => {
          const profile_picture = cell.getValue() as string;
          const imageUrl = profile_picture?.startsWith('http')
            ? profile_picture
            : defaultAvatarImage;
          return (
            <motion.img
              src={imageUrl}
              width={48}
              height={48}
              alt="profile"
              className="rounded-full shadow-sm"
              whileHover={{ scale: 1.05 }}
            />
          );
        },
      },
      {
        accessorKey: 'full_name',
        header: 'Full Name',
        Cell: ({ cell }) => {
          const { first_name, last_name, created_at } = cell.row.original;
          return (
            <div className="flex flex-col">
              <span className="font-medium capitalize">{first_name} {last_name}</span>
              <span className="text-sm text-gray-500">{convertToDate(created_at)}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'staff_number',
        header: 'Staff No',
        Cell: ({ cell }) => (
          <div className="flex flex-col">
            <span className="font-medium">{cell.getValue() as string}</span>
            <span className="text-sm text-gray-500">Staff Number</span>
          </div>
        ),
      },
      {
        accessorKey: 'caregiver_type',
        header: 'Role',
        Cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium capitalize">{row.original.caregiver_type}</span>
            <span className="text-sm text-gray-500">Role</span>
          </div>
        ),
      },
      {
        header: 'Show Details',
        Cell: ({ row }) => (
          <p
            onClick={() => handleOpenModal(row.original.id)}
            className="text-[#009899] cursor-pointer font-medium hover:underline"
          >
            Show Details
          </p>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    data: allCaregivers.slice(0, 5),
    columns,
    enableTableHead: false,
    enablePagination: false,
    enableBottomToolbar: false,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box className="flex gap-3 py-2">
        <Button
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          disabled={!table.getPrePaginationRowModel().rows.length}
          leftIcon={<IconDownload />}
          variant="filled"
        >
          Export All
        </Button>
      </Box>
    ),
  });

  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchAllCaregiversInOrganization());
    }
  }, [dispatch, hasFetched]);

  return (
    <>
      <div className="w-full">
  <div className="flex justify-between items-center mb-4 mt-6">
    <h3 className="font-semibold text-xl text-gray-800">Invite History</h3>
    {allCaregivers?.length > 0 && (
      <Link
        to="caregivers/invite-history"
        className="text-[#009899] flex items-center gap-2 font-semibold text-sm hover:underline"
      >
        View all <FaArrowRightLong />
      </Link>
    )}
  </div>

  <AnimatePresence>
    {isTableLoading ? (
      [...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <Skeleton height={50} radius="sm" mb="sm" />
        </motion.div>
      ))
    ) : allCaregivers.length > 0 ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="overflow-x-auto" // <-- make container scrollable
      >
        <div className="min-w-[700px]">
          <MRT_Table table={table} />
        </div>
      </motion.div>
    ) : (
      <p className="text-gray-500 text-sm mt-3">No invite history available.</p>
    )}
  </AnimatePresence>
</div>


      {showModal && selectedCareGiverId && (
        <ToggleCareGiverStatusModal
          selectedCareGiver={allCaregivers.find((cg) => cg.id === selectedCareGiverId) || null}
          showToggleCareGiverStatusModal={showModal}
          closeToggleCareGiverStatusModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default NonPaginatedCaregiverInviteHistoryTable;
