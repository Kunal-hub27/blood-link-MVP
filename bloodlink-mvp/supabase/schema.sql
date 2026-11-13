-- ====================================================================
-- BloodLink Expanded Schema: India-Wide Blood Donation & Public Healthcare Network
-- Apply directly in Supabase SQL Editor.
-- ====================================================================

create extension if not exists pgcrypto;

-- 1. USER PROFILES & ROLES
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 70),
  role text not null default 'public' check (role in ('public', 'donor', 'hospital_rep', 'blood_bank_rep', 'admin')),
  phone text check (phone is null or char_length(phone) between 10 and 15),
  preferred_language text not null default 'en' check (preferred_language in ('en', 'kn', 'hi', 'ta', 'te', 'ml', 'mr', 'bn')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. DONOR PROFILES
create table if not exists public.donor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 70),
  age integer not null check (age between 18 and 65),
  blood_group text not null check (blood_group in ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  state text not null check (char_length(state) between 2 and 50),
  district text not null check (char_length(district) between 2 and 60),
  city_or_village text not null check (char_length(city_or_village) between 1 and 80),
  is_village boolean not null default false,
  pin_code text not null check (pin_code ~ '^[0-9]{6}$'),
  contact_preference text not null default 'In-app Request' check (contact_preference in ('In-app Request', 'WhatsApp Consent', 'Volunteer Assisted')),
  available boolean not null default true,
  last_donation_date text,
  approx_latitude numeric(9,6),
  approx_longitude numeric(9,6),
  location_accuracy text default 'district_centroid',
  verified boolean not null default false,
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. EMERGENCY BLOOD REQUESTS
create table if not exists public.blood_requests (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  created_by uuid not null references auth.users(id) on delete cascade,
  blood_group text not null check (blood_group in ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  units integer not null check (units between 1 and 20),
  hospital_name text not null check (char_length(hospital_name) between 1 and 100),
  state text not null check (char_length(state) between 2 and 50),
  district text not null check (char_length(district) between 2 and 60),
  city text not null check (char_length(city) between 1 and 80),
  needed_by text not null,
  urgency text not null default 'Normal' check (urgency in ('Critical','High','Normal')),
  status text not null default 'Searching for Donors'
    check (status in ('Searching for Donors', 'Donor Response Received', 'Connected to Hospital', 'Fulfilled', 'Cancelled', 'Expired')),
  contact_person text not null,
  contact_phone text not null,
  notes text,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. GOVERNMENT HOSPITALS & PUBLIC HEALTHCARE DIRECTORY
create table if not exists public.hospitals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in (
    'Government Medical College',
    'District Government Hospital',
    'Taluk Hospital',
    'Community Health Centre (CHC)',
    'Primary Health Centre (PHC)',
    'Government General Hospital',
    'Government Blood Bank',
    'Authorised Blood Storage Centre'
  )),
  state text not null,
  district text not null,
  city_or_village text not null,
  address text not null,
  pin_code text not null check (pin_code ~ '^[0-9]{6}$'),
  contact_number text not null,
  website text,
  has_blood_bank boolean not null default false,
  blood_bank_verified boolean not null default false,
  blood_storage_available boolean not null default false,
  verification_date text not null,
  data_source text not null default 'National Health Portal / MoHFW',
  latitude numeric(9,6),
  longitude numeric(9,6),
  created_at timestamptz not null default now()
);

-- 5. AUTHORISED BLOOD BANKS
create table if not exists public.blood_banks (
  id uuid primary key default gen_random_uuid(),
  facility_name text not null,
  category text not null check (category in ('Government', 'Red Cross', 'Charitable Trust', 'Hospital-Attached')),
  state text not null,
  district text not null,
  city text not null,
  address text not null,
  pin_code text not null check (pin_code ~ '^[0-9]{6}$'),
  phone text not null,
  verification_status text not null default 'verified' check (verification_status in ('verified','pending')),
  operates_24x7 boolean not null default false,
  last_verified text not null,
  latitude numeric(9,6),
  longitude numeric(9,6),
  created_at timestamptz not null default now()
);

-- 6. VOLUNTARY DONATION CAMPS
create table if not exists public.donation_camps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organizer text not null,
  state text not null,
  district text not null,
  location_venue text not null,
  date text not null,
  timing text not null,
  contact_number text not null,
  status text not null default 'Upcoming' check (status in ('Upcoming', 'Verified', 'Completed', 'Cancelled')),
  expected_donors integer default 100,
  submitted_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

-- 7. ABUSE & SPAM REPORTS
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('donor', 'request', 'hospital', 'announcement')),
  target_id text not null,
  reason text not null,
  reported_by uuid references auth.users(id),
  status text not null default 'pending_review' check (status in ('pending_review', 'resolved', 'dismissed')),
  created_at timestamptz not null default now()
);

-- 8. SECURITY AUDIT LOGS
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  actor text not null,
  target text,
  details text,
  timestamp timestamptz not null default now()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
alter table public.user_profiles enable row level security;
alter table public.donor_profiles enable row level security;
alter table public.blood_requests enable row level security;
alter table public.hospitals enable row level security;
alter table public.blood_banks enable row level security;
alter table public.donation_camps enable row level security;
alter table public.reports enable row level security;
alter table public.audit_logs enable row level security;

-- user_profiles policies
create policy "user_profiles_select_own" on public.user_profiles
  for select to authenticated using (auth.uid() = id);
create policy "user_profiles_insert_own" on public.user_profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "user_profiles_update_own" on public.user_profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- donor_profiles policies
create policy "donors_manage_own" on public.donor_profiles
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "donors_public_safe_view" on public.donor_profiles
  for select to anon, authenticated using (available = true);

-- blood_requests policies
create policy "requests_read_all" on public.blood_requests
  for select to anon, authenticated using (true);
create policy "requests_insert_auth" on public.blood_requests
  for insert to authenticated with check (auth.uid() = created_by);
create policy "requests_update_own" on public.blood_requests
  for update to authenticated using (auth.uid() = created_by) with check (auth.uid() = created_by);

-- hospitals & blood_banks policies
create policy "hospitals_read_public" on public.hospitals
  for select to anon, authenticated using (true);
create policy "banks_read_public" on public.blood_banks
  for select to anon, authenticated using (true);

-- donation_camps policies
create policy "camps_read_public" on public.donation_camps
  for select to anon, authenticated using (true);
create policy "camps_insert_auth" on public.donation_camps
  for insert to authenticated with check (auth.uid() = submitted_by);

-- reports policies
create policy "reports_insert_auth" on public.reports
  for insert to authenticated with check (true);

-- audit_logs policies
create policy "audit_insert_system" on public.audit_logs
  for insert to authenticated with check (true);
