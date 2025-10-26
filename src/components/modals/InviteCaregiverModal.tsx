import type { AppDispatch} from "@/app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInput from "../forms/FormInput";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoCloseCircleSharp } from "react-icons/io5";
import { InviteCaregiverSchema, type InviteCaregiverData } from "@/schemas/caregiver";
import { sendInvitationToCaregiver } from "@/features/caregiver/caregiverSlice";
import { caregiverRoles } from "@/utils/caregiver-types";

const InviteCaregiverModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { loading } = useSelector((state: RootState) => state.caregiver);
  
  // Local state for modal
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<InviteCaregiverData>({
    resolver: zodResolver(InviteCaregiverSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  const { handleSubmit, reset } = formMethods;

  const onSubmit: SubmitHandler<InviteCaregiverData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      await dispatch(sendInvitationToCaregiver(data)).unwrap();
      
      // Success
      toast.success(`Invitation sent to ${data.email} successfully.`);
      reset();
      setIsOpen(false); // Close modal
      
      
    } catch {
      // Error already handled by handleApiError in thunk
      toast.error("Failed to send invitation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full xl:w-[270px] border-none rounded-none border border-[#084F61] bg-[#1786A2] hover:bg-[#1786A2] cursor-pointer transition-all">
          Invite Caregiver
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogClose asChild>
            <IoCloseCircleSharp className="h-8 w-8 text-red-600 cursor-pointer" />
          </DialogClose>
          <DialogTitle className="text-[#009899] font-inter font-semibold text-center text-[28px] my-2">
            Invite a Caregiver
          </DialogTitle>
        </DialogHeader>
        
        <FormProvider {...formMethods}>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Your form fields */}
            <FormInput
              register={formMethods.register}
              fieldName="email"
              labelText="Email address"
              inputType="email"
              placeholder="Enter your email address"
              errors={formMethods.formState.errors}
            />

            <FormField
              control={formMethods.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#009899] ">Caregiver Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {caregiverRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formMethods.formState.errors.role && (
                    <p className="text-red-600 text-sm">
                      {formMethods.formState.errors.role.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="w-full font-medium border border-[#084F61] bg-[#1786A2] hover:bg-[#1786A2] cursor-pointer transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Invite Caregiver"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCaregiverModal;