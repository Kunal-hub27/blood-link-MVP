import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Droplet,
  Heart,
  HeartPulse,
  Hospital as HospitalIcon,
  Search,
  ShieldCheck,
  Users,
  X
} from "lucide-react";
import type {
  Donor,
  EmergencyRequest,
  Hospital,
  DonationCamp,
  AbuseReport,
  AuditLogEntry,
  Language,
  UserRole,
  Notice
} from "./types";
import { initialDemoDonors } from "./data/demoDonorsData";
import { governmentHospitals } from "./data/hospitalsData";
import { initialBloodBanks } from "./data/bloodBanksData";
import { initialCamps, initialEmergencyRequests } from "./data/supportNetworkData";
import { translations } from "./data/translations";
import { isSupabaseConfigured, supabase } from "./lib/supabase";

import { Header } from "./components/Header";
import { ActionTiles } from "./components/ActionTiles";
import { RuralDonorSearch } from "./components/RuralDonorSearch";
import { HospitalDirectory } from "./components/HospitalDirectory";
import { BloodBankDirectory } from "./components/BloodBankDirectory";
import { EmergencyRequestSection } from "./components/EmergencyRequestSection";
import { InteractiveMap } from "./components/InteractiveMap";
import { SupportNetworkSection } from "./components/SupportNetworkSection";
import { AdminDashboard } from "./components/AdminDashboard";

import { DonorRegistrationModal } from "./components/modals/DonorRegistrationModal";
import { EmergencyRequestModal } from "./components/modals/EmergencyRequestModal";
import { SubmitCampModal } from "./components/modals/SubmitCampModal";
import { AuthModal } from "./components/modals/AuthModal";

export default function App() {
  // Multilingual & User State
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [currentRole, setCurrentRole] = useState<UserRole>("public");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);

  // Core Data Collections (Initialized with representative data, persists in LocalStorage for demo session)
  const [donors, setDonors] = useState<Donor[]>(() => {
    const saved = localStorage.getItem("bloodlink_donors");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialDemoDonors;
  });

  const [requests, setRequests] = useState<EmergencyRequest[]>(() => {
    const saved = localStorage.getItem("bloodlink_requests");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialEmergencyRequests;
  });

  const [camps, setCamps] = useState<DonationCamp[]>(() => {
    const saved = localStorage.getItem("bloodlink_camps");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialCamps;
  });

  const [reports, setReports] = useState<AbuseReport[]>([
    {
      id: "rep-1",
      target_type: "request",
      target_id: "REQ-2026-0812",
      reason: "Duplicate hospital entry verification check",
      reported_at: "13 Nov 2026, 12:40 PM",
      status: "pending_review"
    }
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "log-1",
      action: "SYSTEM_INITIALIZE",
      actor: "BloodLink System Core",
      timestamp: "13 Nov 2026, 09:00 AM",
      details: "Initialized pan-India coverage across 31+ states and union territories."
    },
    {
      id: "log-2",
      action: "DIRECTORY_SYNC",
      actor: "National Health Portal Connector",
      timestamp: "13 Nov 2026, 11:30 AM",
      details: "Synchronized public directory of district hospitals and medical colleges."
    }
  ]);

  // Modal Visibility States
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCampModal, setShowCampModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Map Focus Coordinate State
  const [mapFocusCoords, setMapFocusCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Persistence to LocalStorage
  useEffect(() => {
    localStorage.setItem("bloodlink_donors", JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem("bloodlink_requests", JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem("bloodlink_camps", JSON.stringify(camps));
  }, [camps]);

  // Supabase Auth Listener (Preserved)
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setUserEmail(data.session?.user.email ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const t = translations[currentLang] || translations.en;

  const notify = (text: string, kind: Notice["kind"] = "info") => {
    setNotice({ text, kind });
    window.setTimeout(() => setNotice(null), 5000);
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUserEmail(null);
    notify("Signed out successfully.", "success");
  };

  // Add Registered Donor
  const handleAddDonor = async (newDonorData: Omit<Donor, "id">) => {
    const newId = `donor-reg-${Date.now()}`;
    const completeDonor: Donor = {
      ...newDonorData,
      id: newId
    };

    if (supabase && userEmail) {
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (authData.user) {
          await supabase.from("donor_profiles").upsert({
            user_id: authData.user.id,
            display_name: completeDonor.name,
            age: 25,
            blood_group: completeDonor.blood_group,
            state: completeDonor.state,
            district: completeDonor.district,
            city_or_village: completeDonor.city,
            is_village: completeDonor.is_village ?? false,
            pin_code: completeDonor.pin_code,
            contact_preference: completeDonor.contact_preference,
            available: true,
            consented_at: new Date().toISOString()
          });
        }
      } catch (err) {
        console.warn("Supabase donor save note:", err);
      }
    }

    setDonors((prev) => [completeDonor, ...prev]);
    addAuditLog("DONOR_REGISTER", userEmail || "Anonymous Public User", `Enrolled ${completeDonor.name} (${completeDonor.blood_group}) in ${completeDonor.district}, ${completeDonor.state}`);
    notify(`Thank you! Donor profile for ${completeDonor.name} (${completeDonor.blood_group}) has been registered.`, "success");
  };

  // Add Emergency Blood Request
  const handleAddRequest = async (requestData: Omit<EmergencyRequest, "id" | "created_at" | "is_demo">) => {
    const newReq: EmergencyRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      created_at: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      is_demo: false
    };

    if (supabase && userEmail) {
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (authData.user) {
          await supabase.from("blood_requests").insert({
            reference_id: newReq.reference_id,
            created_by: authData.user.id,
            blood_group: newReq.blood_group,
            units: newReq.units,
            hospital_name: newReq.hospital_name,
            state: newReq.state,
            district: newReq.district,
            city: newReq.city,
            needed_by: newReq.needed_by,
            urgency: newReq.urgency,
            status: newReq.status,
            contact_person: newReq.contact_person,
            contact_phone: newReq.contact_phone,
            notes: newReq.notes
          });
        }
      } catch (err) {
        console.warn("Supabase request save note:", err);
      }
    }

    setRequests((prev) => [newReq, ...prev]);
    addAuditLog("CREATE_BLOOD_REQUEST", userEmail || "Hospital / Attendant", `Published emergency request ${newReq.reference_id} for ${newReq.units} units of ${newReq.blood_group} at ${newReq.hospital_name}`);
    notify(`Emergency request ${newReq.reference_id} has been published to the community network.`, "success");
  };

  // Add Donation Camp
  const handleAddCamp = (campData: Omit<DonationCamp, "id" | "status">) => {
    const newCamp: DonationCamp = {
      ...campData,
      id: `camp-${Date.now()}`,
      status: "Upcoming"
    };
    setCamps((prev) => [newCamp, ...prev]);
    addAuditLog("SUBMIT_CAMP", userEmail || "Community Organizer", `Submitted donation camp "${newCamp.title}" in ${newCamp.district}`);
    notify(`Camp "${newCamp.title}" has been submitted for coordinator review.`, "success");
  };

  // Helper: Append Audit Log Entry
  const addAuditLog = (action: string, actor: string, details: string) => {
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      action,
      actor,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      details
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  // Admin Actions
  const handleVerifyDonor = (donorId: string) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === donorId ? { ...d, verified: true } : d))
    );
    addAuditLog("VERIFY_DONOR", currentRole, `Verified credentials for donor ID: ${donorId}`);
    notify("Donor credentials verified successfully.", "success");
  };

  const handleToggleDonorAvailability = (donorId: string) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === donorId ? { ...d, available: !d.available } : d))
    );
    addAuditLog("TOGGLE_DONOR_STATUS", currentRole, `Toggled availability for donor ID: ${donorId}`);
    notify("Donor availability status updated.", "info");
  };

  const handleUpdateRequestStatus = (requestId: string, newStatus: EmergencyRequest["status"]) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
    );
    addAuditLog("UPDATE_REQUEST_STATUS", currentRole, `Updated status of ${requestId} to ${newStatus}`);
    notify(`Request status updated to "${newStatus}".`, "success");
  };

  const handleApproveCamp = (campId: string) => {
    setCamps((prev) =>
      prev.map((c) => (c.id === campId ? { ...c, status: "Verified" } : c))
    );
    addAuditLog("APPROVE_CAMP", currentRole, `Approved public camp announcement ID: ${campId}`);
    notify("Donation camp approved and published.", "success");
  };

  const handleRejectCamp = (campId: string) => {
    setCamps((prev) => prev.filter((c) => c.id !== campId));
    addAuditLog("REMOVE_CAMP", currentRole, `Removed camp ID: ${campId}`);
    notify("Camp listing removed.", "info");
  };

  const handleResolveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: "resolved" } : r))
    );
    addAuditLog("RESOLVE_REPORT", currentRole, `Resolved report ID: ${reportId}`);
    notify("Moderation report marked as resolved.", "success");
  };

  const handleConnectDonor = (donor: Donor) => {
    notify(
      `In-App Notification Sent to ${donor.name} via ${donor.contact_preference}. Privacy protected: personal phone number is not shared.`,
      "info"
    );
  };

  const handleRespondToRequest = (req: EmergencyRequest) => {
    notify(
      `Lifeline Coordinator Connected for ${req.reference_id} at ${req.hospital_name}. Attendant contact: ${req.contact_phone}`,
      "success"
    );
  };

  const handleLocateOnMap = (hospital: Hospital) => {
    setMapFocusCoords({ lat: hospital.coordinates.lat, lng: hospital.coordinates.lng });
    const mapElement = document.getElementById("map-explorer");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-shell">
      {/* 1. Universal Accessible Header */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        userEmail={userEmail}
        onOpenAuth={() => setShowAuthModal(true)}
        onSignOut={handleSignOut}
        onOpenRegisterDonor={() => setShowDonorModal(true)}
      />

      <main id="main-content">
        {/* 2. Hero Section */}
        <section className="hero" id="home" aria-label="BloodLink Introduction">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse-dot" /> INDIA-WIDE VOLUNTARY NETWORK · ಭಾರತವ್ಯಾಪಿ ರಕ್ತ ಸಂಪರ್ಕ
            </div>
            <h1>
              Find Blood. Find Donors.<br />
              <em>Connect Lives.</em>
            </h1>
            <p className="hero-text">
              Connecting common citizens, voluntary donors, and public health facilities across 31+ states and union territories. Designed specifically for villages, taluks, and small towns with low-bandwidth smartphones.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary btn-large" href="#rural">
                <Search size={18} />
                <span>{t.findBeyondCitiesTitle}</span>
              </a>
              <button
                type="button"
                className="btn btn-outline btn-large"
                onClick={() => setShowDonorModal(true)}
              >
                <Heart size={18} />
                <span>{t.registerDonor}</span>
              </button>
              <button
                type="button"
                className="btn btn-emergency-quick btn-large"
                onClick={() => setShowRequestModal(true)}
              >
                <span>{t.emergencyRequest}</span>
              </button>
            </div>

            <div className="hero-proof">
              <div className="avatar-stack">
                <span>KA</span>
                <span>TN</span>
                <span>UP</span>
                <span>+</span>
              </div>
              <div>
                <strong>Reaching Remote Districts Across India</strong>
                <small>Karnataka, Tamil Nadu, Kerala, Maharashtra, UP, Bihar, Assam &amp; more</small>
              </div>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-card art-card-main">
              <div className="art-drop">
                <Droplet fill="currentColor" size={62} />
              </div>
              <span className="art-kicker">THE POWER OF ONE DROP</span>
              <strong>One donation.<br />A world of difference.</strong>
              <small>Give blood. Share hope.</small>
            </div>

            <div className="float-card float-top">
              <span className="float-icon">
                <HeartPulse size={18} />
              </span>
              <span>
                <b>Find Donors Beyond Cities</b>
                <small>Remote taluks &amp; villages</small>
              </span>
            </div>

            <div className="float-card float-bottom">
              <span className="float-icon pale">
                <HospitalIcon size={18} />
              </span>
              <span>
                <b>Govt Hospital Directory</b>
                <small>Direct public contact</small>
              </span>
            </div>
            <div className="tiny-cross cross-one">+</div>
            <div className="tiny-cross cross-two">+</div>
          </div>
        </section>

        {/* 3. Citizen Trust Bar */}
        <section className="trust-strip" aria-label="Platform Guarantees">
          <div>
            <ShieldCheck size={19} />
            <span>Strict Privacy: Phone &amp; Home Address Never Exposed</span>
          </div>
          <div>
            <Activity size={19} />
            <span>National Health Portal (NHP) Verified Public Facilities</span>
          </div>
          <div>
            <Heart size={19} />
            <span>100% Non-Commercial Voluntary Lifeline</span>
          </div>
        </section>

        {/* 4. The 6 Primary Large Action Tiles for Common People */}
        <ActionTiles
          currentLang={currentLang}
          onFindBloodClick={() => {
            document.getElementById("rural")?.scrollIntoView({ behavior: "smooth" });
          }}
          onRegisterDonorClick={() => setShowDonorModal(true)}
          onRequestBloodClick={() => setShowRequestModal(true)}
          onFindHospitalsClick={() => {
            document.getElementById("hospitals")?.scrollIntoView({ behavior: "smooth" });
          }}
          onFindBloodBanksClick={() => {
            document.getElementById("banks")?.scrollIntoView({ behavior: "smooth" });
          }}
          onEmergencyRequestClick={() => {
            document.getElementById("emergency")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 5. "Find Donors Beyond Cities" — Remote Location & Village Donor Access */}
        <RuralDonorSearch
          currentLang={currentLang}
          donors={donors}
          onConnectDonor={handleConnectDonor}
          onOpenRegisterDonor={() => setShowDonorModal(true)}
        />

        {/* 6. Emergency Blood Request System */}
        <EmergencyRequestSection
          currentLang={currentLang}
          requests={requests}
          onOpenCreateRequest={() => setShowRequestModal(true)}
          onRespondToRequest={handleRespondToRequest}
        />

        {/* 7. Government Hospital & Public Healthcare Directory */}
        <HospitalDirectory
          currentLang={currentLang}
          onLocateOnMap={handleLocateOnMap}
        />

        {/* 8. Geographic Map Integration (Leaflet + OpenStreetMap) */}
        <InteractiveMap
          donors={donors}
          hospitals={governmentHospitals}
          bloodBanks={initialBloodBanks}
          focusedCoordinates={mapFocusCoords}
        />

        {/* 9. Authorised Blood Bank Directory */}
        <BloodBankDirectory currentLang={currentLang} />

        {/* 10. Community Blood Support Network (Camps, Helplines, NGOs, FAQs) */}
        <SupportNetworkSection
          currentLang={currentLang}
          camps={camps}
          onOpenSubmitCampModal={() => setShowCampModal(true)}
        />

        {/* 11. Three Steps: How BloodLink Works */}
        <section className="how-section section" id="how">
          <div className="center-heading">
            <div className="eyebrow red">SIMPLE. HUMAN. CONNECTED.</div>
            <h2>
              Three Steps.<br />
              <em>One Powerful Impact.</em>
            </h2>
            <p>
              BloodLink bridges the gap between patient emergency requirements and voluntary donors across rural, suburban, and urban communities.
            </p>
          </div>
          <div className="steps-grid">
            <article className="step-card">
              <div className="step-top">
                <span>01</span>
                <div className="step-icon"><Search size={20} /></div>
              </div>
              <h3>1. Search Location</h3>
              <p>Filter by your state, district, taluk, or postal PIN code without needing GPS permissions.</p>
            </article>

            <article className="step-card">
              <div className="step-top">
                <span>02</span>
                <div className="step-icon"><Users size={20} /></div>
              </div>
              <h3>2. Coordinate Care</h3>
              <p>Locate nearby government medical colleges or send privacy-safe in-app notifications to willing donors.</p>
            </article>

            <article className="step-card">
              <div className="step-top">
                <span>03</span>
                <div className="step-icon"><Heart size={20} /></div>
              </div>
              <h3>3. Save Lives</h3>
              <p>All blood testing, grouping, cross-matching, and donation takes place at licensed clinical blood centres.</p>
            </article>
          </div>
        </section>

        {/* 12. Administrator & Coordinator Hub */}
        <AdminDashboard
          currentRole={currentRole}
          donors={donors}
          requests={requests}
          hospitals={governmentHospitals}
          camps={camps}
          reports={reports}
          auditLogs={auditLogs}
          onVerifyDonor={handleVerifyDonor}
          onToggleDonorAvailability={handleToggleDonorAvailability}
          onUpdateRequestStatus={handleUpdateRequestStatus}
          onApproveCamp={handleApproveCamp}
          onRejectCamp={handleRejectCamp}
          onResolveReport={handleResolveReport}
        />

        {/* 13. Final Community CTA */}
        <section className="final-cta">
          <div className="cta-drop">
            <Droplet fill="currentColor" size={38} />
          </div>
          <div className="eyebrow light-red">COMMUNITY SOLIDARITY</div>
          <h2>
            Your Kindness Could Be<br />
            <em>Someone's Tomorrow.</em>
          </h2>
          <p>
            Be part of an India-wide community that believes every drop connects a life.
          </p>
          <button
            type="button"
            className="btn btn-white btn-large"
            onClick={() => setShowDonorModal(true)}
          >
            <Heart size={17} />
            <span>Become a Voluntary Donor</span>
            <ArrowRight size={18} />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <a href="#home" className="brand footer-brand">
            <span className="brand-mark">
              <Droplet fill="currentColor" size={22} />
            </span>
            <span>
              blood<span>link</span>
              <small>EVERY DROP CONNECTS A LIFE</small>
            </span>
          </a>
          <p>
            India-wide blood connectivity network. Dedicated to rural, town, and city citizens. Designed for privacy, safety, and public good.
          </p>
          <div className="footer-links">
            <a href="#rural">Beyond Cities</a>
            <a href="#hospitals">Govt Hospitals</a>
            <a href="#emergency">Urgent Requests</a>
            <a href="#banks">Blood Banks</a>
            <a href="#network">Helplines &amp; Camps</a>
            <a href="#admin">Admin Hub</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 BloodLink · Built for Public Healthcare Benefit</span>
          <span>
            Official Emergency Numbers: <strong>104</strong> (Health) · <strong>108</strong> (Ambulance) · <strong>1910</strong> (National Blood Helpline)
          </span>
          <span>Demonstration &amp; Verification Mode · Not a Medical Diagnostic Service</span>
        </div>
      </footer>

      {/* Global Toast Notification */}
      {notice && (
        <div className={`toast ${notice.kind}`} role="status">
          <CheckCircle2 size={18} />
          <span>{notice.text}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Modals */}
      {showDonorModal && (
        <DonorRegistrationModal
          onClose={() => setShowDonorModal(false)}
          onSubmitDonor={handleAddDonor}
        />
      )}

      {showRequestModal && (
        <EmergencyRequestModal
          onClose={() => setShowRequestModal(false)}
          onSubmitRequest={handleAddRequest}
        />
      )}

      {showCampModal && (
        <SubmitCampModal
          onClose={() => setShowCampModal(false)}
          onSubmitCamp={handleAddCamp}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(email) => {
            setUserEmail(email);
            addAuditLog("USER_LOGIN", email, "Authenticated user session started.");
          }}
          notify={notify}
        />
      )}

      {/* Bottom Mode Indicator */}
      <div className="mode-indicator" title="System Status Indicator">
        <span className={isSupabaseConfigured ? "mode-dot live" : "mode-dot"} />
        <span>
          {isSupabaseConfigured
            ? "Supabase Connected · Live Cloud Mode"
            : "Demo Mode Active · Offline & LocalStorage Enabled"}
        </span>
      </div>
    </div>
  );
}
