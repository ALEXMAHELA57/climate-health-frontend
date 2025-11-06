import React, { useState } from "react";

const Subscribe = () => {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [channel, setChannel] = useState("email");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(
  `https://climate-health-backend-fexw.onrender.com/api/subscribe/?name=${encodeURIComponent(
    name
  )}&channel=${encodeURIComponent(channel)}&district=${encodeURIComponent(
    district
  )}&contact=${encodeURIComponent(contact)}`
);


      if (!response.ok) throw new Error("Failed to subscribe");

      const data = await response.json();
      setStatus(`✅ ${data.message}`);
    } catch (err) {
      setStatus("❌ Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "12px",
        background: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>📢 Subscribe for Alerts</h1>
      <p style={{ textAlign: "center", marginBottom: "1rem" }}>
        Get notified about upcoming climate and health alerts for your region.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Mahela"
          required
          style={styles.input}
        />

        <label>District:</label>
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          placeholder="e.g. Morogoro"
          required
          style={styles.input}
        />

        <label>Preferred Channel:</label>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          style={styles.input}
        >
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="sms">SMS</option>
        </select>

        <label>Contact Info:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="e.g. alexmahela@gmail.com or +2557..."
          required
          style={styles.input}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: loading ? "#888" : "#27ae60",
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      {status && <p style={{ textAlign: "center", marginTop: "1rem" }}>{status}</p>}
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Subscribe;
