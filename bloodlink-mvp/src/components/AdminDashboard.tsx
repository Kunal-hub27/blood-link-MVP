import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Droplet,
  Lock
} from "lucide-react";
import type {
  Donor,
  EmergencyRequest,
  Hospital,
  DonationCamp,
  AbuseReport,
  AuditLogEntry,
  UserRole
} from "../types";

interface AdminDashboardProps {
  currentRole: UserRole;
  donors: Donor[];
  requests: EmergencyRequest[];
  hospitals: Hospital[];
  camps: DonationCamp[];
  reports: AbuseReport[];
  auditLogs: AuditLogEntry[];
  onVerifyDonor: (donorId: string) => void;
  onToggleDonorAvailability: (donorId: string) => void;
  onUpdateRequestStatus: (requestId: string, newStatus: EmergencyRequest["status"]) => void;
  onApproveCamp: (campId: string) => void;
  onRejectCamp: (campId: string) => void;
  onResolveReport: (reportId: string) => void;
}

export function AdminDashboard({
  currentRole,
  donors,
  requests,
  hospitals,
  camps,
  reports,
  auditLogs,
  onVerifyDonor,
  onToggleDonorAvailability,
  onUpdateRequestStatus,
  onApproveCamp,
  onRejectCamp,
  onResolveReport
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "donors" | "requests" | "hospitals" | "camps" | "reports" | "audit"
  >("overview");

  // Role permissions check
  const hasAdminAccess = currentRole === "admin";
  const hasStaffAccess =
    currentRole === "admin" ||
    currentRole === "hospital_rep" ||
    currentRole === "blood_bank_rep";

  if (!hasStaffAccess) {
    return (
      <section className="admin-section" id="admin" aria-label="Administrator Portal">
        <div className="section-container">
          <div className="role-locked-banner">
            <Lock size={32} className="lock-icon" />
            <h3>Administrative Access Restricted</h3>
            <p>
              You are currently viewing as <strong>{currentRole}</strong>. To test administrative management workflows, switch the testing role in the top header to <strong>"Admin / Coordinator"</strong> or <strong>"Hospital Officer"</strong>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Analytics Calculations
  const totalDonors = donors.length;
  const activeDonors = donors.filter((d) => d.available).length;
  const inactiveDonors = totalDonors - activeDonors;
  const pendingRequests = requests.filter(
    (r) => r.status === "Searching for Donors" || r.status === "Donor Response Received"
  ).length;
  const fulfilledRequests = requests.filter((r) => r.status === "Fulfilled").length;
  const pendingReports = reports.filter((r) => r.status === "pending_review").length;

  // Donors by Blood Group count
  const bloodGroupCounts: Record<string, number> = {};
  donors.forEach((d) => {
    bloodGroupCounts[d.blood_group] = (bloodGroupCounts[d.blood_group] || 0) + 1;
  });

  return (
    <section className="admin-section" id="admin" aria-label="Administrator Hub">
      <div className="section-container">
        {/* Header */}
        <div className="admin-header-row">
          <div>
            <div className="admin-badge">
              <ShieldCheck size={16} />
              <span>OFFICIAL OPERATIONS &amp; GOVERNANCE HUB</span>
            </div>
            <h2>Coordinator &amp; Admin Dashboard</h2>
            <p className="admin-subtext">
              Active Role: <span className="role-chip">{currentRole.toUpperCase()}</span> · Monitoring donor verifications, emergency lifelines, and healthcare facility records.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs-bar">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview &amp; Stats
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "donors" ? "active" : ""}`}
            onClick={() => setActiveTab("donors")}
          >
            Donors ({totalDonors})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Emergency Requests ({requests.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "hospitals" ? "active" : ""}`}
            onClick={() => setActiveTab("hospitals")}
          >
            Govt Facilities ({hospitals.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "camps" ? "active" : ""}`}
            onClick={() => setActiveTab("camps")}
          >
            Camp Approvals ({camps.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            Abuse Reports ({pendingReports})
          </button>
          {hasAdminAccess && (
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "audit" ? "active" : ""}`}
              onClick={() => setActiveTab("audit")}
            >
              Audit Log ({auditLogs.length})
            </button>
          )}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="admin-tab-content">
            {/* Metric KPI Cards */}
            <div className="admin-kpi-grid">
              <div className="kpi-card">
                <span className="kpi-label">Total Donors</span>
                <strong className="kpi-val">{totalDonors}</strong>
                <span className="kpi-sub">{activeDonors} Active · {inactiveDonors} Inactive</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-label">Pending Blood Requests</span>
                <strong className="kpi-val kpi-alert">{pendingRequests}</strong>
                <span className="kpi-sub">{fulfilledRequests} Successfully Fulfilled</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-label">Listed Public Hospitals</span>
                <strong className="kpi-val">{hospitals.length}</strong>
                <span className="kpi-sub">Across 31+ States &amp; UTs</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-label">Pending Camp Approvals</span>
                <strong className="kpi-val">{camps.filter((c) => c.status === "Upcoming").length}</strong>
                <span className="kpi-sub">{pendingReports} Moderation Reports</span>
              </div>
            </div>

            {/* Blood Group Distribution Bar */}
            <div className="admin-chart-box">
              <h3>
                <Droplet size={18} /> Donors by Blood Group Distribution
              </h3>
              <div className="blood-group-distribution-grid">
                {Object.entries(bloodGroupCounts).map(([bg, count]) => {
                  const percent = Math.round((count / totalDonors) * 100);
                  return (
                    <div key={bg} className="distribution-item">
                      <div className="dist-head">
                        <strong>{bg}</strong>
                        <span>{count} donors ({percent}%)</span>
                      </div>
                      <div className="dist-bar-track">
                        <div className="dist-bar-fill" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Donors Management */}
        {activeTab === "donors" && (
          <div className="admin-tab-content">
            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Display Name</th>
                    <th>Blood Group</th>
                    <th>Location</th>
                    <th>PIN</th>
                    <th>Preference</th>
                    <th>Status</th>
                    <th>Verification</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((d) => (
                    <tr key={d.id}>
                      <td>
                        <strong>{d.name}</strong>
                        {d.is_demo && <span className="demo-tag-micro">DEMO</span>}
                      </td>
                      <td><span className="table-blood-chip">{d.blood_group}</span></td>
                      <td>{d.city}, {d.district}, {d.state}</td>
                      <td>{d.pin_code}</td>
                      <td>{d.contact_preference}</td>
                      <td>
                        <span className={`table-status-pill ${d.available ? "active" : "inactive"}`}>
                          {d.available ? "Available" : "Paused"}
                        </span>
                      </td>
                      <td>
                        {d.verified ? (
                          <span className="verified-text"><CheckCircle2 size={13} /> Verified</span>
                        ) : (
                          <span className="unverified-text">Pending</span>
                        )}
                      </td>
                      <td>
                        <div className="table-actions-row">
                          {!d.verified && hasAdminAccess && (
                            <button
                              type="button"
                              className="btn-action-small"
                              onClick={() => onVerifyDonor(d.id)}
                            >
                              Verify
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn-action-small"
                            onClick={() => onToggleDonorAvailability(d.id)}
                            title="Toggle Availability"
                          >
                            {d.available ? "Pause" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Emergency Requests Management */}
        {activeTab === "requests" && (
          <div className="admin-tab-content">
            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Blood Group</th>
                    <th>Units</th>
                    <th>Hospital</th>
                    <th>District</th>
                    <th>Needed By</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r.id}>
                      <td><strong>{r.reference_id}</strong></td>
                      <td><span className="table-blood-chip">{r.blood_group}</span></td>
                      <td>{r.units}</td>
                      <td>{r.hospital_name}</td>
                      <td>{r.city}, {r.district}</td>
                      <td>{r.needed_by}</td>
                      <td>
                        <span className={`table-urgency-tag ${r.urgency.toLowerCase()}`}>
                          {r.urgency}
                        </span>
                      </td>
                      <td>{r.status}</td>
                      <td>
                        <select
                          className="table-status-select"
                          value={r.status}
                          onChange={(e) => onUpdateRequestStatus(r.id, e.target.value as EmergencyRequest["status"])}
                        >
                          <option value="Searching for Donors">Searching</option>
                          <option value="Donor Response Received">Donor Response</option>
                          <option value="Connected to Hospital">Connected</option>
                          <option value="Fulfilled">Fulfilled</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Hospital Directory Inspection */}
        {activeTab === "hospitals" && (
          <div className="admin-tab-content">
            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Hospital Name</th>
                    <th>Category</th>
                    <th>State</th>
                    <th>District</th>
                    <th>Contact Phone</th>
                    <th>Blood Bank</th>
                    <th>Verification Date</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((h) => (
                    <tr key={h.id}>
                      <td><strong>{h.name}</strong></td>
                      <td>{h.category}</td>
                      <td>{h.state}</td>
                      <td>{h.district}</td>
                      <td>{h.contact_number}</td>
                      <td>{h.has_blood_bank ? "✅ Attached" : h.blood_storage_available ? "Storage Unit" : "Referral"}</td>
                      <td>{h.verification_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Camp Approvals */}
        {activeTab === "camps" && (
          <div className="admin-tab-content">
            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Camp Title</th>
                    <th>Organizer</th>
                    <th>Venue</th>
                    <th>Date &amp; Time</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Moderation Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {camps.map((c) => (
                    <tr key={c.id}>
                      <td><strong>{c.title}</strong></td>
                      <td>{c.organizer}</td>
                      <td>{c.location_venue}, {c.district}</td>
                      <td>{c.date} ({c.timing})</td>
                      <td>{c.contact_number}</td>
                      <td><span className="table-status-pill active">{c.status}</span></td>
                      <td>
                        <div className="table-actions-row">
                          {c.status !== "Verified" && (
                            <button
                              type="button"
                              className="btn-action-small"
                              onClick={() => onApproveCamp(c.id)}
                            >
                              Approve
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn-action-small btn-reject"
                            onClick={() => onRejectCamp(c.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 6: Reports & Suspicious Activity */}
        {activeTab === "reports" && (
          <div className="admin-tab-content">
            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Target Type</th>
                    <th>Target ID</th>
                    <th>Report Reason</th>
                    <th>Reported At</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((rep) => (
                    <tr key={rep.id}>
                      <td><strong>{rep.target_type.toUpperCase()}</strong></td>
                      <td>{rep.target_id}</td>
                      <td>{rep.reason}</td>
                      <td>{rep.reported_at}</td>
                      <td>{rep.status}</td>
                      <td>
                        {rep.status === "pending_review" ? (
                          <button
                            type="button"
                            className="btn-action-small"
                            onClick={() => onResolveReport(rep.id)}
                          >
                            Resolve / Dismiss
                          </button>
                        ) : (
                          <span className="resolved-text">Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 7: Security Audit Logs */}
        {activeTab === "audit" && hasAdminAccess && (
          <div className="admin-tab-content">
            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Action</th>
                    <th>Actor</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.timestamp}</td>
                      <td><strong>{log.action}</strong></td>
                      <td>{log.actor}</td>
                      <td>{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
