import { useState, useMemo } from "react";
import {
  Building2,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  RotateCcw
} from "lucide-react";
import type { Language } from "../types";
import { initialBloodBanks } from "../data/bloodBanksData";
import { indianStatesAndDistricts } from "../data/statesAndDistricts";
import { translations } from "../data/translations";

interface BloodBankDirectoryProps {
  currentLang: Language;
}

export function BloodBankDirectory({ currentLang }: BloodBankDirectoryProps) {
  const t = translations[currentLang] || translations.en;

  const [selectedState, setSelectedState] = useState<string>("All States");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [only24x7, setOnly24x7] = useState<boolean>(false);

  const filteredBanks = useMemo(() => {
    return initialBloodBanks.filter((bank) => {
      if (selectedState !== "All States" && bank.state !== selectedState) {
        return false;
      }
      if (only24x7 && !bank.operates_24x7) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesName = bank.facility_name.toLowerCase().includes(q);
        const matchesCity = bank.city.toLowerCase().includes(q);
        const matchesDist = bank.district.toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesDist) return false;
      }
      return true;
    });
  }, [selectedState, only24x7, searchQuery]);

  const handleReset = () => {
    setSelectedState("All States");
    setSearchQuery("");
    setOnly24x7(false);
  };

  return (
    <section className="blood-banks-section" id="banks" aria-label="Authorised Blood Bank Directory">
      <div className="section-container">
        <div className="section-heading-box">
          <div className="heading-tag">
            <Building2 size={18} className="tag-icon" />
            <span>AUTHORISED BLOOD CENTRES · ರಕ್ತನಿಧಿ ಕೇಂದ್ರಗಳು</span>
          </div>
          <h2>
            Authorised Blood Bank Directory <br />
            <em>Connecting Citizens to Licensed Facilities.</em>
          </h2>
          <p className="heading-desc">
            Find regional blood transfusion centres, Red Cross blood banks, and hospital-attached licensed units.
          </p>
        </div>

        {/* Filter controls */}
        <div className="search-filter-card">
          <div className="filter-grid hospital-filter-grid">
            <div className="filter-field">
              <label htmlFor="bank-state-select">Select State / UT</label>
              <div className="input-with-icon">
                <select
                  id="bank-state-select"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="All States">All States / UTs</option>
                  {indianStatesAndDistricts.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-field">
              <label htmlFor="bank-search-input">Search Facility or City</label>
              <div className="input-with-icon">
                <input
                  id="bank-search-input"
                  type="text"
                  placeholder="e.g. Victoria, Red Cross, IMA, Parel"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="filter-options-strip">
            <label className="checkbox-control">
              <input
                type="checkbox"
                checked={only24x7}
                onChange={(e) => setOnly24x7(e.target.checked)}
              />
              <span>Show 24/7 round-the-clock facilities only</span>
            </label>

            <button type="button" className="btn-text-reset" onClick={handleReset}>
              <RotateCcw size={14} /> {t.resetButton}
            </button>
          </div>
        </div>

        {/* Grid of blood banks */}
        <div className="bank-cards-grid">
          {filteredBanks.map((bank) => (
            <article key={bank.id} className="bank-card-item">
              <div className="bank-card-top">
                <span className="bank-category-tag">{bank.category} Blood Centre</span>
                {bank.operates_24x7 && (
                  <span className="round-clock-badge">
                    <Clock size={12} /> 24/7 Available
                  </span>
                )}
              </div>

              <h3 className="bank-facility-title">{bank.facility_name}</h3>

              <div className="bank-meta-details">
                <div className="meta-line">
                  <MapPin size={14} className="row-icon" />
                  <span>{bank.address}, {bank.city}, {bank.state} — {bank.pin_code}</span>
                </div>
                <div className="meta-line verified-meta">
                  <CheckCircle2 size={14} />
                  <span>Verified License on {bank.last_verified}</span>
                </div>
              </div>

              <div className="bank-card-action">
                <a
                  href={`tel:${bank.phone.replace(/\s+/g, "")}`}
                  className="btn btn-call-hospital btn-full"
                >
                  <Phone size={14} />
                  <span>Call Blood Bank: {bank.phone}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
