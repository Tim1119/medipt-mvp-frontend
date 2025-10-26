export interface Caregiver {
    pkid?:string;
    first_name: string;
    last_name: string;
    caregiver_type: string;
    date_of_birth: string | null;
    marital_status: string | null;
    profile_picture: string;
    gender: string | null;
    phone_number: string | null;
    address: string | null;
    slug: string;
    id: string;
    active: boolean;
    verified: boolean;
    created_at:string;
    updated_at:string;
    staff_number:string;
  }


export interface CaregiverBasicInfo{
  id:string;
  caregiver_name:string;
}