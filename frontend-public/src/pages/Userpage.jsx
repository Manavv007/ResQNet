import { useState } from "react";
import { API, apiFetch } from "../api";


const SEV_COLOR = { critical: "var(--accent)", high: "var(--coral)", medium: "var(--warning)", low: "var(--success)" };

export default function UserPage({ view, resetKey }) {
    return view === "track" ? <TrackReport /> : <ReportForm key={`report-${resetKey}`} />;
}

function ReportForm() {
    const [form, setForm] = useState({
        disaster_type: "", location: "", latitude: "", longitude: "",
        severity: "", description: "", reporter_name: "", reporter_phone: ""
    });
    const [image, setImage] = useState(null);
    const [submitting, setSub] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [locLoading, setLocLoading] = useState(false);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const getLocation = () => {
        if (!navigator.geolocation) { setError("Geolocation not supported"); return; }
        setLocLoading(true);
        navigator.geolocation.getCurrentPosition(
            pos => {
                set("latitude", pos.coords.latitude.toFixed(6));
                set("longitude", pos.coords.longitude.toFixed(6));
                setLocLoading(false);
            },
            () => { setError("Could not get location"); setLocLoading(false); }
        );
    };

    const handleSubmit = async () => {
        if (!form.disaster_type || !form.location || !form.severity || !form.description) {
            setError("Please fill all required fields."); return;
        }

        // Mobile number validation (+91 is optional, but core number must be 10 digits)
        if (form.reporter_phone) {
            const clean = form.reporter_phone.replace(/\D/g, ""); // strip non-digits
            // Accept 10 digits OR 12 digits if starting with 91
            const isValid = clean.length === 10 || (clean.length === 12 && clean.startsWith("91"));
            if (!isValid) {
                setError("Please enter a valid 10-digit mobile number.");
                return;
            }
        }

        setSub(true); setError("");
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
        if (image) fd.append("image", image);
        try {
            const res = await fetch(`${API}/api/reports`, { method: "POST", body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Submission failed");
            setResult(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setSub(false);
        }
    };

    if (result) return (
        <div className="form-page">
            <div className="success-banner">
                <div style={{ marginBottom: 8, fontWeight: 700, fontSize: '1.2rem' }}>REPORT SUBMITTED</div>
                <div>REPORT ID: <strong style={{ fontFamily: "var(--fm)", fontSize: "1.2rem", letterSpacing: '0.05em' }}>{result.report_id}</strong></div>
                <div style={{ marginTop: 12, fontSize: "0.95rem", lineHeight: 1.5 }}>
                    {result.assigned_team
                        ? `Unit ${result.assigned_team} has been auto-dispatched to your coordinates.`
                        : "Your report is in the queue. Rescue units will be assigned upon verification."}
                </div>
                <div style={{ marginTop: 12, fontSize: "0.85rem", color: "var(--muted)", borderTop: '1px solid var(--success)', paddingTop: 12 }}>
                    Secure this ID to track real-time status updates in the tracking portal.
                </div>
                
                <button 
                    onClick={() => {
                        setResult(null);
                        setForm({
                            disaster_type: "", location: "", latitude: "", longitude: "",
                            severity: "", description: "", reporter_name: "", reporter_phone: ""
                        });
                        setImage(null);
                        setError("");
                        window.scrollTo(0, 0); // scroll to top when resetting
                    }}
                    style={{ marginTop: 24, background: "var(--primary)", border: "none", color: "white", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontSize: "0.95rem", fontWeight: 600, display: "block", marginLeft: "auto", marginRight: "auto" }}
                >
                    + Submit Another Report
                </button>
            </div>
        </div>
    );

    return (
        <div className="form-page">
            <div className="form-heading">Report Emergency</div>
            <p className="form-sub">Broadcast live distress signal to Authority Command Centre.</p>
            <div className="card">
                <div className="form-grid">

                    <div className="form-group">
                        <label>Event Type</label>
                        <select value={form.disaster_type} onChange={e => set("disaster_type", e.target.value)}>
                            <option value="">Select type...</option>
                            <option value="flood">Flood</option>
                            <option value="fire">Fire</option>
                            <option value="earthquake">Earthquake</option>
                            <option value="cyclone">Cyclone</option>
                            <option value="landslide">Landslide</option>
                            <option value="building_collapse">Building Collapse</option>
                            <option value="chemical">Chemical Hazard</option>
                            <option value="other">Other Incident</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Severity Level</label>
                        <select value={form.severity} onChange={e => set("severity", e.target.value)}
                            style={{ borderColor: form.severity ? SEV_COLOR[form.severity] : "" }}>
                            <option value="">Select priority...</option>
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                            <option value="critical">Critical - Flash Response</option>
                        </select>
                    </div>

                    <div className="form-group full">
                        <label>Location / Address *</label>
                        <input placeholder="e.g. Sector 12, Gandhi Nagar, Ahmedabad"
                            value={form.location} onChange={e => set("location", e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Latitude</label>
                        <input type="number" placeholder="Auto-fill →"
                            value={form.latitude} onChange={e => set("latitude", e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Longitude</label>
                        <div style={{ display: "flex", gap: 6 }}>
                            <input type="number" placeholder="Auto-fill →"
                                value={form.longitude} onChange={e => set("longitude", e.target.value)} />
                            <button type="button" onClick={getLocation} disabled={locLoading}
                                style={{ background: "var(--info)", border: "none", color: "white", padding: "0 12px", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap", fontSize: "0.8rem", fontWeight: 700 }}>
                                {locLoading ? "..." : "GPS"}
                            </button>
                        </div>
                    </div>

                    <div className="form-group full">
                        <label>Description *</label>
                        <textarea placeholder="Describe the situation — number of people, hazards, access routes..."
                            value={form.description} onChange={e => set("description", e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Your Name</label>
                        <input placeholder="Reporter name"
                            value={form.reporter_name} onChange={e => set("reporter_name", e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input placeholder="+91 XXXXXXXXXX"
                            value={form.reporter_phone} 
                            onChange={e => {
                                const val = e.target.value;
                                set("reporter_phone", val);
                                
                                if (val) {
                                    const clean = val.replace(/\D/g, "");
                                    const isValid = clean.length === 10 || (clean.length === 12 && clean.startsWith("91"));
                                    if (!isValid) {
                                        setPhoneError("Please enter a correct 10-digit phone number");
                                    } else {
                                        setPhoneError("");
                                    }
                                } else {
                                    setPhoneError("");
                                }
                            }} 
                            style={{ borderColor: phoneError ? "var(--accent)" : "" }}
                        />
                        {phoneError && <div style={{ color: "var(--accent)", fontSize: "0.75rem", marginTop: 4, fontWeight: 600 }}>{phoneError}</div>}
                    </div>

                    <div className="form-group full">
                        <label>Upload Image / Video (optional)</label>
                        <input type="file" accept="image/*,video/*"
                            onChange={e => setImage(e.target.files[0])} />
                    </div>
                </div>

                {form.severity === "critical" && (
                    <div className="info-banner" style={{ marginTop: "1rem" }}>
                        CRITICAL SEVERITY: Sector coordinates provided will trigger <strong>automatic unit dispatch</strong> protocol.
                    </div>
                )}

                {error && <div className="error-banner">{error}</div>}
                <button className="submit-btn" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "PROCESSING..." : "SUBMIT EMERGENCY SIGNAL"}
                </button>
            </div>
        </div>
    );
}

function TrackReport() {
    const [reportId, setReportId] = useState("");
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const track = async () => {
        if (!reportId.trim()) return;
        setLoading(true); setError(""); setReport(null);
        try {
            const data = await apiFetch(`/api/reports/${reportId.trim().toUpperCase()}`);
            setReport(data);
        } catch (e) {
            setError("Authentication failed. Verified Report ID not found.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = iso => new Date(iso + "Z").toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
    const STA = { pending: "Pending Verification", assigned: "Unit Assigned", active: "In Progress", resolved: "Resolved" };

    return (
        <div className="form-page">
            <div className="form-heading">Track Report</div>
            <p className="form-sub">Monitor live operational status of your incident.</p>

            <div className="track-box">
                <input placeholder="Enter Report ID (e.g. A1B2C3D4)"
                    value={reportId} onChange={e => setReportId(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && track()} />
                <button onClick={track} disabled={loading}>
                    {loading ? "..." : "Track"}
                </button>
            </div>

            {error && <div className="error-banner">{error}</div>}

            {report && (
                <div className="track-result">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ fontFamily: "var(--fd)", fontSize: "1.1rem", fontWeight: 700, textTransform: 'uppercase' }}>
                            {report.disaster_type?.replace("_", " ")}
                        </div>
                        <span className={`status-badge ${report.status}`}>{STA[report.status] || report.status}</span>
                    </div>
                    {[
                        ["Report ID", report.id],
                        ["Severity", report.severity],
                        ["Location", report.location],
                        ["Description", report.description],
                        ["Reporter", report.reporter_name],
                        ["Timestamp", formatDate(report.created_at)],
                        ...(report.assigned_team_name ? [["Assigned Unit", report.assigned_team_name]] : []),
                        ...(report.assigned_at ? [["Dispatch Time", formatDate(report.assigned_at)]] : []),
                    ].map(([k, v]) => (
                        <div key={k} className="track-field">
                            <strong>{k}</strong><span>{v}</span>
                        </div>
                    ))}
                    {report.image_url && (
                        <div style={{ marginTop: 12 }}>
                            <img src={report.image_url.replace("disaster-response-uploads.s3.ap-south-1.amazonaws.com", "d2lbf1bpfshpl4.cloudfront.net")} alt="Disaster"
                                style={{ width: "100%", borderRadius: 8, maxHeight: 300, objectFit: "cover" }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}