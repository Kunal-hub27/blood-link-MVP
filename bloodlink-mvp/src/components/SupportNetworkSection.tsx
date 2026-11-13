import { useState } from "react";
import {
  HeartHandshake,
  Calendar,
  PhoneCall,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Building,
  CheckCircle2,
  Plus
} from "lucide-react";
import type { DonationCamp, Language } from "../types";
import {
  voluntaryOrganisations,
  officialHelplines,
  bloodDonationEligibilityFAQs
} from "../data/supportNetworkData";
import { translations } from "../data/translations";

interface SupportNetworkSectionProps {
  currentLang: Language;
  camps: DonationCamp[];
  onOpenSubmitCampModal: () => void;
}

export function SupportNetworkSection({
  currentLang,
  camps,
  onOpenSubmitCampModal
}: SupportNetworkSectionProps) {
  const t = translations[currentLang] || translations.en;
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section className="support-network-section" id="network" aria-label="Community Blood Support Network">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-heading-box">
          <div className="heading-tag">
            <HeartHandshake size={18} className="tag-icon" />
            <span>COMMUNITY COLLABORATION · ಸಾರ್ವಜನಿಕ ಸಹಯೋಗ</span>
          </div>
          <h2>
            Community Blood Support Network <br />
            <em>Connecting Citizens, Voluntary Camps & Support Organisations.</em>
          </h2>
          <p className="heading-desc">
            Explore upcoming voluntary donation camps, official government helplines, partner humanitarian NGOs, and clinical donation guidelines.
          </p>
        </div>

        {/* 1. Upcoming Blood Donation Camps */}
        <div className="support-sub-block">
          <div className="sub-block-head">
            <div>
              <h3>
                <Calendar size={20} /> {t.campsTitle}
              </h3>
              <p>Organized in coordination with state blood transfusion councils and district hospitals.</p>
            </div>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={onOpenSubmitCampModal}
            >
              <Plus size={14} /> Submit Camp for Moderation
            </button>
          </div>

          <div className="camps-grid">
            {camps.map((camp) => (
              <article key={camp.id} className="camp-card">
                <div className="camp-card-top">
                  <span className="camp-status-badge">
                    <CheckCircle2 size={12} /> {camp.status}
                  </span>
                  <span className="camp-date-badge">{camp.date}</span>
                </div>

                <h4 className="camp-title">{camp.title}</h4>
                <p className="camp-organizer">Organized by: {camp.organizer}</p>

                <div className="camp-details-box">
                  <div className="camp-detail-row">
                    <MapPin size={14} className="row-icon" />
                    <span>{camp.location_venue}, {camp.district}, {camp.state}</span>
                  </div>
                  <div className="camp-detail-row">
                    <Clock size={14} className="row-icon" />
                    <span>Timing: {camp.timing}</span>
                  </div>
                </div>

                <div className="camp-card-footer">
                  <a
                    href={`tel:${camp.contact_number.replace(/\s+/g, "")}`}
                    className="camp-contact-link"
                  >
                    Contact: {camp.contact_number}
                  </a>
                  {camp.expected_donors && (
                    <span className="camp-target">Target: ~{camp.expected_donors} donors</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 2. Official Emergency Helplines Grid */}
        <div className="support-sub-block helpline-block">
          <div className="sub-block-head">
            <div>
              <h3>
                <PhoneCall size={20} /> {t.helplineTitle}
              </h3>
              <p>Government emergency numbers verified across all states and union territories.</p>
            </div>
          </div>

          <div className="helplines-grid">
            {officialHelplines.map((hl) => (
              <div key={hl.number} className="helpline-card">
                <div className="helpline-number-bubble">
                  <strong>{hl.number}</strong>
                </div>
                <div className="helpline-text-content">
                  <h4>{hl.title}</h4>
                  <p>{hl.desc}</p>
                  {hl.available_in && (
                    <span className="helpline-avail-note">Languages: {hl.available_in}</span>
                  )}
                  {hl.website && (
                    <a
                      href={hl.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="helpline-web-link"
                    >
                      Visit Official Portal <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Partner Humanitarian & Voluntary Organisations */}
        <div className="support-sub-block">
          <div className="sub-block-head">
            <div>
              <h3>
                <Building size={20} /> Voluntary Donor Organisations & NGOs
              </h3>
              <p>Statutory and non-profit partner organisations strengthening rural blood accessibility.</p>
            </div>
          </div>

          <div className="orgs-grid">
            {voluntaryOrganisations.map((org) => (
              <div key={org.name} className="org-card">
                <span className="org-category-pill">{org.category}</span>
                <h4>{org.name}</h4>
                <p className="org-focus">{org.focus}</p>
                <div className="org-card-footer">
                  <span className="org-coverage">{org.coverage}</span>
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="org-link"
                  >
                    <span>Website</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Clinical Eligibility Criteria & Rural Awareness FAQs */}
        <div className="support-sub-block">
          <div className="sub-block-head">
            <div>
              <h3>
                <HelpCircle size={20} /> Clinical Eligibility & Awareness FAQs
              </h3>
              <p>Essential medical facts based on National Blood Transfusion Council guidelines.</p>
            </div>
          </div>

          <div className="faqs-accordion">
            {bloodDonationEligibilityFAQs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={faq.question} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
