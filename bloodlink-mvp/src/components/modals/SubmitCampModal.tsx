import { useState, type FormEvent } from "react";
import { X, ArrowRight, ShieldCheck } from "lucide-react";
import type { DonationCamp } from "../../types";
import { indianStatesAndDistricts } from "../../data/statesAndDistricts";

interface SubmitCampModalProps {
  onClose: () => void;
  onSubmitCamp: (campData: Omit<DonationCamp, "id" | "status">) => void;
}

export function SubmitCampModal({ onClose, onSubmitCamp }: SubmitCampModalProps) {
  const [title, setTitle] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bengaluru Urban");
  const [locationVenue, setLocationVenue] = useState("");
  const [date, setDate] = useState("");
  const [timing, setTiming] = useState("09:00 AM – 02:00 PM");
  const [contactNumber, setContactNumber] = useState("");
  const [expectedDonors, setExpectedDonors] = useState<number>(100);

  const currentDistricts =
    indianStatesAndDistricts.find((s) => s.name.toLowerCase() === state.toLowerCase())?.districts ||
    [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !organizer.trim() || !locationVenue.trim() || !date.trim()) {
      return;
    }

    onSubmitCamp({
      title: title.trim(),
      organizer: organizer.trim(),
      state,
      district,
      location_venue: locationVenue.trim(),
      date: date.trim(),
      timing: timing.trim(),
      contact_number: contactNumber.trim(),
      expected_donors: expectedDonors
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-large" role="dialog" aria-modal="true" aria-labelledby="camp-modal-title">
        <div className="modal-head">
          <div>
            <div className="eyebrow red">CAMP SUBMISSION &amp; MODERATION</div>
            <h2 id="camp-modal-title">Submit Voluntary Blood Camp</h2>
            <p>Announcements are verified by regional health coordinators before public display.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Camp Title
            <input
              type="text"
              required
              placeholder="e.g. Community Lifeline Blood Donation Camp"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Organising Institution / NGO / Hospital
            <input
              type="text"
              required
              placeholder="e.g. Indian Red Cross Society & Victoria Hospital"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
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

          <label>
            Venue / Hall Address
            <input
              type="text"
              required
              placeholder="e.g. Town Hall Auditorium, Main Road"
              value={locationVenue}
              onChange={(e) => setLocationVenue(e.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Camp Date
              <input
                type="text"
                required
                placeholder="e.g. 15 Dec 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label>
              Camp Timing
              <input
                type="text"
                required
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Verified Contact Number
              <input
                type="tel"
                required
                placeholder="e.g. +91 80 2226 8435"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </label>

            <label>
              Target Expected Donors
              <input
                type="number"
                min={10}
                max={1000}
                value={expectedDonors}
                onChange={(e) => setExpectedDonors(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="privacy-highlight-box">
            <ShieldCheck size={20} className="shield-icon" />
            <div>
              <strong>Moderation Requirement:</strong>
              <p>
                Camp announcements must have authorization from an approved blood bank or district health society. Submissions will be published once approved in the Admin Hub.
              </p>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-large">
            <span>Submit for Review</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
