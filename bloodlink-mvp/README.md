# BloodLink — Expanding Blood Donation Accessibility Across India

**Every Drop Connects a Life · ಪ್ರತಿಯೊಂದು ಹನಿಯೂ ಜೀವ ಬೆಸೆಯುತ್ತದೆ · हर बूंद जोड़ती है एक ज़िंदगी**

A responsive, lightweight, accessible digital healthcare platform designed to connect voluntary blood donors, patients, ordinary citizens, government hospitals, and authorised blood banks across India.

Specialized in expanding reach to **rural areas, remote villages, small towns, taluks, and underserved districts** across all 31+ Indian States and Union Territories.

---

## Table of Contents

1. [Key Features & Implemented Capabilities](#key-features--implemented-capabilities)
2. [Indian Geography & Coverage Details](#indian-geography--coverage-details)
3. [Architecture & Technology Stack](#architecture--technology-stack)
4. [Accessibility & Common Citizen UI](#accessibility--common-citizen-ui)
5. [Security, Privacy & Healthcare Safety](#security-privacy--healthcare-safety)
6. [Local Development & Installation](#local-development--installation)
7. [Database Setup & Supabase Migrations](#database-setup--supabase-migrations)
8. [Testing & Quality Assurance Report](#testing--quality-assurance-report)
9. [Deployment Instructions](#deployment-instructions)
10. [Known Limitations & Future Roadmap](#known-limitations--future-roadmap)

---

## Key Features & Implemented Capabilities

### 1. "Find Donors Beyond Cities" (Rural & Village Access)
- **Location Selector (No GPS Required):** Cascading State $\to$ District selection with manual entry for town, village, or ward name and 6-digit postal PIN code.
- **Neighbouring Districts Expansion:** Automatic expansion to neighbouring districts when local donors are unavailable.
- **Approximate Distance Indicator:** Calculated using the Haversine formula based on district centroid coordinates (e.g. `Approx. ~14 km away`).
- **Privacy-Safe Donor Cards:** Displays privacy-safe identifiers (e.g., `Ramesh K.`, `Diya R.`), blood group chip, district/state, availability indicator, last donation date, and preferred communication channel (`In-app Request`, `WhatsApp Consent`, `Volunteer Assisted`). Real phone numbers and precise coordinates are never revealed publicly.

### 2. Common People Accessibility — 6 Primary Action Tiles
Designed for first-time smartphone users and people with limited technical literacy:
1. **FIND BLOOD** — Quick access to rural & urban donor search.
2. **REGISTER AS A DONOR** — Simple enrolment with informed consent and privacy notices.
3. **REQUEST BLOOD** — Publish patient requirements for hospital cases.
4. **FIND GOVERNMENT HOSPITALS** — Medical Colleges, District Hospitals, Taluks, CHCs & PHCs.
5. **FIND BLOOD BANKS** — Licensed 24/7 blood centres with contact numbers.
6. **EMERGENCY BLOOD REQUEST** — High-priority life-saving requests.

### 3. Multilingual Support (8 Indian Languages)
Native language switch with full support for:
- **English** (en)
- **Kannada** (kn) — ಕನ್ನಡ
- **Hindi** (hi) — हिंदी
- **Tamil** (ta) — தமிழ்
- **Telugu** (te) — తెలుగు
- **Malayalam** (ml) — മലയാളം
- **Marathi** (mr) — मराठी
- **Bengali** (bn) — বাংলা

### 4. Government Hospital & Public Healthcare Directory
- **Classifications:** Government Medical Colleges, District Government Hospitals, Taluk Hospitals, Community Health Centres (CHCs), Primary Health Centres (PHCs), Government Blood Banks, and Blood Storage Units.
- **Verified Details:** Full address, PIN code, verified telephone number with mobile `tel:` one-click call button, official website, attached blood bank status, verification date, and data attribution (National Health Portal / MoHFW).

### 5. Interactive Geographic Explorer Map
- **Leaflet & OpenStreetMap:** Visualizes public hospitals (red markers), licensed blood banks (ruby droplet markers), and privacy-safe approximate donor clusters across India.
- **Low-Bandwidth List Fallback:** Instant one-click toggle to a lightweight text-and-card list view designed for low-bandwidth 2G/3G connections.

### 6. Emergency Blood Request System
- **Tracking:** Unique reference ID (e.g., `REQ-2026-0812`), patient case, blood group, units, hospital, district, required timeline, and priority status (`Critical`, `High`, `Normal`).
- **Workflow Lifecycle:** `Searching for Donors` $\to$ `Donor Response Received` $\to$ `Connected to Hospital` $\to$ `Fulfilled` / `Cancelled`.

### 7. Community Blood Support Network
- **Voluntary Blood Donation Camps:** Upcoming public camps with date, venue, organizer, timing, and coordinator contacts.
- **NGO & Humanitarian Directory:** Indian Red Cross Society, Sankalp India Foundation, Friends2Support, Rotary Blood Banks.
- **Official 24/7 National Helplines:** 104 (Health Information), 108 (Emergency Ambulance), 1910 (National Blood & AIDS Helpline), e-RaktKosh portal.
- **Clinical Eligibility FAQs:** NBTC medical criteria (age 18–65, weight >45kg, Hb >12.5 g/dL, donation intervals, myths vs. facts).

### 8. Administrator & Operations Governance Hub
- **Role-Based Access Control (RBAC):** Switchable roles: `Public User`, `Donor`, `Hospital Representative`, `Blood Bank Representative`, `Administrator`.
- **Live Governance Metrics:** Total donors, active vs. inactive, pending emergency requests, fulfilled requests, listed facilities, blood group distribution.
- **Management Workflows:** Donor verification, availability toggle, emergency request status updates, camp announcement approval/rejection, abuse moderation, and security audit logging.

---

## Indian Geography & Coverage Details

BloodLink covers 31+ States and Union Territories across India:
- **South:** Karnataka (Bengaluru, Mysuru, Hubballi, Kalaburagi, Chikkamagaluru, Kadur), Tamil Nadu (Chennai, Coimbatore, Madurai, Thoothukudi, Kovilpatti), Kerala (Kochi, Thiruvananthapuram, Wayanad, Malappuram, Tirur), Andhra Pradesh (Visakhapatnam, Tirupati, Guntur), Telangana (Hyderabad, Warangal).
- **West:** Maharashtra (Mumbai, Pune, Nagpur, Baramati), Goa (North & South Goa), Gujarat (Ahmedabad, Kutch).
- **North:** Delhi (Central, South, North), Rajasthan (Jaipur, Jodhpur, Jhunjhunu, Mandawa), Punjab (Amritsar, Ludhiana), Haryana (Gurugram), Himachal Pradesh (Kangra, Shimla), Uttarakhand (Dehradun, Rishikesh), Jammu & Kashmir (Srinagar, Jammu), Ladakh (Leh, Kargil).
- **Central & East:** Uttar Pradesh (Lucknow, Varanasi, Gorakhpur, Malihabad), Bihar (Patna, Gaya, Muzaffarpur, Bodh Gaya), Jharkhand (Ranchi, Jamshedpur), West Bengal (Kolkata, Darjeeling/Siliguri), Odisha (Bhubaneswar, Cuttack, Koraput), Chhattisgarh (Raipur, Bastar/Jagdalpur), Madhya Pradesh (Bhopal, Indore).
- **Northeast:** Assam (Guwahati, Dibrugarh, Jorhat, Majuli), Meghalaya (Shillong, Sohra), Manipur (Imphal, Churachandpur), Mizoram (Aizawl), Nagaland (Kohima), Tripura (Agartala), Arunachal Pradesh (Itanagar), Sikkim (Gangtok).

---

## Architecture & Technology Stack

- **Frontend Framework:** React 18 with TypeScript 5.7
- **Build Tool:** Vite 6
- **Styling:** Modular CSS with custom CSS variables, accessible color contrasts, and responsive grid layouts (320px–1200px+)
- **Mapping:** Leaflet with OpenStreetMap tiles (graceful fallback to text list view)
- **Icons:** Lucide React
- **Backend / Database (Optional/Integrated):** Supabase (PostgreSQL, Row Level Security, Supabase Auth)
- **Offline / Demo Resilience:** Client-side LocalStorage cache ensuring new registrations, requests, camp approvals, and status toggles persist without an API key.

---

## Security, Privacy & Healthcare Safety

1. **Data Minimisation & Privacy:**
   - Raw phone numbers and residential addresses are **never** displayed publicly.
   - Contact requests are mediated through in-app notifications, WhatsApp consent flows, or verified volunteer assistance.
2. **Clinical Safety Disclaimers:**
   - BloodLink is a voluntary connectivity directory and does **not** provide medical diagnosis or guarantee blood availability.
   - All donor eligibility screening, cross-matching, testing (HIV, Hepatitis B/C, Syphilis, Malaria), component separation, and transfusions must take place at licensed medical facilities.
3. **Drugs & Cosmetics Act Compliance:**
   - BloodLink strictly prohibits any monetary compensation or sale of blood under Section 18 of the Drugs and Cosmetics Act.

---

## Local Development & Installation

### Prerequisites
- Node.js 20 or newer
- npm

### Steps

```bash
# 1. Clone repository and navigate to project folder
cd bloodlink-mvp/bloodlink-mvp

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:5173/
```

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## Database Setup & Supabase Migrations

BloodLink is designed to operate seamlessly in **Demo Mode** without any keys, but can be connected to a production Supabase instance in minutes:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Run the complete schema script:
   [`supabase/schema.sql`](file:///c:/Users/KUNAAL/Downloads/bloodlink-mvp/bloodlink-mvp/supabase/schema.sql)  
   *(or the migration script in `supabase/migrations/20261113_bloodlink_expanded_schema.sql`)*.
4. Copy your project URL and public Anon/Publishable Key from **Project Settings > API**.
5. Create `.env.local` based on `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-publishable-key
   ```
6. Restart the development server. The bottom-right mode indicator will display: **"Supabase Connected · Live Cloud Mode"**.

---

## Testing & Quality Assurance Report

| Test Area | Target Functionality | Result |
| :--- | :--- | :--- |
| **Donor Registration** | Enrolment form, consent checkbox, 6-digit PIN check, age 18–65 check | **PASS** |
| **Search Beyond Cities** | State $\to$ District cascade, village keyword, PIN filter, distance display | **PASS** |
| **Hospital Directory** | State filter, category filter, blood bank indicator, mobile call button | **PASS** |
| **Emergency Requests** | Form submission, reference ID generation, priority badge, status update | **PASS** |
| **Interactive Map** | Leaflet rendering, custom hospital/bank/donor markers, list-view fallback | **PASS** |
| **Multilingual UI** | 8 languages (EN, KN, HI, TA, TE, ML, MR, BN) dynamic text translation | **PASS** |
| **Admin Hub** | Role gating, metrics calculations, status updates, camp approvals, audit logs | **PASS** |
| **TypeScript / Build** | `tsc -b && vite build` zero errors, production bundle generated | **PASS** |
| **Mobile Responsiveness** | Touch targets $\ge$ 44px, single-column flex/grid layouts on $\le$ 620px | **PASS** |

---

## Deployment Instructions

### Deploy to Vercel
1. Push the code to a GitHub repository.
2. In Vercel, import the repository.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. (Optional) Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables.
5. Deploy. The included `vercel.json` ensures client-side routing is handled properly.

---

## Known Limitations & Future Roadmap

- **External SMS Gateway:** In-app notification triggers are currently simulated in demo mode; future phases can integrate an SMS gateway (e.g. CDAC SMS Portal or Twilio) for feature-phone alerts in rural areas without data connectivity.
- **Real-Time Blood Stock API:** Currently, blood bank presence and contact details are verified; direct live unit inventory requires integration with authorized state e-RaktKosh APIs once public programmatic access keys are officially sanctioned.
- **Offline PWA Worker:** The project includes caching and local storage; full service-worker offline caching for zero-network conditions is scheduled for future release.
