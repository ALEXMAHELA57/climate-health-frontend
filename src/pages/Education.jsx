// src/services/api.js

// 🌍 Base API URL — change this when hosting online
const API_BASE = "https://climate-health-backend-fexw.onrender.com/api/";



// 🟩 1. Fetch Climate & Health Alerts
export async function listAlerts(district = "Dar es Salaam") {
  try {
    const res = await fetch(`${API_BASE}alerts/?district=${encodeURIComponent(district)}`);
    if (!res.ok) throw new Error("Failed to fetch alerts");
    return await res.json();
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return { error: "Could not load alerts." };
  }
}

// 🧠 2. AI Symptom Checker
export async function checkSymptoms({ symptoms }) {
  try {
    const res = await fetch(`${API_BASE}symptoms/?symptoms=${encodeURIComponent(symptoms)}`);
    if (!res.ok) throw new Error("Failed to fetch symptom analysis");
    return await res.json();
  } catch (error) {
    console.error("Error checking symptoms:", error);
    return { error: "Could not analyze symptoms." };
  }
}

// 🧭 3. Chat Guidance (AI Advice)
export async function chatGuidance(message) {
  try {
    const res = await fetch(`${API_BASE}guidance/?message=${encodeURIComponent(message)}`);
    if (!res.ok) throw new Error("Failed to fetch AI guidance");
    return await res.json();
  } catch (error) {
    console.error("Error fetching guidance:", error);
    return { error: "Could not get guidance." };
  }
}

// 🏥 4. Fetch Health Clinics
export async function fetchClinics() {
  try {
    const res = await fetch(`${API_BASE}clinics/`);
    if (!res.ok) throw new Error("Failed to fetch clinics");
    return await res.json();
  } catch (error) {
    console.error("Error fetching clinics:", error);
    return { error: "Could not load clinics." };
  }
}

// 📩 5. Subscribe User for Alerts
export async function saveSubscription({ name, channel, district }) {
  try {
    const res = await fetch(
      `${API_BASE}subscribe/?name=${encodeURIComponent(name)}&channel=${channel}&district=${district}`
    );
    if (!res.ok) throw new Error("Failed to save subscription");
    return await res.json();
  } catch (error) {
    console.error("Error saving subscription:", error);
    return { error: "Subscription failed." };
  }
}

// 🧒 6. Fetch Youth Data or Education Content
export async function fetchEducationContent() {
  try {
    const res = await fetch(`${API_BASE}education/`);
    if (!res.ok) throw new Error("Failed to fetch education content");
    return await res.json();
  } catch (error) {
    console.error("Error fetching education content:", error);
    return { error: "Could not load education data." };
  }
}

// 📊 7. Fetch Risk Map Data (Regions)
export async function fetchRiskMap(region = "Tanzania") {
  try {
    const res = await fetch(`${API_BASE}riskmap/?region=${encodeURIComponent(region)}`);
    if (!res.ok) throw new Error("Failed to fetch risk map data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching risk map:", error);
    return { error: "Could not load risk map data." };
  }
}

function Education() {
  return (
    <div className="education-page">
      <h1>Climate & Public Health Education</h1>
      <p>
        Learn how environmental factors influence disease spread, and how to
        protect communities through awareness and action.
      </p>
    </div>
  );
}

export default Education; // ✅ this line must be here
