import { useState, useMemo } from "react";
import {
  Compass,
  Droplet,
  MapPin,
  Search,
  RotateCcw,
  ShieldCheck,
  Send,
  Info,
  Clock3,
  Home
} from "lucide-react";
import type { Donor, Language } from "../types";
import {
  indianStatesAndDistricts,
  allBloodGroups,
  getDistrictCoordinates
} from "../data/statesAndDistricts";
import { calculateHaversineDistance, formatDistance } from "../utils/distance";
import { translations } from "../data/translations";

interface RuralDonorSearchProps {
  currentLang: Language;
  donors: Donor[];
  onConnectDonor: (donor: Donor) => void;
  onOpenRegisterDonor: () => void;
}

export function RuralDonorSearch({
  currentLang,
  donors,
  onConnectDonor,
  onOpenRegisterDonor
}: RuralDonorSearchProps) {
  const t = translations[currentLang] || translations.en;

  const [selectedState, setSelectedState] = useState<string>("Karnataka");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All Districts");
  const [villageOrTownQuery, setVillageOrTownQuery] = useState<string>("");
  const [pinCodeQuery, setPinCodeQuery] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [includeNeighbouring, setIncludeNeighbouring] = useState<boolean>(true);

  // Available districts for current selected state
  const currentDistricts = useMemo(() => {
    if (!selectedState || selectedState === "All States") return [];
    const stateObj = indianStatesAndDistricts.find(
      (s) => s.name.toLowerCase() === selectedState.toLowerCase()
    );
    return stateObj ? stateObj.districts : [];
  }, [selectedState]);

  // Selected district coordinates for distance calculation
  const targetCoordinates = useMemo(() => {
    if (selectedState && selectedDistrict && selectedDistrict !== "All Districts") {
      return getDistrictCoordinates(selectedState, selectedDistrict);
    }
    return null;
  }, [selectedState, selectedDistrict]);

  // Filtered donors with distance calculation
  const resultsWithDistance = useMemo(() => {
    return donors
      .filter((donor) => {
        // State filter
        if (selectedState && selectedState !== "All States") {
          if (donor.state.toLowerCase() !== selectedState.toLowerCase()) return false;
        }

        // District filter (unless includeNeighbouring is on and no match in exact district)
        if (selectedDistrict && selectedDistrict !== "All Districts") {
          const matchesExact = donor.district.toLowerCase().includes(selectedDistrict.toLowerCase());
          if (!matchesExact && !includeNeighbouring) {
            return false;
          }
        }

        // Blood group filter
        if (selectedGroup !== "All") {
          if (donor.blood_group !== selectedGroup) return false;
        }

        // Availability filter
        if (onlyAvailable && !donor.available) {
          return false;
        }

        // Village/Town query
        if (villageOrTownQuery.trim()) {
          const q = villageOrTownQuery.trim().toLowerCase();
          const matchCity = donor.city.toLowerCase().includes(q);
          const matchDist = donor.district.toLowerCase().includes(q);
          if (!matchCity && !matchDist) return false;
        }

        // PIN code query
        if (pinCodeQuery.trim()) {
          const pin = pinCodeQuery.trim();
          if (!donor.pin_code.startsWith(pin)) return false;
        }

        return true;
      })
      .map((donor) => {
        let distanceKm: number | undefined = undefined;
        if (targetCoordinates && donor.coordinates) {
          distanceKm = calculateHaversineDistance(
            targetCoordinates.lat,
            targetCoordinates.lng,
            donor.coordinates.lat,
            donor.coordinates.lng
          );
        }
        return { donor, distanceKm };
      })
      .sort((a, b) => {
        if (a.distanceKm !== undefined && b.distanceKm !== undefined) {
          return a.distanceKm - b.distanceKm;
        }
        return a.donor.available === b.donor.available ? 0 : a.donor.available ? -1 : 1;
      });
  }, [
    donors,
    selectedState,
    selectedDistrict,
    selectedGroup,
    onlyAvailable,
    villageOrTownQuery,
    pinCodeQuery,
    includeNeighbouring,
    targetCoordinates
  ]);

  const handleReset = () => {
    setSelectedState("Karnataka");
    setSelectedDistrict("All Districts");
    setVillageOrTownQuery("");
    setPinCodeQuery("");
    setSelectedGroup("All");
    setOnlyAvailable(false);
    setIncludeNeighbouring(true);
  };

  return (
    <section className="rural-search-section" id="rural" aria-label="Rural & Village Blood Donor Search">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-heading-box">
          <div className="heading-tag">
            <Compass size={18} className="tag-icon" />
            <span>EXPANDING CONNECTIVITY · ಗ್ರಾಮೀಣ ಮತ್ತು ದೂರದ ಪ್ರದೇಶಗಳು</span>
          </div>
          <h2>
            {t.findBeyondCitiesTitle} <br />
            <em>Connecting Villages, Taluks & Small Towns.</em>
          </h2>
          <p className="heading-desc">{t.findBeyondCitiesSubtitle}</p>
        </div>

        {/* Search & Location Filter Panel */}
        <div className="search-filter-card">
          <div className="filter-title-row">
            <span className="filter-card-heading">
              <MapPin size={18} /> Location & Blood Group Filter (No GPS Required)
            </span>
            <span className="privacy-pill">
              <ShieldCheck size={14} /> Privacy Safe
            </span>
          </div>

          <div className="filter-grid">
            {/* State Selector */}
            <div className="filter-field">
              <label htmlFor="rural-state-select">{t.selectState}</label>
              <div className="input-with-icon">
                <select
                  id="rural-state-select"
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict("All Districts");
                  }}
                >
                  <option value="All States">All States & Union Territories (India)</option>
                  {indianStatesAndDistricts.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* District Selector */}
            <div className="filter-field">
              <label htmlFor="rural-district-select">{t.selectDistrict}</label>
              <div className="input-with-icon">
                <select
                  id="rural-district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="All Districts">All Districts in {selectedState}</option>
                  {currentDistricts.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Town, Village or Sub-division */}
            <div className="filter-field">
              <label htmlFor="rural-village-input">{t.enterVillageCity}</label>
              <div className="input-with-icon">
                <Home size={16} className="field-icon" />
                <input
                  id="rural-village-input"
                  type="text"
                  placeholder="e.g. Kadur, Melur, Aluva, Bodh Gaya"
                  value={villageOrTownQuery}
                  onChange={(e) => setVillageOrTownQuery(e.target.value)}
                  maxLength={50}
                />
              </div>
            </div>

            {/* Postal PIN Code */}
            <div className="filter-field">
              <label htmlFor="rural-pin-input">{t.enterPin}</label>
              <div className="input-with-icon">
                <input
                  id="rural-pin-input"
                  type="text"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="e.g. 560001 or 577548"
                  value={pinCodeQuery}
                  onChange={(e) => setPinCodeQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Quick Blood Group Buttons */}
          <div className="blood-group-filter-strip">
            <span className="bg-strip-label">
              <Droplet size={15} /> {t.bloodGroup}:
            </span>
            <div className="bg-buttons-row">
              {allBloodGroups.map((bg) => (
                <button
                  key={bg}
                  type="button"
                  className={`bg-filter-chip ${selectedGroup === bg ? "active" : ""}`}
                  onClick={() => setSelectedGroup(bg)}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Filter Checkboxes & Actions */}
          <div className="filter-options-strip">
            <label className="checkbox-control">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
              />
              <span>Show only immediately available donors</span>
            </label>

            <label className="checkbox-control">
              <input
                type="checkbox"
                checked={includeNeighbouring}
                onChange={(e) => setIncludeNeighbouring(e.target.checked)}
              />
              <span>{t.includeNeighbouring}</span>
            </label>

            <button type="button" className="btn-text-reset" onClick={handleReset}>
              <RotateCcw size={14} /> {t.resetButton}
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="results-status-bar">
          <div>
            <strong>
              {resultsWithDistance.length} Donor Profiles Found
            </strong>
            <span className="results-subtitle">
              Showing privacy-safe records across {selectedDistrict !== "All Districts" ? selectedDistrict : selectedState}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onOpenRegisterDonor}
          >
            + Register In This Area
          </button>
        </div>

        {/* Donor Cards Grid */}
        <div className="donor-cards-grid">
          {resultsWithDistance.map(({ donor, distanceKm }) => (
            <article key={donor.id} className="donor-profile-card">
              <div className="donor-card-header">
                <div className="donor-avatar-circle">
                  {donor.name.charAt(0)}
                </div>
                <div className="donor-name-col">
                  <div className="donor-name-row">
                    <h3 className="donor-name">{donor.name}</h3>
                    {donor.is_demo && (
                      <span className="demo-indicator-pill">{t.demoBadge}</span>
                    )}
                  </div>
                  <span className="donor-pref-note">
                    Prefers: {donor.contact_preference}
                  </span>
                </div>
                <div className="blood-group-stamp">{donor.blood_group}</div>
              </div>

              <div className="donor-card-body">
                <div className="donor-info-row">
                  <MapPin size={15} className="row-icon" />
                  <span>
                    <strong>{donor.city}</strong>
                    {donor.is_village ? " (Village/Taluk)" : ""}, {donor.district}, {donor.state} — {donor.pin_code}
                  </span>
                </div>

                <div className="donor-info-row">
                  <Clock3 size={15} className="row-icon" />
                  <span>Last donation: {donor.last_donation}</span>
                </div>

                {distanceKm !== undefined && (
                  <div className="donor-distance-row">
                    <Compass size={14} />
                    <span>{formatDistance(distanceKm)} from {selectedDistrict} center</span>
                  </div>
                )}
              </div>

              <div className="donor-card-footer">
                <span className={`status-pill ${donor.available ? "active" : "inactive"}`}>
                  <span className="status-dot" />
                  {donor.available ? t.available : t.unavailable}
                </span>

                <button
                  type="button"
                  className="btn-request-contact"
                  onClick={() => onConnectDonor(donor)}
                  disabled={!donor.available}
                >
                  <Send size={13} />
                  <span>{t.sendRequest}</span>
                </button>
              </div>
            </article>
          ))}

          {resultsWithDistance.length === 0 && (
            <div className="empty-results-box">
              <Search size={36} className="empty-icon" />
              <h3>No matching donor records in this location</h3>
              <p>
                Try widening your search to all blood groups, checking "Include neighbouring districts", or clear your village name.
              </p>
              <button type="button" className="btn btn-outline" onClick={handleReset}>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Section Privacy and Medical Footnote */}
        <div className="security-notice-strip">
          <Info size={16} />
          <span>
            {t.privacyNoticeText} · {t.disclaimerMedical}
          </span>
        </div>
      </div>
    </section>
  );
}
