import { useState, useMemo } from "react";
import {
  AlertTriangle,
  Clock,
  Droplet,
  Hospital,
  MapPin,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Phone,
  FileCheck
} from "lucide-react";
import type { EmergencyRequest, Language } from "../types";
import { translations } from "../data/translations";

interface EmergencyRequestSectionProps {
  currentLang: Language;
  requests: EmergencyRequest[];
  onOpenCreateRequest: () => void;
  onRespondToRequest: (req: EmergencyRequest) => void;
}

export function EmergencyRequestSection({
  currentLang,
  requests,
  onOpenCreateRequest,
  onRespondToRequest
}: EmergencyRequestSectionProps) {
  const t = translations[currentLang] || translations.en;
  const [filterGroup, setFilterGroup] = useState<string>("All");

  const filteredRequests = useMemo(() => {
    if (filterGroup === "All") return requests;
    return requests.filter((r) => r.blood_group === filterGroup);
  }, [requests, filterGroup]);

  const getUrgencyBadgeClass = (urgency: EmergencyRequest["urgency"]) => {
    switch (urgency) {
      case "Critical":
        return "urgency-critical";
      case "High":
        return "urgency-high";
      default:
        return "urgency-normal";
    }
  };

  const getStatusBadge = (status: EmergencyRequest["status"]) => {
    switch (status) {
      case "Fulfilled":
        return <span className="status-badge fulfilled"><CheckCircle2 size={12} /> Fulfilled</span>;
      case "Connected to Hospital":
        return <span className="status-badge connected"><FileCheck size={12} /> Connected</span>;
      case "Donor Response Received":
        return <span className="status-badge response-received"><CheckCircle2 size={12} /> Donor Responded</span>;
      default:
        return <span className="status-badge searching"><span className="pulse-dot-small" /> Searching for Donors</span>;
    }
  };

  return (
    <section className="emergency-requests-section" id="emergency" aria-label="Urgent Patient Blood Requests">
      <div className="section-container">
        {/* Top Priority Warning Banner */}
        <div className="emergency-alert-banner">
          <div className="alert-content-row">
            <div className="alert-icon-box">
              <AlertTriangle size={24} />
            </div>
            <div className="alert-text-block">
              <strong>EMERGENCY LIFELINE COORDINATION · ತುರ್ತು ರಕ್ತ ವಿನಂತಿ</strong>
              <p>
                Patient blood requests must be verified with treating hospital personnel. If you are experiencing a life-threatening trauma emergency, contact <strong>108 / 104</strong> immediately.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-emergency-cta"
            onClick={onOpenCreateRequest}
          >
            <Plus size={16} />
            <span>Create Emergency Request</span>
          </button>
        </div>

        {/* Section Heading */}
        <div className="emergency-heading-row">
          <div>
            <span className="eyebrow red">TIME-SENSITIVE REQUIREMENTS</span>
            <h2>
              {t.activeRequestsTitle} <br />
              <em>Community Support for Critical Hospital Cases.</em>
            </h2>
          </div>

          {/* Quick blood group filter */}
          <div className="emergency-bg-filter">
            <span>Filter:</span>
            {["All", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
              <button
                key={bg}
                type="button"
                className={`bg-filter-chip-mini ${filterGroup === bg ? "active" : ""}`}
                onClick={() => setFilterGroup(bg)}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Cards Grid */}
        <div className="emergency-requests-grid">
          {filteredRequests.map((req) => (
            <article key={req.id} className="emergency-request-card">
              <div className="req-card-top">
                <div className="req-badges">
                  <span className={`urgency-pill ${getUrgencyBadgeClass(req.urgency)}`}>
                    {req.urgency} Priority
                  </span>
                  {getStatusBadge(req.status)}
                </div>
                <span className="req-ref-id">{req.reference_id}</span>
              </div>

              {/* Blood Group Display */}
              <div className="req-blood-hero">
                <div className="req-blood-badge">
                  <Droplet fill="currentColor" size={28} />
                  <span>{req.blood_group}</span>
                </div>
                <div className="req-units-info">
                  <strong>{req.units} Units Required</strong>
                  <span className="req-time-needed">
                    <Clock size={13} /> {req.needed_by}
                  </span>
                </div>
              </div>

              {/* Hospital & Location Details */}
              <div className="req-details-list">
                <div className="detail-item">
                  <Hospital size={15} className="row-icon" />
                  <span className="detail-text font-semibold">{req.hospital_name}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={15} className="row-icon" />
                  <span className="detail-text">{req.city}, {req.district}, {req.state}</span>
                </div>
                {req.notes && (
                  <div className="detail-notes">
                    <span>Note: {req.notes}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="req-card-footer">
                <div className="contact-person-info">
                  <Phone size={13} />
                  <span>Verified Contact: {req.contact_person}</span>
                </div>

                <button
                  type="button"
                  className="btn btn-respond-request"
                  onClick={() => onRespondToRequest(req)}
                >
                  <span>Respond / Coordinate</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="security-notice-strip">
          <ShieldCheck size={16} />
          <span>
            Non-Commercial Volunteer Platform: BloodLink strictly prohibits any monetary compensation or sale of blood components under Section 18 of the Drugs and Cosmetics Act. All cross-matching must take place at licensed medical facilities.
          </span>
        </div>
      </div>
    </section>
  );
}
