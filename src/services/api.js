// 🌍 src/services/api.js

const OPEN_METEO = "https://api.open-meteo.com/v1/forecast";

// Dynamically switch between local and hosted Django API
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE = isLocal
  ? "http://127.0.0.1:8000/api/"
  : "https://climate-health-backend-fexw.onrender.com/api/";

// ---- DISTRICT COORDINATES ----
export const DISTRICT_COORDS = {
  "Arusha": { lat: -3.3869, lon: 36.6829 },
  "Dar es Salaam": { lat: -6.7924, lon: 39.2083 },
  "Dodoma": { lat: -6.1630, lon: 35.7516 },
  "Geita": { lat: -2.8738, lon: 32.2324 },
  "Iringa": { lat: -7.7667, lon: 35.7000 },
  "Kagera": { lat: -1.3320, lon: 31.8120 },
  "Katavi": { lat: -6.3678, lon: 31.1600 },
  "Kigoma": { lat: -4.8769, lon: 29.6263 },
  "Kilimanjaro": { lat: -3.0674, lon: 37.3556 },
  "Lindi": { lat: -9.9970, lon: 39.7163 },
  "Manyara": { lat: -4.2192, lon: 36.9541 },
  "Mara": { lat: -1.7611, lon: 34.1532 },
  "Mbeya": { lat: -8.9000, lon: 33.4500 },
  "Morogoro": { lat: -6.8278, lon: 37.6612 },
  "Mtwara": { lat: -10.2736, lon: 40.1820 },
  "Mwanza": { lat: -2.5167, lon: 32.9000 },
  "Njombe": { lat: -9.3333, lon: 34.7667 },
  "Pwani": { lat: -7.0000, lon: 39.0000 },
  "Rukwa": { lat: -7.9667, lon: 31.0000 },
  "Ruvuma": { lat: -10.6833, lon: 35.6500 },
  "Shinyanga": { lat: -3.6633, lon: 33.4211 },
  "Simiyu": { lat: -2.8305, lon: 34.6208 },
  "Singida": { lat: -4.8167, lon: 34.7436 },
  "Songwe": { lat: -8.9000, lon: 32.9333 },
  "Tabora": { lat: -5.0162, lon: 32.8261 },
  "Tanga": { lat: -5.0667, lon: 39.1000 },
  "Kaskazini Unguja": { lat: -5.8733, lon: 39.2454 },
  "Kusini Unguja": { lat: -6.4167, lon: 39.5500 },
  "Mjini Magharibi": { lat: -6.1667, lon: 39.2000 },
  "Kaskazini Pemba": { lat: -5.0000, lon: 39.7500 },
  "Kusini Pemba": { lat: -5.3167, lon: 39.7333 },
};

// ---- FETCH ALERTS ----
export async function listAlerts() {
  const res = await fetch(`${API_BASE}alerts/`);
  if (!res.ok) throw new Error("Failed to fetch alerts");
  return res.json();
}

// ---- SYMPTOM CHECKER ----
export async function checkSymptoms(symptoms) {
  const res = await fetch(`${API_BASE}symptoms/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms }),
  });
  if (!res.ok) throw new Error("Symptom API error");
  return res.json();
}

// ---- SUBSCRIBE ----
export async function saveSubscription({ name, district, channel }) {
  const res = await fetch(`${API_BASE}subscribe/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, district, channel }),
  });
  if (!res.ok) throw new Error("Subscription API error");
  return res.json();
}

// ---- WEATHER FORECAST ----
export async function fetchForecastForDistrict(district) {
  const coord = DISTRICT_COORDS[district] || DISTRICT_COORDS["Dar es Salaam"];
  const url = `${OPEN_METEO}?latitude=${coord.lat}&longitude=${coord.lon}` +
    `&daily=precipitation_sum,temperature_2m_max,apparent_temperature_max` +
    `&timezone=Africa%2FNairobi&forecast_days=7`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Open-Meteo fetch failed");
  const data = await res.json();
  return { district, coord, data };
}

// ---- CHAT GUIDANCE ----
export async function chatGuidance({ message, lang = "en" }) {
  const res = await fetch(`${API_BASE}chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, lang }),
  });
  if (!res.ok) throw new Error("Failed to fetch chat guidance");
  return res.json();
}
