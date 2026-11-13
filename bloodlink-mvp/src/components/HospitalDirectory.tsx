import { useState, useMemo } from "react";
import {
  Hospital as HospitalIcon,
  Phone,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building,
  RotateCcw
} from "lucide-react";
import type { Hospital, Language } from "../types";
import { governmentHospitals, hospitalCategories } from "../data/hospitalsData";
import { indianStatesAndDistricts } from "../data/statesAndDistricts";
import { translations } from "../data/translations";

interface HospitalDirectoryProps {
  currentLang: Language;
  onLocateOnMap?: (hospital: Hospital) => void;
}

export function HospitalDirectory({ currentLang, onLocateOnMap }: HospitalDirectoryProps) {
  const t = translations[currentLang] || translations.en;

  const [selectedState, setSelectedState] = useState<string>("All States");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyWithBloodBank, setOnlyWithBloodBank] = useState<boolean>(false);

  const filteredHospitals = useMemo(() => {
    return governmentHospitals.filter((hospital) => {
      // State filter
      if (selectedState !== "All States" && hospital.state !== selectedState) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All Categories" && hospital.category !== selectedCategory) {
        return false;
      }

      // Blood bank availability filter
      if (onlyWithBloodBank && !hospital.has_blood_bank && !hospital.blood_storage_available) {
        return false;
      }

      // Keyword query (hospital name, district, address, pin)
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesName = hospital.name.toLowerCase().includes(q);
        const matchesDist = hospital.district.toLowerCase().includes(q);
        const matchesCity = hospital.city_or_village.toLowerCase().includes(q);
        const matchesPin = hospital.pin_code.includes(q);
        if (!matchesName && !matchesDist && !matchesCity && !matchesPin) {
          return false;
        }
      }

      return true;
    });
  }, [selectedState, selectedCategory, searchQuery, onlyWithBloodBank]);

  const handleReset = () => {
    setSelectedState("All States");
    setSelectedCategory("All Categories");
    setSearchQuery("");
    setOnlyWithBloodBank(false);
  };

  return (
    <section className="hospitals-section" id="hospitals" aria-label="Government Hospital Directory">
      <div className="section-container">
        {/* Header */}
        <div className="section-heading-box">
          <div className="heading-tag">
            <HospitalIcon size={18} className="tag-icon" />
            <span>PUBLIC HEALTHCARE DIRECTORY · ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳು</span>
          </div>
          <h2>
            {t.hospitalDirectoryTitle} <br />
            <em>Verified Public Healthcare Directory Across India.</em>
          </h2>
          <p className="heading-desc">{t.hospitalDirectorySubtitle}</p>
        </div>

        {/* Filters Panel */}
        <div className="search-filter-card">
          <div className="filter-title-row">
            <span className="filter-card-heading">
              <Building size={18} /> Search Verified Government Healthcare Institutions
            </span>
            <span className="verified-pill">
              <ShieldCheck size={14} /> National Health Portal Sourced
            </span>
          </div>

          <div className="filter-grid hospital-filter-grid">
            {/* State Filter */}
            <div className="filter-field">
              <label htmlFor="hosp-state-select">Filter by State / UT</label>
              <div className="input-with-icon">
                <select
                  id="hosp-state-select"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="All States">All States / UTs</option>
                  {indianStatesAndDistricts.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Facility Category Filter */}
            <div className="filter-field">
              <label htmlFor="hosp-cat-select">Facility Category</label>
              <div className="input-with-icon">
                <select
                  id="hosp-cat-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {hospitalCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keyword / Town Search */}
            <div className="filter-field">
              <label htmlFor="hosp-search-input">Search Hospital or City</label>
              <div className="input-with-icon">
                <input
                  id="hosp-search-input"
                  type="text"
                  placeholder="e.g. Victoria, KGMU, SMS, Kadur, 560002"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Additional Filter Checkboxes */}
          <div className="filter-options-strip">
            <label className="checkbox-control">
              <input
                type="checkbox"
                checked={onlyWithBloodBank}
                onChange={(e) => setOnlyWithBloodBank(e.target.checked)}
              />
              <span>Show only facilities with attached Blood Bank or Storage Centre</span>
            </label>

            <button type="button" className="btn-text-reset" onClick={handleReset}>
              <RotateCcw size={14} /> {t.resetButton}
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="results-status-bar">
          <div>
            <strong>{filteredHospitals.length} Government Healthcare Facilities Listed</strong>
            <span className="results-subtitle">
              Verified public numbers and official medical directories
            </span>
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="hospital-cards-grid">
          {filteredHospitals.map((hospital) => (
            <article key={hospital.id} className="hospital-card">
              <div className="hospital-card-top">
                <div className="hospital-badge-row">
                  <span className="hospital-category-tag">{hospital.category}</span>
                  <span className="verified-badge-small">
                    <CheckCircle2 size={12} /> {t.verifiedGovtBadge}
                  </span>
                </div>
                <h3 className="hospital-title">{hospital.name}</h3>
                <p className="hospital-address">
                  <MapPin size={15} className="row-icon" />
                  <span>{hospital.address} — PIN: {hospital.pin_code}</span>
                </p>
              </div>

              {/* Blood Bank Availability Indicator */}
              <div className="hospital-services-box">
                {hospital.has_blood_bank ? (
                  <div className="service-status-pill available">
                    <CheckCircle2 size={14} />
                    <span>Attached Blood Bank Available (Verified on {hospital.verification_date})</span>
                  </div>
                ) : hospital.blood_storage_available ? (
                  <div className="service-status-pill storage">
                    <AlertCircle size={14} />
                    <span>Authorized Blood Storage Unit (Referral from District Centre)</span>
                  </div>
                ) : (
                  <div className="service-status-pill none">
                    <AlertCircle size={14} />
                    <span>No Attached Blood Bank (Referred to District Hospital)</span>
                  </div>
                )}

                <div className="hospital-source-line">
                  <span>Source: {hospital.data_source}</span>
                </div>
              </div>

              {/* Action Buttons: Call & Links */}
              <div className="hospital-card-actions">
                <a
                  href={`tel:${hospital.contact_number.replace(/\s+/g, "")}`}
                  className="btn btn-call-hospital"
                  aria-label={`Call ${hospital.name}`}
                >
                  <Phone size={14} />
                  <span>{t.callHospital}: {hospital.contact_number}</span>
                </a>

                {hospital.website && (
                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <span>Website</span>
                    <ExternalLink size={12} />
                  </a>
                )}

                {onLocateOnMap && (
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => onLocateOnMap(hospital)}
                  >
                    <span>{t.viewMap}</span>
                  </button>
                )}
              </div>
            </article>
          ))}

          {filteredHospitals.length === 0 && (
            <div className="empty-results-box">
              <HospitalIcon size={36} className="empty-icon" />
              <h3>No government hospitals matched your criteria</h3>
              <p>Try switching to "All States" or clearing your search term.</p>
              <button type="button" className="btn btn-outline" onClick={handleReset}>
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer Note */}
        <div className="security-notice-strip">
          <AlertCircle size={16} />
          <span>
            Note on public facility data: BloodLink displays verified public hospital directory details from official sources. Presence of a hospital does not guarantee continuous availability of all blood components or real-time stock. Transfusion procedures require direct medical prescription.
          </span>
        </div>
      </div>
    </section>
  );
}
