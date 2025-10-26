import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import toast from 'react-hot-toast';
// import { organizationToggleCaregiverStatus } from '@/app/redux/slices/organization/organizationSlice';
// import { organizationToggleCaregiverStatus } from '@/app/redux/slices/organization/organizationSlice';
import type { Caregiver } from '@/utils/types/caregiver';
// import { toggleCaregiverStatus } from '@/features/caregiver/caregiverSlice';

interface ToggleCareGiverStatusModalProps {
  selectedCareGiver: Caregiver | null;
  showToggleCareGiverStatusModal: boolean;
  closeToggleCareGiverStatusModal: () => void;
}

const ToggleCareGiverStatusModal = ({
  selectedCareGiver,
  showToggleCareGiverStatusModal,
  closeToggleCareGiverStatusModal,
}: ToggleCareGiverStatusModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.caregiver);

  const handleToggleStatus = async () => {
    if (selectedCareGiver) {
     
        // await dispatch(toggleCaregiverStatus(selectedCareGiver.slug)).unwrap();
        toast.success(`Caregiver ${selectedCareGiver.first_name} ${selectedCareGiver.last_name} status toggled successfully!`);
        closeToggleCareGiverStatusModal();
      
    }
  };

  return (
    <Dialog open={showToggleCareGiverStatusModal} onOpenChange={closeToggleCareGiverStatusModal}>
      <DialogContent className="sm:max-w-md w-[400px] font-inter rounded-lg p-0">
        <DialogHeader className="w-full border-b flex items-center flex-row  justify-between px-4 py-2">
          <DialogTitle className="text-base font-semibold text-[#333238] w-fit">CareGiver Details</DialogTitle>
          <DialogClose className='w-fit' asChild>
            <IoCloseCircleSharp className="h-8 w-8 text-red-600 cursor-pointer" />
          </DialogClose>
        </DialogHeader>
        <div className="px-4 pt-2 space-y-2">
          <p className="flex items-center gap-2 font-normal text-sm">
            <span className="font-light">Name:</span>
            <span className="font-medium capitalize">
              {selectedCareGiver?.first_name} {selectedCareGiver?.last_name}
            </span>
          </p>
          <p className="flex items-center gap-2 font-normal text-sm">
            <span className="font-light">Staff ID:</span>
            <span>{selectedCareGiver?.staff_number}</span>
          </p>
          <p className="flex items-center gap-2 font-normal text-sm">
            <span className="font-light">Role:</span>
            <span className="capitalize">{selectedCareGiver?.caregiver_type}</span>
          </p>
          <p className="flex items-center gap-2 font-normal text-sm">
            <span className="font-light">Status:</span>
            <span
              className={`font-light text-[12px] transition-all duration-300 ease-in-out text-white rounded-full w-fit h-fit ${
                selectedCareGiver?.active ? 'bg-[#8CC497]' : 'bg-red-400'
              } px-2 py-1`}
            >
              {selectedCareGiver?.active ? 'Active' : 'Deactivated'}
            </span>
          </p>
          <div className="mt-7 mb-3 grid place-items-center w-full">
          <Button
              type="button"
              variant={"default"}
              className={`border border-[#084F61] my-3 w-fit transition-all duration-300 hover:cursor-pointer focus:outline-none ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              onClick={handleToggleStatus}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Toggling...
                </span>
              ) : selectedCareGiver?.active ? (
                'Deactivate'
              ) : (
                'Activate'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleCareGiverStatusModal;