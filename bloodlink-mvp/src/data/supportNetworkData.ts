import type { DonationCamp, EmergencyRequest } from "../types";

export const initialCamps: DonationCamp[] = [
  {
    id: "camp-01",
    title: "National Voluntary Blood Donation Day Camp",
    organizer: "Indian Red Cross Society & Victoria Hospital",
    state: "Karnataka",
    district: "Bengaluru Urban",
    location_venue: "Freedom Park Auditorium, Sheshadri Road, Bengaluru",
    date: "25 Nov 2026",
    timing: "09:00 AM – 03:30 PM",
    contact_number: "+91 80 2226 8435",
    status: "Upcoming",
    expected_donors: 150
  },
  {
    id: "camp-02",
    title: "Rural Health & Voluntary Blood Camp",
    organizer: "District Health Society & Rotary Mysore",
    state: "Karnataka",
    district: "Mysuru",
    location_venue: "Taluk Community Hall, Hunsur, Mysuru",
    date: "02 Dec 2026",
    timing: "09:30 AM – 02:00 PM",
    contact_number: "+91 821 242 1212",
    status: "Upcoming",
    expected_donors: 80
  },
  {
    id: "camp-03",
    title: "Youth Community Blood Donation Drive",
    organizer: "Madras Medical College Blood Bank & NSS",
    state: "Tamil Nadu",
    district: "Chennai",
    location_venue: "Marina Beach Community Pavilion, Chennai",
    date: "05 Dec 2026",
    timing: "08:30 AM – 01:30 PM",
    contact_number: "+91 44 2530 5000",
    status: "Upcoming",
    expected_donors: 120
  },
  {
    id: "camp-04",
    title: "Highland Community Lifeline Blood Camp",
    organizer: "Kerala State AIDS Control Society & DMO Wayanad",
    state: "Kerala",
    district: "Wayanad",
    location_venue: "Town Hall, Sulthan Bathery, Wayanad",
    date: "10 Dec 2026",
    timing: "09:00 AM – 02:30 PM",
    contact_number: "+91 4936 282 250",
    status: "Upcoming",
    expected_donors: 65
  }
];

export const initialEmergencyRequests: EmergencyRequest[] = [
  {
    id: "req-1",
    reference_id: "REQ-2026-0812",
    patient_name_or_ref: "Patient Case #812 (Dialysis Care)",
    blood_group: "O+",
    units: 2,
    hospital_name: "Bangalore Medical College (Victoria Hospital)",
    state: "Karnataka",
    district: "Bengaluru Urban",
    city: "Bengaluru",
    needed_by: "Today within 4 hours",
    urgency: "Critical",
    status: "Searching for Donors",
    contact_person: "Duty Coordinator / Patient Attendant",
    contact_phone: "+91 80 2670 1150 (Ext 24)",
    created_at: "13 Nov 2026, 02:15 PM",
    is_demo: true,
    notes: "Requires urgent replacement units for scheduled surgery."
  },
  {
    id: "req-2",
    reference_id: "REQ-2026-0815",
    patient_name_or_ref: "Patient Attendant Case #815",
    blood_group: "B-",
    units: 1,
    hospital_name: "K.R. Hospital, Mysuru",
    state: "Karnataka",
    district: "Mysuru",
    city: "Mysuru",
    needed_by: "Tomorrow morning 09:00 AM",
    urgency: "High",
    status: "Donor Response Received",
    contact_person: "Hospital Social Work Cell",
    contact_phone: "+91 821 242 1212",
    created_at: "13 Nov 2026, 11:30 AM",
    is_demo: true,
    notes: "Rare blood group requirement for post-operative recovery."
  },
  {
    id: "req-3",
    reference_id: "REQ-2026-0819",
    patient_name_or_ref: "Patient Case #819 (Thalassemia Ward)",
    blood_group: "A+",
    units: 3,
    hospital_name: "Rajiv Gandhi Govt General Hospital",
    state: "Tamil Nadu",
    district: "Chennai",
    city: "Chennai",
    needed_by: "16 Nov 2026",
    urgency: "Normal",
    status: "Connected to Hospital",
    contact_person: "Blood Bank Liaison Officer",
    contact_phone: "+91 44 2530 5000",
    created_at: "12 Nov 2026, 04:00 PM",
    is_demo: true,
    notes: "Regular scheduled transfusion support."
  }
];

export const voluntaryOrganisations = [
  {
    name: "Indian Red Cross Society (National Headquarters)",
    category: "Statutory Humanitarian Organization",
    coverage: "All-India (State & District Branches)",
    website: "https://indianredcross.org",
    phone: "011-23716441 / 42",
    focus: "Blood donor recruitment, blood bank operations, and disaster relief"
  },
  {
    name: "Sankalp India Foundation",
    category: "Voluntary Youth Organization",
    coverage: "Karnataka & Pan-India Emergency Helpline",
    website: "https://www.sankalpindia.net",
    phone: "+91 94800 44444 (Emergency Blood Line)",
    focus: "Thalassemia care, 24x7 emergency blood dispatch, voluntary donor drives"
  },
  {
    name: "Friends2Support",
    category: "Voluntary Donor Network",
    coverage: "Pan-India Rural & Urban Communities",
    website: "https://www.friends2support.org",
    phone: "Regional volunteer contacts via portal",
    focus: "Community-driven voluntary donor listings and rural emergency assistance"
  },
  {
    name: "Rotary Blood Bank Network",
    category: "Non-Profit Healthcare Initiative",
    coverage: "Major Towns & Regional Blood Centres",
    website: "https://rotary.org",
    phone: "Contact respective district Rotary Bhavan",
    focus: "Component separation blood centres, mobile donor vans, rural awareness"
  }
];

export const officialHelplines = [
  {
    number: "104",
    title: "National Health Information Helpline",
    desc: "Free 24x7 state health advice, nearby government facility details, and blood bank inquiries.",
    available_in: "English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Bengali & regional languages."
  },
  {
    number: "108",
    title: "Emergency Medical & Ambulance Service",
    desc: "Toll-free emergency dispatch for accidents, trauma, critical care transfers to nearest district hospitals.",
    available_in: "Pan-India 24x7 across all states and union territories."
  },
  {
    number: "1910",
    title: "National AIDS & Voluntary Blood Helpline (NACO)",
    desc: "Official national helpline for blood donation awareness, voluntary testing, and donor criteria.",
    available_in: "Toll-free across India."
  },
  {
    number: "e-RaktKosh Portal",
    title: "Ministry of Health & Family Welfare (MoHFW)",
    desc: "Government portal for authorized blood centre directory, licensing, and national blood statistics.",
    website: "https://eraktkosh.mohfw.gov.in"
  }
];

export const bloodDonationEligibilityFAQs = [
  {
    question: "Who is eligible to donate blood in India?",
    answer: "Healthy adults aged 18 to 65 years with a minimum body weight of 45 kg, normal pulse and blood pressure, and a haemoglobin level of at least 12.5 g/dL as verified by qualified medical staff at the donation site."
  },
  {
    question: "What is the recommended interval between donations?",
    answer: "Under National Blood Transfusion Council (NBTC) guidelines, male donors may donate whole blood every 3 months (90 days), and female donors may donate whole blood every 4 months (120 days)."
  },
  {
    question: "Can blood donation cause weakness or disease transmission?",
    answer: "No. Blood donation is conducted using single-use, sterile, disposable needle kits that are unwrapped in front of you. Your body naturally replenishes the donated fluid volume within 24 to 48 hours, and red blood cells within 4 to 8 weeks."
  },
  {
    question: "What precautions should a donor take before and after donating?",
    answer: "Drink plenty of water/fluids, have a light meal within 3–4 hours prior to donation (avoid donating on an empty stomach), avoid heavy lifting or vigorous exercise immediately following donation, and rest for 10–15 minutes while enjoying refreshments provided by the centre."
  }
];
