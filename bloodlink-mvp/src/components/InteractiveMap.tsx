import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapPin,
  Hospital as HospitalIcon,
  Building2,
  Droplet,
  Layers,
  List,
  Map,
  ShieldCheck
} from "lucide-react";
import type { Donor, Hospital, BloodBank } from "../types";

interface InteractiveMapProps {
  donors: Donor[];
  hospitals: Hospital[];
  bloodBanks: BloodBank[];
  focusedCoordinates?: { lat: number; lng: number } | null;
}

export function InteractiveMap({
  donors,
  hospitals,
  bloodBanks,
  focusedCoordinates
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [showHospitals, setShowHospitals] = useState<boolean>(true);
  const [showBloodBanks, setShowBloodBanks] = useState<boolean>(true);
  const [showDonors, setShowDonors] = useState<boolean>(true);

  useEffect(() => {
    if (viewMode !== "map" || !mapContainerRef.current) return;

    try {
      if (!mapInstanceRef.current) {
        // Initialize Map centered on India (approx Lat 21.0, Lng 78.9)
        const map = L.map(mapContainerRef.current, {
          center: [20.5937, 78.9629],
          zoom: 5,
          scrollWheelZoom: false
        });

        // Add OpenStreetMap TileLayer with standard attribution
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18
        }).addTo(map);

        const markersLayer = L.layerGroup().addTo(map);
        markersLayerRef.current = markersLayer;
        mapInstanceRef.current = map;
      }
    } catch (err) {
      console.error("Map initialization notice:", err);
      setViewMode("list");
    }

    return () => {
      // Keep instance alive or clean up
    };
  }, [viewMode]);

  // Update Markers when filters or data change
  useEffect(() => {
    if (viewMode !== "map" || !mapInstanceRef.current || !markersLayerRef.current) return;

    const layer = markersLayerRef.current;
    layer.clearLayers();

    // 1. Add Government Hospitals (Red hospital marker)
    if (showHospitals) {
      hospitals.forEach((h) => {
        if (!h.coordinates) return;
        const hospitalIcon = L.divIcon({
          className: "custom-leaflet-marker marker-hospital",
          html: `<div class="marker-bubble hospital-bubble"><span class="m-icon">🏥</span></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        });

        const popupContent = `
          <div class="map-popup-card">
            <span class="popup-tag">${h.category}</span>
            <strong class="popup-title">${h.name}</strong>
            <p class="popup-addr">${h.city_or_village}, ${h.district}, ${h.state}</p>
            <p class="popup-meta"><strong>Phone:</strong> ${h.contact_number}</p>
            <p class="popup-meta"><strong>Blood Bank:</strong> ${h.has_blood_bank ? "✅ Attached" : "⚠️ Regional Centre Referral"}</p>
          </div>
        `;

        L.marker([h.coordinates.lat, h.coordinates.lng], { icon: hospitalIcon })
          .bindPopup(popupContent)
          .addTo(layer);
      });
    }

    // 2. Add Authorised Blood Banks (Ruby droplet marker)
    if (showBloodBanks) {
      bloodBanks.forEach((b) => {
        if (!b.coordinates) return;
        const bankIcon = L.divIcon({
          className: "custom-leaflet-marker marker-blood-bank",
          html: `<div class="marker-bubble bank-bubble"><span class="m-icon">🩸</span></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        });

        const popupContent = `
          <div class="map-popup-card">
            <span class="popup-tag bank-tag">${b.category} Blood Centre</span>
            <strong class="popup-title">${b.facility_name}</strong>
            <p class="popup-addr">${b.city}, ${b.state}</p>
            <p class="popup-meta"><strong>Phone:</strong> ${b.phone}</p>
            <p class="popup-meta"><strong>Timing:</strong> ${b.operates_24x7 ? "24/7 Service" : "Regular Hours"}</p>
          </div>
        `;

        L.marker([b.coordinates.lat, b.coordinates.lng], { icon: bankIcon })
          .bindPopup(popupContent)
          .addTo(layer);
      });
    }

    // 3. Add Donors (Approximate town/district centroid only - Privacy Safe!)
    if (showDonors) {
      donors.forEach((d) => {
        if (!d.coordinates) return;
        // Apply slight pseudo-random jitter for privacy so multiple donors in same town don't overlap exactly
        const jitterLat = (Math.sin(d.id.length * 7) * 0.015);
        const jitterLng = (Math.cos(d.id.length * 11) * 0.015);

        const donorIcon = L.divIcon({
          className: "custom-leaflet-marker marker-donor",
          html: `<div class="marker-bubble donor-bubble"><span class="m-blood">${d.blood_group}</span></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const popupContent = `
          <div class="map-popup-card">
            <span class="popup-tag donor-tag">Approx. Donor Centroid</span>
            <strong class="popup-title">${d.name} (${d.blood_group})</strong>
            <p class="popup-addr">${d.city}, ${d.district}, ${d.state}</p>
            <p class="popup-meta"><strong>Status:</strong> ${d.available ? "✅ Listed Available" : "⏳ Temporarily Inactive"}</p>
            <p class="popup-hint">Exact residential location hidden for privacy.</p>
          </div>
        `;

        L.marker([d.coordinates.lat + jitterLat, d.coordinates.lng + jitterLng], { icon: donorIcon })
          .bindPopup(popupContent)
          .addTo(layer);
      });
    }
  }, [viewMode, showHospitals, showBloodBanks, showDonors, hospitals, bloodBanks, donors]);

  // Center on focused coordinates if requested
  useEffect(() => {
    if (focusedCoordinates && mapInstanceRef.current && viewMode === "map") {
      mapInstanceRef.current.setView([focusedCoordinates.lat, focusedCoordinates.lng], 12, {
        animate: true
      });
    }
  }, [focusedCoordinates, viewMode]);

  return (
    <section className="interactive-map-section" id="map-explorer" aria-label="Geographic Explorer Map">
      <div className="section-container">
        <div className="section-heading-box">
          <div className="heading-tag">
            <MapPin size={18} className="tag-icon" />
            <span>GEOGRAPHIC HEALTHCARE VISUALIZER · ನಕ್ಷೆ</span>
          </div>
          <h2>
            Explore Healthcare Resources on Map <br />
            <em>Hospitals, Blood Banks & Approximate Donor Clusters.</em>
          </h2>
          <p className="heading-desc">
            Visualise healthcare points of care across India. Donor locations represent privacy-safe town or district centroids with no personal address exposure.
          </p>
        </div>

        {/* View mode toggle & layers control bar */}
        <div className="map-controls-toolbar">
          <div className="map-view-toggle">
            <button
              type="button"
              className={`toggle-btn ${viewMode === "map" ? "active" : ""}`}
              onClick={() => setViewMode("map")}
            >
              <Map size={15} />
              <span>Interactive Map</span>
            </button>
            <button
              type="button"
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List size={15} />
              <span>Compact List (Low Bandwidth)</span>
            </button>
          </div>

          {viewMode === "map" && (
            <div className="map-layers-filter">
              <span className="layers-label">
                <Layers size={14} /> Layers:
              </span>
              <label className="layer-checkbox">
                <input
                  type="checkbox"
                  checked={showHospitals}
                  onChange={(e) => setShowHospitals(e.target.checked)}
                />
                <span className="legend-indicator hosp-ind" />
                <span>Hospitals ({hospitals.length})</span>
              </label>

              <label className="layer-checkbox">
                <input
                  type="checkbox"
                  checked={showBloodBanks}
                  onChange={(e) => setShowBloodBanks(e.target.checked)}
                />
                <span className="legend-indicator bank-ind" />
                <span>Blood Banks ({bloodBanks.length})</span>
              </label>

              <label className="layer-checkbox">
                <input
                  type="checkbox"
                  checked={showDonors}
                  onChange={(e) => setShowDonors(e.target.checked)}
                />
                <span className="legend-indicator donor-ind" />
                <span>Donors ({donors.length})</span>
              </label>
            </div>
          )}
        </div>

        {/* Map View Container */}
        {viewMode === "map" && (
          <div className="map-wrapper-box">
            <div ref={mapContainerRef} className="leaflet-map-element" style={{ minHeight: "480px" }} />
            <div className="map-privacy-overlay">
              <ShieldCheck size={14} />
              <span>Privacy notice: Exact residential donor coordinates are NEVER collected or mapped.</span>
            </div>
          </div>
        )}

        {/* List View Fallback (Optimized for low-bandwidth rural connections) */}
        {viewMode === "list" && (
          <div className="map-list-fallback-grid">
            <div className="fallback-col">
              <h3>
                <HospitalIcon size={18} /> Government Hospitals ({hospitals.length})
              </h3>
              <div className="fallback-scroll-list">
                {hospitals.slice(0, 10).map((h) => (
                  <div key={h.id} className="fallback-item">
                    <strong>{h.name}</strong>
                    <p>{h.city_or_village}, {h.district}, {h.state}</p>
                    <span className="fallback-phone">Ph: {h.contact_number}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fallback-col">
              <h3>
                <Building2 size={18} /> Licensed Blood Banks ({bloodBanks.length})
              </h3>
              <div className="fallback-scroll-list">
                {bloodBanks.map((b) => (
                  <div key={b.id} className="fallback-item">
                    <strong>{b.facility_name}</strong>
                    <p>{b.city}, {b.state} ({b.category})</p>
                    <span className="fallback-phone">Ph: {b.phone}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fallback-col">
              <h3>
                <Droplet size={18} /> Community Donors ({donors.length})
              </h3>
              <div className="fallback-scroll-list">
                {donors.slice(0, 12).map((d) => (
                  <div key={d.id} className="fallback-item">
                    <strong>{d.name} <span className="blood-tag-mini">{d.blood_group}</span></strong>
                    <p>{d.city}, {d.district}, {d.state}</p>
                    <span className="fallback-status">{d.available ? "Available" : "Inactive"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
