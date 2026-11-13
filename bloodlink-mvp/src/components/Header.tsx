import { useState } from "react";
import {
  Droplet,
  Globe,
  LogIn,
  LogOut,
  Menu,
  ShieldCheck,
  UserCheck,
  X,
  Plus
} from "lucide-react";
import type { Language, UserRole } from "../types";
import { languageNames, translations } from "../data/translations";

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  userEmail: string | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenRegisterDonor: () => void;
}

export function Header({
  currentLang,
  onSelectLang,
  currentRole,
  onSelectRole,
  userEmail,
  onOpenAuth,
  onSignOut,
  onOpenRegisterDonor
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  const roleLabels: Record<UserRole, string> = {
    public: "Public Citizen",
    donor: "Registered Donor",
    hospital_rep: "Hospital Officer",
    blood_bank_rep: "Blood Bank Officer",
    admin: "Admin / Coordinator"
  };

  return (
    <>
      {/* Top Banner: Helplines & Demo Notice */}
      <div className="topline">
        <div className="topline-left">
          <span className="emergency-pill">
            <strong>24/7 HELPLINE: 104</strong> (Health) · <strong>108</strong> (Ambulance) · <strong>1910</strong> (Blood)
          </span>
          <span className="topline-separator">|</span>
          <span className="topline-tagline">{t.subtagline}</span>
        </div>
        <div className="topline-right">
          <span className="demo-badge-tag">{t.demoNotice}</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="nav">
        <a href="#home" className="brand" aria-label="BloodLink Home">
          <span className="brand-mark" aria-hidden="true">
            <Droplet fill="currentColor" size={24} />
          </span>
          <span className="brand-text">
            blood<span className="brand-accent">link</span>
            <small>{t.tagline.toUpperCase()}</small>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`} aria-label="Main Navigation">
          <a href="#quick-actions" onClick={() => setMobileMenuOpen(false)}>Quick Actions</a>
          <a href="#rural" onClick={() => setMobileMenuOpen(false)}>Beyond Cities</a>
          <a href="#hospitals" onClick={() => setMobileMenuOpen(false)}>Govt Hospitals</a>
          <a href="#emergency" onClick={() => setMobileMenuOpen(false)}>Emergency</a>
          <a href="#banks" onClick={() => setMobileMenuOpen(false)}>Blood Banks</a>
          <a href="#network" onClick={() => setMobileMenuOpen(false)}>Camps & Support</a>
          <a href="#admin" onClick={() => setMobileMenuOpen(false)}>Admin Hub</a>
        </nav>

        {/* Controls: Language Selector, Role Selector & Auth */}
        <div className="nav-controls">
          {/* Language Selector */}
          <div className="lang-picker-wrapper" title="Select Language">
            <Globe size={16} className="control-icon" />
            <select
              aria-label="Select Interface Language"
              value={currentLang}
              onChange={(e) => onSelectLang(e.target.value as Language)}
              className="lang-select"
            >
              {(Object.keys(languageNames) as Language[]).map((key) => (
                <option key={key} value={key}>
                  {languageNames[key].native} ({languageNames[key].label})
                </option>
              ))}
            </select>
          </div>

          {/* Test Persona / Role Switcher for Evaluators */}
          <div className="role-picker-wrapper" title="Switch Testing Role">
            <ShieldCheck size={15} className="control-icon role-icon" />
            <select
              aria-label="Switch User Persona Role"
              value={currentRole}
              onChange={(e) => onSelectRole(e.target.value as UserRole)}
              className="role-select"
            >
              {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                <option key={r} value={r}>
                  Role: {roleLabels[r]}
                </option>
              ))}
            </select>
          </div>

          {/* User Sign In / Account */}
          {userEmail ? (
            <div className="user-profile-badge">
              <span className="user-email-text" title={userEmail}>
                <UserCheck size={14} />
                <span className="truncate-text">{userEmail.split("@")[0]}</span>
              </span>
              <button
                type="button"
                className="btn-icon"
                onClick={onSignOut}
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="nav-login-btn"
              onClick={onOpenAuth}
            >
              <LogIn size={15} />
              <span>Sign in</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            type="button"
            className="btn btn-primary nav-cta-btn"
            onClick={onOpenRegisterDonor}
          >
            <Plus size={16} />
            <span>{t.registerDonor}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
    </>
  );
}
