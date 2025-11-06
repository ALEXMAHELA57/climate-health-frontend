import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

import Home from "./pages/Home.jsx";
import Alerts from "./pages/Alerts.jsx";
import SymptomChecker from "./pages/SymptomChecker.jsx";
import Education from "./pages/Education.jsx";
import Guidance from "./pages/Guidance.jsx";
import Clinics from "./pages/Clinics.jsx";
import Youth from "./pages/Youth.jsx";
import RiskMap from "./pages/RiskMap.jsx";
import Subscribe from "./pages/Subscribe.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar on all pages */}
      <NavBar />

      {/* Page Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/risk" element={<RiskMap />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/symptoms" element={<SymptomChecker />} />
          <Route path="/education" element={<Education />} />
          <Route path="/guidance" element={<Guidance />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/youth" element={<Youth />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/admin" element={<Admin />} />

          {/* Fallback for 404 pages */}
          <Route
            path="*"
            element={
              <div className="container mx-auto p-6 text-center">
                <div className="bg-white shadow-md rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-red-600">404</h2>
                  <p className="text-gray-600">Page not found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-4 mt-6">
        © {new Date().getFullYear()} <b>ClimHealth AI</b> • Predict • Prevent • Protect
      </footer>
    </div>
  );
}
