import { useState, type FormEvent } from "react";
import { X, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import type { EmergencyRequest, BloodGroup, RequestPriority } from "../../types";
import { indianStatesAndDistricts, allBloodGroups } from "../../data/statesAndDistricts";

interface EmergencyRequestModalProps {
  onClose: () => void;
  onSubmitRequest: (requestData: Omit<EmergencyRequest, "id" | "created_at" | "is_demo">) => void;
}

export function EmergencyRequestModal({
  onClose,
  onSubmitRequest
}: EmergencyRequestModalProps) {
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [units, setUnits] = useState<number>(2);
  const [hospitalName, setHospitalName] = useState("");
  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bengaluru Urban");
  const [city, setCity] = useState("");
  const [neededBy, setNeededBy] = useState("Within 4 hours");
  const [urgency, setUrgency] = useState<RequestPriority>("Critical");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentDistricts =
    indianStatesAndDistricts.find((s) => s.name.toLowerCase() === state.toLowerCase())?.districts ||
    [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hospitalName.trim() || hospitalName.length > 100) {
      setErrorMsg("Please enter the name of the treating hospital.");
      return;
    }
    if (!contactPerson.trim() || !contactPhone.trim()) {
      setErrorMsg("Please provide a contact person and mobile number for verification.");
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refId = `REQ-2026-${randomSuffix}`;

    onSubmitRequest({
      reference_id: refId,
      patient_name_or_ref: `Case ${refId} (${hospitalName.slice(0, 20)})`,
      blood_group: bloodGroup,
      units,
      hospital_name: hospitalName.trim(),
      state,
      district,
      city: city.trim() || district,
      needed_by: neededBy,
      urgency,
      status: "Searching for Donors",
      contact_person: contactPerson.trim(),
      contact_phone: contactPhone.trim(),
      notes: notes.trim()
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-large" role="dialog" aria-modal="true" aria-labelledby="req-modal-title">
        <div className="modal-head">
          <div>
            <div className="eyebrow red">EMERGENCY BLOOD COORDINATION</div>
            <h2 id="req-modal-title">Create Emergency Blood Request</h2>
            <p>Connect with voluntary donors in your district for hospital cases.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="modal-error-banner">
            <AlertTriangle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Required Blood Group
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
              >
                {allBloodGroups.filter((g) => g !== "All").map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Units of Blood Needed (1–10)
              <input
                type="number"
                min={1}
                max={10}
                required
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
              />
            </label>
          </div>

          <label>
            Hospital / Healthcare Facility Name
            <input
              type="text"
              required
              maxLength={100}
              placeholder="e.g. Victoria Hospital, KGMU, or District Civil Hospital"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              State / UT
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  const firstDist = indianStatesAndDistricts.find(
                    (s) => s.name === e.target.value
                  )?.districts[0]?.name;
                  if (firstDist) setDistrict(firstDist);
                }}
              >
                {indianStatesAndDistricts.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              District
              <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                {currentDistricts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              City or Town
              <input
                type="text"
                placeholder="e.g. Majestic, Bengaluru"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>

            <label>
              Required By (Timeline)
              <input
                type="text"
                required
                placeholder="e.g. Within 4 hours / Today by 6 PM"
                value={neededBy}
                onChange={(e) => setNeededBy(e.target.value)}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Priority Level
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as RequestPriority)}
              >
                <option value="Critical">Critical (Immediate surgical requirement)</option>
                <option value="High">High (Needed within 12–24 hours)</option>
                <option value="Normal">Normal (Scheduled transfusion/dialysis)</option>
              </select>
            </label>

            <label>
              Contact Person (Attendant / Officer)
              <input
                type="text"
                required
                maxLength={50}
                placeholder="e.g. Suresh (Family Attendant)"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Verified Mobile Phone for Coordination
              <input
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </label>

            <label>
              Clinical Notes (Optional)
              <input
                type="text"
                placeholder="e.g. Replacement units required for orthopedic surgery"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
          </div>

          <div className="privacy-highlight-box">
            <ShieldCheck size={20} className="shield-icon" />
            <div>
              <strong>Important Disclaimer:</strong>
              <p>
                BloodLink is a volunteer connectivity service and does not maintain blood inventory or guarantee availability. Do not share sensitive medical diagnosis records.
              </p>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-large">
            <span>Publish Emergency Request</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
