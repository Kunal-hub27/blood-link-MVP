import { useState, type FormEvent } from "react";
import { X, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import type { Donor, BloodGroup } from "../../types";
import { indianStatesAndDistricts, allBloodGroups } from "../../data/statesAndDistricts";

interface DonorRegistrationModalProps {
  onClose: () => void;
  onSubmitDonor: (donorData: Omit<Donor, "id">) => void;
}

export function DonorRegistrationModal({
  onClose,
  onSubmitDonor
}: DonorRegistrationModalProps) {
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bengaluru Urban");
  const [cityOrVillage, setCityOrVillage] = useState("");
  const [isVillage, setIsVillage] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [age, setAge] = useState(25);
  const [contactPreference, setContactPreference] = useState<Donor["contact_preference"]>("In-app Request");
  const [lastDonation, setLastDonation] = useState("Never / First Time");
  const [consentChecked, setConsentChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentDistricts =
    indianStatesAndDistricts.find((s) => s.name.toLowerCase() === state.toLowerCase())?.districts ||
    [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.length > 70) {
      setErrorMsg("Please enter a valid donor name (up to 70 characters).");
      return;
    }
    if (!contactInfo.trim()) {
      setErrorMsg("Please provide an email or phone number for request notifications.");
      return;
    }
    if (age < 18 || age > 65) {
      setErrorMsg("Donors must be between 18 and 65 years of age according to health guidelines.");
      return;
    }
    if (!cityOrVillage.trim()) {
      setErrorMsg("Please specify your town, village or city.");
      return;
    }
    if (!pinCode.trim() || pinCode.length !== 6) {
      setErrorMsg("Please enter a valid 6-digit PIN code.");
      return;
    }
    if (!consentChecked) {
      setErrorMsg("You must confirm informed consent to join the voluntary donor directory.");
      return;
    }

    // Get approximate district coordinates
    const distObj = currentDistricts.find((d) => d.name.toLowerCase() === district.toLowerCase());
    const coordinates = distObj ? { lat: distObj.lat, lng: distObj.lng } : undefined;

    // Build privacy-safe display name e.g. "Ramesh K."
    const nameParts = fullName.trim().split(" ");
    const displayName =
      nameParts.length > 1
        ? `${nameParts[0]} ${nameParts[nameParts.length - 1].charAt(0)}.`
        : nameParts[0];

    onSubmitDonor({
      name: displayName,
      blood_group: bloodGroup,
      state,
      district,
      city: cityOrVillage.trim(),
      is_village: isVillage,
      pin_code: pinCode.trim(),
      available: true,
      last_donation: lastDonation,
      is_demo: false,
      contact_preference: contactPreference,
      coordinates,
      consented_at: new Date().toISOString(),
      verified: false
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-large" role="dialog" aria-modal="true" aria-labelledby="reg-title">
        <div className="modal-head">
          <div>
            <div className="eyebrow red">VOLUNTARY DONOR ENROLMENT</div>
            <h2 id="reg-title">Register as a Blood Donor</h2>
            <p>Every donation connects a life. Your details are protected by privacy-first policies.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="modal-error-banner">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Section: Personal Info */}
          <div className="form-section-title">1. Personal &amp; Blood Details</div>
          <div className="form-row">
            <label>
              Full Name
              <input
                type="text"
                required
                maxLength={70}
                placeholder="e.g. Ramesh Kumar"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>

            <label>
              Email or Mobile Number (Private)
              <input
                type="text"
                required
                placeholder="e.g. 9876543210 or name@example.com"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Blood Group
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
              Age (18–65 years)
              <input
                type="number"
                min={18}
                max={65}
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </label>
          </div>

          {/* Section: Location */}
          <div className="form-section-title">2. Location Details (Beyond Cities Supported)</div>
          <div className="form-row">
            <label>
              State / Union Territory
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
              Town, Village, or Ward Name
              <input
                type="text"
                required
                maxLength={80}
                placeholder="e.g. Kadur or Melur"
                value={cityOrVillage}
                onChange={(e) => setCityOrVillage(e.target.value)}
              />
            </label>

            <label>
              Postal PIN Code (6 Digits)
              <input
                type="text"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                placeholder="e.g. 560001"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </label>
          </div>

          <label className="checkbox-control inline-checkbox">
            <input
              type="checkbox"
              checked={isVillage}
              onChange={(e) => setIsVillage(e.target.checked)}
            />
            <span>This is a rural village or underserved taluk area</span>
          </label>

          {/* Section: Preferences & Safety */}
          <div className="form-section-title">3. Contact Preferences &amp; Safety</div>
          <div className="form-row">
            <label>
              Preferred Contact Channel
              <select
                value={contactPreference}
                onChange={(e) =>
                  setContactPreference(e.target.value as Donor["contact_preference"])
                }
              >
                <option value="In-app Request">In-App Notification (Most Private)</option>
                <option value="WhatsApp Consent">WhatsApp Consent Request</option>
                <option value="Volunteer Assisted">Volunteer / Coordinator Assisted</option>
              </select>
            </label>

            <label>
              Last Donation Date
              <input
                type="text"
                placeholder="e.g. Dec 2025 or Never"
                value={lastDonation}
                onChange={(e) => setLastDonation(e.target.value)}
              />
            </label>
          </div>

          <div className="privacy-highlight-box">
            <ShieldCheck size={20} className="shield-icon" />
            <div>
              <strong>Privacy Protection Guarantee:</strong>
              <p>
                Your phone number and exact residential coordinates are never displayed publicly. Only your privacy-safe display name (e.g. Ramesh K.), blood group, and district are visible.
              </p>
            </div>
          </div>

          <label className="consent">
            <input
              type="checkbox"
              required
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
            />
            <span>
              I voluntarily consent to be listed in the BloodLink voluntary network and confirm I am 18–65 years of age. I understand BloodLink is a connectivity network and clinical suitability will be tested at the blood centre.
            </span>
          </label>

          <button type="submit" className="btn btn-primary btn-full btn-large">
            <span>Complete Registration</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
