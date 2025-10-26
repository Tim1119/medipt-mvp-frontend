
import { z } from "zod";

export const InviteCaregiverSchema = z.object({
    email: z.string().email("Invalid email format"),
    role: z.string().min(1, "Caregiver's role is required"),
  
  });
export type InviteCaregiverData = z.infer<typeof InviteCaregiverSchema>;


export const caregiverAcceptOrganizationInvitationSchema = z
  .object({
    first_name: z.string().min(1, 'First name is required').max(100, 'First name is too long'),
    last_name: z.string().min(1, 'Last name is required').max(100, 'Last name is too long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password is too long'),
    password_confirmation: z
      .string()
      .min(8, 'Password confirmation must be at least 8 characters')
      .max(128, 'Password confirmation is too long'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

export type CaregiverAcceptOrganizationInvitationData = z.infer<typeof caregiverAcceptOrganizationInvitationSchema>;