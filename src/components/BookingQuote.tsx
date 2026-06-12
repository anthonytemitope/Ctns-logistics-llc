/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Calculator, 
  ClipboardCheck, 
  Truck, 
  Send, 
  CheckCircle, 
  Ruler, 
  Scale, 
  FileText, 
  Phone, 
  AlertCircle,
  Copy,
  TrendingDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Booking, Quote } from "../types";

interface BookingQuoteProps {
  onAddBooking: (booking: Booking) => void;
  onAddQuote: (quote: Quote) => void;
  preSelectedService: string;
  preSelectedVehicle: string;
}

export default function BookingQuote({ 
  onAddBooking, 
  onAddQuote, 
  preSelectedService, 
  preSelectedVehicle 
}: BookingQuoteProps) {
  const [activeTab, setActiveTab] = useState<"estimator" | "quote" | "booking">("estimator");
  
  // Forms states
  const [isBooked, setIsBooked] = useState(false);
  const [isQuoted, setIsQuoted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submittedCode, setSubmittedCode] = useState("");

  // Distance estimator state
  const [estDistance, setEstDistance] = useState("45");
  const [estWeight, setEstWeight] = useState("500");
  const [estVehicle, setEstVehicle] = useState("van");
  const [estCostMin, setEstCostMin] = useState(120);
  const [estCostMax, setEstCostMax] = useState(195);

  // Quote Form fields
  const [quoteName, setQuoteName] = useState("");
  const [quoteCompany, setQuoteCompany] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteDesc, setQuoteDesc] = useState("");
  const [quoteVehicle, setQuoteVehicle] = useState("Cargo Van (Expedited)");

  // Booking Form fields
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookPickup, setBookPickup] = useState("");
  const [bookDelivery, setBookDelivery] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookVehicle, setBookVehicle] = useState("Cargo Van (Expedited)");
  const [bookDetails, setBookDetails] = useState("");

  // Handle service pre-selection from buttons click
  useEffect(() => {
    if (preSelectedService) {
      setActiveTab("booking");
      setBookDetails(`Request associated with: ${preSelectedService}. `);
      scrollToForm();
    }
  }, [preSelectedService]);

  // Handle vehicle pre-selection from buttons click
  useEffect(() => {
    if (preSelectedVehicle) {
      setActiveTab("booking");
      setBookVehicle(preSelectedVehicle);
      scrollToForm();
    }
  }, [preSelectedVehicle]);

  // Recalculate estimator ranges when changes happen
  useEffect(() => {
    const distNum = parseFloat(estDistance) || 10;
    const weightNum = parseFloat(estWeight) || 50;
    let baseRate = estVehicle === "box" ? 150 : 75;
    let ratePerMile = estVehicle === "box" ? 2.85 : 1.75;
    let weightSurcharge = weightNum > 2000 ? 120 : weightNum > 500 ? 45 : 0;

    const rawCost = baseRate + (distNum * ratePerMile) + weightSurcharge;
    setEstCostMin(Math.floor(rawCost * 0.9));
    setEstCostMax(Math.floor(rawCost * 1.15));
  }, [estDistance, estWeight, estVehicle]);

  const scrollToForm = () => {
    const element = document.getElementById("booking-terminal");
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleApplyCalculatedQuote = () => {
    setQuoteDesc(`Estimated Route: ${estDistance} miles, Payload Weight: ${estWeight} lbs. Calculated Estimate Range: $${estCostMin} - $${estCostMax}.`);
    setQuoteVehicle(estVehicle === "box" ? "Box Truck (High Capacity)" : "Cargo Van (Expedited)");
    setActiveTab("quote");
  };

  const handleApplyCalculatedBooking = () => {
    setBookDetails(`Estimated Route: ${estDistance} miles, Payload Weight: ${estWeight} lbs. Estimated Cost Range: $${estCostMin} - $${estCostMax}. `);
    setBookVehicle(estVehicle === "box" ? "Box Truck (High Capacity)" : "Cargo Van (Expedited)");
    setActiveTab("booking");
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote: Quote = {
      id: "Q-" + Math.floor(1000 + Math.random() * 9000),
      name: quoteName,
      companyName: quoteCompany || "Individual Ship",
      email: quoteEmail,
      phone: quotePhone,
      shipmentDescription: quoteDesc,
      vehicleType: quoteVehicle,
      estimatedDistance: parseFloat(estDistance) || undefined,
      estimatedCost: Math.floor((estCostMin + estCostMax) / 2),
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    onAddQuote(newQuote);
    setSubmittedCode(newQuote.id);
    setIsQuoted(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trackCode = "CTNS-" + Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      id: "B-" + Math.floor(1000 + Math.random() * 9000),
      name: bookName,
      email: bookEmail,
      phone: bookPhone,
      pickupLocation: bookPickup,
      deliveryLocation: bookDelivery,
      deliveryDate: bookDate,
      vehicleType: bookVehicle,
      shipmentDetails: bookDetails,
      status: "Confirmed",
      trackingNumber: trackCode,
      createdAt: new Date().toISOString(),
      estimatedCost: Math.floor((estCostMin + estCostMax) / 2)
    };
    onAddBooking(newBooking);
    setSubmittedCode(trackCode);
    setIsBooked(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(submittedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetForms = () => {
    // Reset Book
    setBookName("");
    setBookEmail("");
    setBookPhone("");
    setBookPickup("");
    setBookDelivery("");
    setBookDate("");
    setBookDetails("");
    setIsBooked(false);

    // Reset Quote
    setQuoteName("");
    setQuoteCompany("");
    setQuoteEmail("");
    setQuotePhone("");
    setQuoteDesc("");
    setIsQuoted(false);

    setActiveTab("estimator");
  };

  return (
    <section id="booking" className="py-20 md:py-28 bg-slate-50 font-sans scroll-mt-10">
      <div id="booking-terminal" className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 bg-logistics-blue/5 py-1.5 px-3.5 rounded-full border border-logistics-blue/5">
            <span className="w-1.5 h-1.5 bg-logistics-orange rounded-full" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
              GET STARTED
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3.5xl sm:text-4xl text-logistics-blue tracking-tight">
            Seamless Quote & Booking Engine
          </h2>
          <p className="text-slate-500 text-sm md:text-md leading-relaxed">
            Estimate shipment fares instantly, submit formal business inquiries, or request immediate express dispatch with our secure online terminal.
          </p>
        </div>

        {/* Tab Selection Terminal Wrapper */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Tabs header */}
          <div className="grid grid-cols-3 bg-slate-100/90 border-b border-rose-100/20 text-slate-700">
            <button
              onClick={() => { if (!isBooked && !isQuoted) setActiveTab("estimator"); }}
              disabled={isBooked || isQuoted}
              className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold tracking-tight transition-all uppercase flex items-center justify-center space-x-2 cursor-pointer ${
                activeTab === "estimator" ? "bg-white text-logistics-blue border-b-2 border-logistics-orange" : "text-slate-500 hover:text-logistics-blue opacity-85 hover:bg-white/40"
              } ${(isBooked || isQuoted) ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <Calculator className="w-4 h-4 shrink-0 text-logistics-orange" />
              <span className="hidden sm:inline">Route Estimator</span>
              <span className="sm:hidden">Estimate</span>
            </button>
            <button
              onClick={() => { if (!isBooked && !isQuoted) setActiveTab("quote"); }}
              disabled={isBooked || isQuoted}
              className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold tracking-tight transition-all uppercase flex items-center justify-center space-x-2 cursor-pointer ${
                activeTab === "quote" ? "bg-white text-logistics-blue border-b-2 border-logistics-orange" : "text-slate-500 hover:text-logistics-blue opacity-85 hover:bg-white/40"
              } ${(isBooked || isQuoted) ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <FileText className="w-4 h-4 shrink-0 text-logistics-orange" />
              <span className="hidden sm:inline">Request Free Quote</span>
              <span className="sm:hidden">Free Quote</span>
            </button>
            <button
              onClick={() => { if (!isBooked && !isQuoted) setActiveTab("booking"); }}
              disabled={isBooked || isQuoted}
              className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold tracking-tight transition-all uppercase flex items-center justify-center space-x-2 cursor-pointer ${
                activeTab === "booking" ? "bg-white text-logistics-blue border-b-2 border-logistics-orange" : "text-slate-500 hover:text-logistics-blue opacity-85 hover:bg-white/40"
              } ${(isBooked || isQuoted) ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <ClipboardCheck className="w-4 h-4 shrink-0 text-logistics-orange" />
              <span className="hidden sm:inline">Book Delivery</span>
              <span className="sm:hidden">Book Now</span>
            </button>
          </div>

          {/* Form Area with AnimatePresence */}
          <div className="p-6 sm:p-10 text-left min-h-[460px] flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              
              {/* ESTIMATOR WINDOW */}
              {activeTab === "estimator" && !isBooked && !isQuoted && (
                <motion.div
                  key="estimator-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Estimator Configuration form (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <h3 className="font-display font-bold text-xl text-logistics-blue">
                      Instant Local Rate Calculator
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      Select transport criteria below. Our algorithms calculate baseline freight fare ranges immediately, giving transparent insight.
                    </p>

                    <div className="space-y-4">
                      {/* Vehicle selection */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-slate-400 uppercase tracking-wide">Select Cargo vehicle</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setEstVehicle("van")}
                            className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                              estVehicle === "van" ? "bg-logistics-blue text-white border-logistics-blue" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <Truck className="w-4 h-4 shrink-0" />
                            <span>Cargo Van</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEstVehicle("box")}
                            className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                              estVehicle === "box" ? "bg-logistics-blue text-white border-logistics-blue" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <Truck className="w-4 h-4 shrink-0" />
                            <span>Box Truck (Heavy)</span>
                          </button>
                        </div>
                      </div>

                      {/* Distance Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-400 uppercase">ESTIMATED TRANSIT DISTANCE</span>
                          <span className="text-logistics-blue font-bold">{estDistance} Miles</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="500"
                          step="5"
                          value={estDistance}
                          onChange={(e) => setEstDistance(e.target.value)}
                          className="w-full accent-logistics-orange bg-slate-100 h-2 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Weight Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-400 uppercase">ESTIMATED SHIPMENT WEIGHT</span>
                          <span className="text-logistics-blue font-bold">{estWeight} Lbs</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="9500"
                          step="50"
                          value={estWeight}
                          onChange={(e) => setEstWeight(e.target.value)}
                          className="w-full accent-logistics-orange bg-slate-100 h-2 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Calculator Display (5 cols) */}
                  <div className="lg:col-span-5 bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-6 text-center shadow-inner">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Estimated price range</span>
                      <p className="text-4xl md:text-5xl font-display font-extrabold text-logistics-blue">
                        ${estCostMin} - ${estCostMax}
                      </p>
                      <p className="text-xs text-[#FF6B00] font-semibold mt-1">
                        USD Rate * (Subject to final verification)
                      </p>
                    </div>

                    <div className="text-xs text-slate-500 leading-relaxed text-left border-y border-slate-200/60 py-4.5 space-y-2 font-sans">
                      <div className="flex justify-between">
                        <span>Vehicle Class:</span>
                        <span className="font-semibold text-slate-900 capitalize">{estVehicle} Delivery</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Calculated Distance:</span>
                        <span className="font-semibold text-slate-900">{estDistance} mil</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Payload:</span>
                        <span className="font-semibold text-slate-900">{estWeight} lbs</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={handleApplyCalculatedQuote}
                        className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-extrabold py-3 px-4 rounded-xl border border-slate-200 transition-all cursor-pointer text-center"
                      >
                        Request Free Quote
                      </button>
                      <button
                        onClick={handleApplyCalculatedBooking}
                        className="bg-logistics-orange hover:bg-logistics-orange-hover text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer text-center"
                      >
                        Book Dispatch
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* QUOTE REQUEST FORM */}
              {activeTab === "quote" && !isQuoted && (
                <motion.form
                  key="quote-tab"
                  onSubmit={handleQuoteSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 border-b border-slate-100 pb-4 mb-6">
                    <div className="p-2 bg-logistics-orange/10 rounded-lg text-logistics-orange">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-logistics-blue">Request A Free Custom Quote</h3>
                      <p className="text-xs text-slate-500">Corporate or individual volume dispatch options</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-normal">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Contact Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={quoteName}
                        onChange={(e) => setQuoteName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Company Name</label>
                      <input
                        type="text"
                        placeholder="CTNS Logistics Inc (Leave blank for Individual)"
                        value={quoteCompany}
                        onChange={(e) => setQuoteCompany(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="client@company.com"
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 012-3456"
                        value={quotePhone}
                        onChange={(e) => setQuotePhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Vehicle Selection */}
                    <div className="md:col-span-1 space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Required Vehicle</label>
                      <div className="relative">
                        <select
                          value={quoteVehicle}
                          onChange={(e) => setQuoteVehicle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-sm text-slate-800 transition-all cursor-pointer appearance-none font-sans"
                        >
                          <option value="Cargo Van (Expedited)">Cargo Van (Expedited)</option>
                          <option value="Box Truck (High Capacity)">Box Truck (High Capacity)</option>
                          <option value="Unsure / Let Dispatch Decide">Unsure / Let Dispatch Decide</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Shipment Description *</label>
                      <input
                        type="text"
                        required
                        placeholder="Pallets of paper goods, weight, fragile items..."
                        value={quoteDesc}
                        onChange={(e) => setQuoteDesc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4 text-logistics-orange shrink-0" />
                      <span>Immediate quote estimate generated automatically</span>
                    </span>
                    <button
                      type="submit"
                      className="bg-[#FF6B00] hover:bg-[#e65a00] text-white text-sm font-bold min-w-[180px] py-4 px-8 rounded-xl transition-all shadow-lg shadow-[#FF6B00]/30 hover:shadow-xl hover:shadow-[#FF6B00]/40 transform active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <span>GET MY QUOTE</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* BOOKING NOW FORM */}
              {activeTab === "booking" && !isBooked && (
                <motion.form
                  key="booking-tab"
                  onSubmit={handleBookingSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="flex items-center space-x-3 border-b border-slate-100 pb-4 mb-5">
                    <div className="p-2 bg-logistics-blue/10 rounded-lg text-logistics-blue">
                      <ClipboardCheck className="w-5 h-5 text-logistics-orange" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-logistics-blue">Secure Delivery Booking Form</h3>
                      <p className="text-xs text-slate-500">Dispatch cargo with immediate tracking integration</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans leading-normal">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Contact Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-xs sm:text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="client@mail.com"
                        value={bookEmail}
                        onChange={(e) => setBookEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-xs sm:text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 012-3456"
                        value={bookPhone}
                        onChange={(e) => setBookPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-xs sm:text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pickup Location */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Pickup Location Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="123 Warehouse St, City, State ZIP"
                        value={bookPickup}
                        onChange={(e) => setBookPickup(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-xs sm:text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>

                    {/* Delivery Location */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Delivery Location Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="456 Consumer Ave, Destination, State ZIP"
                        value={bookDelivery}
                        onChange={(e) => setBookDelivery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-xs sm:text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Delivery Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Target Delivery Date *</label>
                      <input
                        type="date"
                        required
                        value={bookDate}
                        onChange={(e) => setBookDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-xs sm:text-sm text-slate-800 transition-all cursor-pointer text-slate-600 font-sans"
                      />
                    </div>

                    {/* Vehicle Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Vehicle Type *</label>
                      <div className="relative">
                        <select
                          value={bookVehicle}
                          onChange={(e) => setBookVehicle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-xs sm:text-sm text-slate-800 transition-all cursor-pointer appearance-none font-sans"
                        >
                          <option value="Cargo Van (Expedited)">Cargo Van (Expedited)</option>
                          <option value="Box Truck (High Capacity)">Box Truck (High Capacity)</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
                      </div>
                    </div>

                    {/* Shipment Details */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Shipment Details & Instructions *</label>
                      <input
                        type="text"
                        required
                        placeholder="Pallet count, dimensions, weight, loading code..."
                        value={bookDetails}
                        onChange={(e) => setBookDetails(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 rounded-xl p-3 text-xs sm:text-sm text-slate-800 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center space-x-1.5 text-slate-500 text-left">
                      <AlertCircle className="w-4 h-4 text-logistics-orange shrink-0" />
                      <span>Saves instant route simulation for active tracking in Client Hub</span>
                    </span>
                    <button
                      type="submit"
                      className="bg-[#FF6B00] hover:bg-[#e65a00] text-white text-sm font-bold min-w-[200px] py-4 px-8 rounded-xl transition-all shadow-lg shadow-[#FF6B00]/30 hover:shadow-xl hover:shadow-[#FF6B00]/40 transform active:scale-95 cursor-pointer flex items-center space-x-2 w-full sm:w-auto justify-center"
                    >
                      <span>BOOK DELIVERY NOW</span>
                      <Truck className="w-4 h-4" />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* SUCCESS / RESERVATION RECEIPT PANEL */}
              {(isBooked || isQuoted) && (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center max-w-lg mx-auto py-4"
                >
                  <div className="inline-flex p-3 bg-green-50 text-green-600 rounded-full border border-green-100">
                    <CheckCircle className="w-12 h-12" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-2xl text-slate-900">
                      {isBooked ? "Delivery Request Submitted!" : "Quote Requested Successfully!"}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      {isBooked 
                        ? "We have scheduled your freight. We've compiled your tracking log, saved it to the tracking hub."
                        : "A CTNS Logistics specialist will evaluate your payload and deliver custom pricing files to your mail."
                      }
                    </p>
                  </div>

                  {/* Digital Code Receipt */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-200/60 uppercase">
                      <span>{isBooked ? "Active Tracking Number" : "Assigned Quote ID"}</span>
                      <span className="text-green-600 font-bold">● REGISTERED SYSTEM LOG</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-bold text-logistics-blue select-all bg-[#0A2540]/5 px-3 py-1.5 rounded-lg border border-slate-100">
                        {submittedCode}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="p-2 bg-white text-slate-500 hover:text-logistics-orange hover:bg-slate-50 border border-slate-200/80 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5"
                        title="Copy code to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                        <span className="text-xs font-semibold">{copied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-1 font-sans">
                      {isBooked ? (
                        <p>
                          💻 You can scroll up to the <strong>Client Hub</strong> or enter this code in the hero section tracker to watch your cargo move!
                        </p>
                      ) : (
                        <p>
                          ✉️ Reference codes have been cached. Our sales team typically processes reviews within <strong>15-30 minutes</strong>.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center space-x-3">
                    <button
                      onClick={handleResetForms}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Generate New Form
                    </button>
                    {isBooked && (
                      <button
                        onClick={() => {
                          const trackerTab = document.getElementById("client-hub-section");
                          if (trackerTab) {
                            trackerTab.scrollIntoView({ behavior: "smooth" });
                          }
                          handleResetForms();
                        }}
                        className="px-6 py-3 bg-logistics-blue hover:bg-opacity-95 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                      >
                        Go to Tracking Panel
                      </button>
                    )}
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

        {/* Support Phone line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-slate-500 text-sm">
          <span>Prefer direct dispatching? Call us directly:</span>
          <a href="tel:1-800-555-0199" className="flex items-center space-x-1.5 text-logistics-orange font-bold hover:underline">
            <Phone className="w-4 h-4" />
            <span>1-800-555-0199 (24/7 Hotshot Dispatch)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
