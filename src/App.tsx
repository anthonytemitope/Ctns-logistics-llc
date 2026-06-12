/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Fleet from "./components/Fleet";
import WhyChooseUs from "./components/WhyChooseUs";
import BookingQuote from "./components/BookingQuote";
import ClientHub from "./components/ClientHub";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Booking, Quote } from "./types";

export default function App() {
  // Sync state with localstorage so the user's bookings and quotes persist across sessions!
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const cached = localStorage.getItem("ctns_bookings_v1");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Failed to parse cached bookings:", e);
      }
    }
    return [];
  });

  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const cached = localStorage.getItem("ctns_quotes_v1");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Failed to parse cached quotes:", e);
      }
    }
    return [];
  });

  // Track state transfers between components
  const [searchedTrackingCode, setSearchedTrackingCode] = useState("");
  const [preSelectedService, setPreSelectedService] = useState("");
  const [preSelectedVehicle, setPreSelectedVehicle] = useState("");
  const [pendingNotifyCount, setPendingNotifyCount] = useState(0);

  // Synchronize dynamic lists with local storage
  useEffect(() => {
    localStorage.setItem("ctns_bookings_v1", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("ctns_quotes_v1", JSON.stringify(quotes));
  }, [quotes]);

  const handleTrackCodeSearch = (code: string) => {
    setSearchedTrackingCode(code);
    // Smooth scroll down to the client tracking panel
    setTimeout(() => {
      const element = document.getElementById("client-hub-section");
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setPreSelectedService(serviceTitle);
    setPreSelectedVehicle(""); // clear vehicle if service was clicked
    scrollToBookingSection();
  };

  const handleVehicleSelect = (vehicleType: string) => {
    setPreSelectedVehicle(vehicleType);
    setPreSelectedService(""); // clear service if vehicle was clicked
    scrollToBookingSection();
  };

  const scrollToBookingSection = () => {
    setTimeout(() => {
      const element = document.getElementById("booking");
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  const handleAddNewBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setPendingNotifyCount((prev) => prev + 1);
    // Clear selections once booked
    setPreSelectedService("");
    setPreSelectedVehicle("");
  };

  const handleAddNewQuote = (newQuote: Quote) => {
    setQuotes((prev) => [newQuote, ...prev]);
    setPendingNotifyCount((prev) => prev + 1);
    // Clear selections once quoted
    setPreSelectedService("");
    setPreSelectedVehicle("");
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" as const } : b))
    );
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your local booking history logs? This cannot be undone.")) {
      setBookings([]);
      setQuotes([]);
      setPendingNotifyCount(0);
      localStorage.removeItem("ctns_bookings_v1");
      localStorage.removeItem("ctns_quotes_v1");
    }
  };

  const handleToolbarClientHubTrigger = () => {
    setPendingNotifyCount(0); // clear notifications count when they open client hub
    const element = document.getElementById("client-hub-section");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-[#FF6B00] selection:text-white">
      {/* Dynamic Header Toolbar & Sidebar Navigation */}
      <Navbar 
        onQuoteClick={() => handleServiceSelect("")} 
        onBookingClick={() => handleVehicleSelect("")} 
        onClientHubClick={handleToolbarClientHubTrigger}
        pendingCount={pendingNotifyCount}
      />

      <main className="flex-1">
        
        {/* Hero Segment */}
        <Hero 
          onQuoteClick={() => handleServiceSelect("")} 
          onBookingClick={() => handleVehicleSelect("")} 
          onTrackSubmit={handleTrackCodeSearch} 
        />

        {/* Corporate About Section */}
        <About />

        {/* Services Showcase Section */}
        <Services onSelectService={handleServiceSelect} />

        {/* Physical Fleet Section */}
        <Fleet onVehicleSelect={handleVehicleSelect} />

        {/* Dynamic Client Hub (Shipment Tracker & Persistent Bookings/Quotes Database) */}
        <ClientHub 
          bookings={bookings} 
          quotes={quotes}
          onCancelBooking={handleCancelBooking}
          onClearHistory={handleClearHistory}
          searchedCode={searchedTrackingCode}
        />

        {/* Value Proposition Points & Counting Statistics */}
        <WhyChooseUs />

        {/* Interactive Booking Terminal and Live Rate Estimator */}
        <BookingQuote 
          onAddBooking={handleAddNewBooking}
          onAddQuote={handleAddNewQuote}
          preSelectedService={preSelectedService}
          preSelectedVehicle={preSelectedVehicle}
        />

        {/* Stakeholder Testimonials */}
        <Testimonials />

        {/* Dynamic Contact Grid & SVG Maps Coordinate Box */}
        <Contact />

      </main>

      {/* Corporate footer */}
      <Footer />
    </div>
  );
}
