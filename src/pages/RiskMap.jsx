import React, { useEffect, useState } from "react";

const RiskMap = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch data from backend (Render)
  useEffect(() => {
    fetch("https://climate-health-backend-fexw.onrender.com/api/alerts/") // <-- Correct endpoint
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load alerts");
        return res.json();
      })
      .then((data) => {
        setAlerts(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>🌦️ Tanzania Risk Map</h1>
      <p style={{ textAlign: "center" }}>
        Monitoring regional hazards affecting climate and public health.
      </p>

      {loading && <p>Loading latest risk data...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {alerts.map((a, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "1rem",
              background: "#f9f9f9",
            }}
          >
            <h3>{a.region || a.district || "Unknown Region"}</h3>
            <p>
              <strong>Hazard:</strong> {a.hazard} <br />
              <strong>Risk Level:</strong> {a.risk} <br />
              <strong>Date:</strong> {a.date_created || a.date || "N/A"} <br />
              <em>{a.advice}</em>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskMap;
