import {
  Search,
  UserPlus,
  FileText,
  Hospital,
  Building2,
  AlertTriangle
} from "lucide-react";
import type { Language } from "../types";
import { translations } from "../data/translations";

interface ActionTilesProps {
  currentLang: Language;
  onFindBloodClick: () => void;
  onRegisterDonorClick: () => void;
  onRequestBloodClick: () => void;
  onFindHospitalsClick: () => void;
  onFindBloodBanksClick: () => void;
  onEmergencyRequestClick: () => void;
}

export function ActionTiles({
  currentLang,
  onFindBloodClick,
  onRegisterDonorClick,
  onRequestBloodClick,
  onFindHospitalsClick,
  onFindBloodBanksClick,
  onEmergencyRequestClick
}: ActionTilesProps) {
  const t = translations[currentLang] || translations.en;

  const tiles = [
    {
      id: "tile-find-blood",
      number: "01",
      title: t.searchBlood,
      sub: "Search by Village, Town, District or Blood Group",
      icon: Search,
      onClick: onFindBloodClick,
      colorClass: "tile-find",
      badge: "Fast Search"
    },
    {
      id: "tile-register-donor",
      number: "02",
      title: t.registerDonor,
      sub: "Join our voluntary life-saving community",
      icon: UserPlus,
      onClick: onRegisterDonorClick,
      colorClass: "tile-register",
      badge: "Voluntary"
    },
    {
      id: "tile-request-blood",
      number: "03",
      title: t.requestBlood,
      sub: "Submit patient requirements for hospital cases",
      icon: FileText,
      onClick: onRequestBloodClick,
      colorClass: "tile-request",
      badge: "Verified Need"
    },
    {
      id: "tile-find-hospitals",
      number: "04",
      title: t.govtHospitals,
      sub: "Locate Medical Colleges, District, Taluk, CHC & PHC",
      icon: Hospital,
      onClick: onFindHospitalsClick,
      colorClass: "tile-hospital",
      badge: "Public Care"
    },
    {
      id: "tile-find-banks",
      number: "05",
      title: t.bloodBanks,
      sub: "Authorized 24x7 blood banks with phone numbers",
      icon: Building2,
      onClick: onFindBloodBanksClick,
      colorClass: "tile-bank",
      badge: "Authorised"
    },
    {
      id: "tile-emergency",
      number: "06",
      title: t.emergencyRequest,
      sub: "Critical patient care & urgent blood matching",
      icon: AlertTriangle,
      onClick: onEmergencyRequestClick,
      colorClass: "tile-emergency",
      badge: "Priority Alert"
    }
  ];

  return (
    <section className="action-tiles-section" id="quick-actions" aria-label="Essential Quick Actions">
      <div className="section-container">
        <div className="action-tiles-header">
          <span className="eyebrow red">DIRECT CITIZEN ACTIONS · ಜನಸ್ನೇಹಿ ಸೇವೆಗಳು</span>
          <h2>
            Simple, Essential Actions. <em>For Every Citizen.</em>
          </h2>
          <p>
            Designed for ease of use across rural areas and cities alike. Tap any action below to proceed immediately.
          </p>
        </div>

        <div className="action-tiles-grid">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.id}
                type="button"
                className={`action-tile-card ${tile.colorClass}`}
                onClick={tile.onClick}
                aria-label={`${tile.title} - ${tile.sub}`}
              >
                <div className="tile-top">
                  <span className="tile-number">{tile.number}</span>
                  <span className="tile-badge">{tile.badge}</span>
                </div>
                <div className="tile-icon-box">
                  <Icon size={32} strokeWidth={2.2} />
                </div>
                <div className="tile-content">
                  <h3 className="tile-title">{tile.title}</h3>
                  <p className="tile-subtitle">{tile.sub}</p>
                </div>
                <div className="tile-footer">
                  <span className="tile-action-link">Open Action &rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
