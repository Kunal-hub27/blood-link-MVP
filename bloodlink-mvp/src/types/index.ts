export type Language = "en" | "kn" | "hi" | "ta" | "te" | "ml" | "mr" | "bn";

export type UserRole = "public" | "donor" | "hospital_rep" | "blood_bank_rep" | "admin";

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type Donor = {
  id: string;
  name: string; // privacy-safe display name e.g. "Ramesh K."
  blood_group: BloodGroup;
  state: string;
  district: string;
  city: string; // city, town, or village name
  is_village?: boolean;
  pin_code: string;
  available: boolean;
  last_donation: string;
  is_demo: boolean;
  contact_preference: "In-app Request" | "WhatsApp Consent" | "Volunteer Assisted";
  coordinates?: { lat: number; lng: number };
  consented_at?: string;
  verified?: boolean;
};

export type HospitalCategory =
  | "Government Medical College"
  | "District Government Hospital"
  | "Taluk Hospital"
  | "Community Health Centre (CHC)"
  | "Primary Health Centre (PHC)"
  | "Government General Hospital"
  | "Government Blood Bank"
  | "Authorised Blood Storage Centre";

export type Hospital = {
  id: string;
  name: string;
  category: HospitalCategory;
  state: string;
  district: string;
  city_or_village: string;
  address: string;
  pin_code: string;
  contact_number: string;
  website?: string;
  has_blood_bank: boolean;
  blood_bank_verified: boolean;
  blood_storage_available: boolean;
  verification_date: string;
  data_source: string;
  coordinates: { lat: number; lng: number };
};

export type BloodBank = {
  id: string;
  facility_name: string;
  category: "Government" | "Red Cross" | "Charitable Trust" | "Hospital-Attached";
  state: string;
  district: string;
  city: string;
  address: string;
  pin_code: string;
  phone: string;
  verification_status: "verified" | "pending";
  operates_24x7: boolean;
  last_verified: string;
  coordinates: { lat: number; lng: number };
};

export type RequestPriority = "Critical" | "High" | "Normal";

export type RequestStatus =
  | "Searching for Donors"
  | "Donor Response Received"
  | "Connected to Hospital"
  | "Fulfilled"
  | "Cancelled"
  | "Expired";

export type EmergencyRequest = {
  id: string;
  reference_id: string;
  patient_name_or_ref: string;
  blood_group: BloodGroup;
  units: number;
  hospital_name: string;
  state: string;
  district: string;
  city: string;
  needed_by: string;
  urgency: RequestPriority;
  status: RequestStatus;
  contact_person: string;
  contact_phone: string;
  created_at: string;
  is_demo: boolean;
  notes?: string;
};

export type DonationCamp = {
  id: string;
  title: string;
  organizer: string;
  state: string;
  district: string;
  location_venue: string;
  date: string;
  timing: string;
  contact_number: string;
  status: "Upcoming" | "Completed" | "Verified";
  expected_donors?: number;
};

export type Notice = {
  kind: "success" | "error" | "info";
  text: string;
};

export type AbuseReport = {
  id: string;
  target_type: "donor" | "request" | "hospital" | "announcement";
  target_id: string;
  reason: string;
  reported_at: string;
  status: "pending_review" | "resolved" | "dismissed";
};

export type AuditLogEntry = {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  details: string;
};
