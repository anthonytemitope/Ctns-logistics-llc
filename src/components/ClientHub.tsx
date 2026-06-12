/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Compass, 
  MapPin, 
  Truck, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Grid, 
  RefreshCw,
  Trash2,
  FileCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Booking, Quote } from "../types";

interface ClientHubProps {
  bookings: Booking[];
  quotes: Quote[];
  onCancelBooking: (id: string) => void;
  onClearHistory: () => void;
  searchedCode: string;
}

export default function ClientHub({ 
  bookings, 
  quotes, 
  onCancelBooking, 
  onClearHistory,
  searchedCode 
}: ClientHubProps) {
  const [activeTab, setActiveTab] = useState<"tracker" | "bookings" | "quotes">("tracker");
  const [trackInput, setTrackInput] = useState("");
  const [trackingRecord, setTrackingRecord] = useState<any | null>(null);
  const [trackingError, setTrackingError] = useState("");

  // Simulated Tracker database for Demo Codes
  const demoTrackers: { [key: string]: any } = {
    "CTNS-EXPRESS": {
      trackingNumber: "CTNS-EXPRESS",
      driver: "Marcus Vance",
      driverPhone: "(214) 555-0182",
      vehicle: "Cargo Van (Expedited)",
      origin: "Hub Dallas - Fort Worth, TX",
      destination: "Medical Complex North, Plano, TX",
      status: "In Transit",
      percent: 65,
      eta: "Today in 45 Minutes",
      shipment: "Expedited Temperature-Controlled Medical Test Supplies",
      logs: [
        { time: "08:15 AM", status: "Origin Dispatch Completed", details: "Driver departed Dallas-Fort Worth main hub terminal." },
        { time: "09:30 AM", status: "Cargo Loaded onto Van", details: "Scanned & secured in chilled insulated cargo bay." },
        { time: "10:10 AM", status: "Transit Routing Active", details: "Maneuvering onto interstate US-75 North. Normal speeds." }
      ]
    },
    "CTNS-PREMIUM": {
      trackingNumber: "CTNS-PREMIUM",
      driver: "Sarah Jenkins & Leon Cox",
      driverPhone: "(404) 555-0921",
      vehicle: "Box Truck (Heavy Payload)",
      origin: "Industrial Logistics Port, Houston, TX",
      destination: "Distribution Regional Facility, Atlanta, GA",
      status: "Conf",
      percent: 30,
      eta: "Tomorrow by 2:00 PM",
      shipment: "8 Pallets of High-Value Finished Electronics Goods",
      logs: [
        { time: "Yesterday, 04:00 PM", status: "Carrier Contract Cleared", details: "DOT dispatch review validated. Multi-vehicle load securement absolute." },
        { time: "Today, 06:10 AM", status: "Departed Port Houston", details: "Interstate route started. Heading North-East." },
        { time: "Today, 11:30 AM", status: "Weigh Station Verification Checked", details: "Axle weight and electronic shipping logs validated. On-track." }
      ]
    }
  };

  // Run search when code is passed down from other pages (like Hero)
  useEffect(() => {
    if (searchedCode) {
      setActiveTab("tracker");
      setTrackInput(searchedCode);
      handleTrackQuery(searchedCode);
      scrollToHub();
    }
  }, [searchedCode]);

  const scrollToHub = () => {
    const element = document.getElementById("client-hub-section");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleTrackQuery = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    setTrackingError("");

    // Check demo database first
    if (demoTrackers[cleanCode]) {
      setTrackingRecord(demoTrackers[cleanCode]);
      return;
    }

    // Check custom local bookings next
    const localMatch = bookings.find(
      b => b.trackingNumber.toUpperCase() === cleanCode || b.id.toUpperCase() === cleanCode
    );

    if (localMatch) {
      // Build dummy tracking logs based on booking details
      const formattedDate = new Date(localMatch.deliveryDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      const customTrack = {
        trackingNumber: localMatch.trackingNumber,
        driver: "Alex Rivera (Active Dispatcher)",
        driverPhone: "(800) 555-0199",
        vehicle: localMatch.vehicleType,
        origin: localMatch.pickupLocation,
        destination: localMatch.deliveryLocation,
        status: localMatch.status === "Confirmed" ? "Confirmed Booking" : localMatch.status,
        percent: localMatch.status === "Confirmed" ? 15 : 99,
        eta: formattedDate,
        shipment: localMatch.shipmentDetails,
        logs: [
          { time: "Booking Created", status: "Freight Dispatch Requested", details: "Client booking lodged. Cargo specifications mapped to vehicle limits." },
          { time: "Ready", status: "Carrier Route Assigned", details: "Ready for dispatcher arrival check. Route parameters optimized for " + formattedDate }
        ]
      };
      setTrackingRecord(customTrack);
    } else {
      setTrackingRecord(null);
      setTrackingError("No active shipment records found. Try checking 'CTNS-EXPRESS' for demo tracking details.");
    }
  };

  const handleFormSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackQuery(trackInput);
  };

  return (
    <section id="client-hub-section" className="py-20 bg-white font-sans border-t border-slate-100 scroll-mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-slate-150">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs text-logistics-orange font-mono font-semibold uppercase tracking-wider">
              <Compass className="w-4 h-4 text-logistics-orange animate-spin-slow" />
              <span>CTNS DIGITAL DESK</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl text-logistics-blue tracking-tight">
              Client Portal & Hub
            </h2>
            <p className="text-slate-500 text-sm">
              Review active contract records, track shipping channels, and access digital dispatch receipts.
            </p>
          </div>

          {/* Sub menu tabs inside panel */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/40 text-xs font-bold font-sans">
            <button
              onClick={() => setActiveTab("tracker")}
              className={`py-2 px-4 rounded-lg transition-all cursor-pointer ${
                activeTab === "tracker" ? "bg-white text-logistics-blue shadow-sm" : "text-slate-500 hover:text-[#0A2540]"
              }`}
            >
              Shipment Tracker
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-2 px-4 rounded-lg transition-all relative cursor-pointer ${
                activeTab === "bookings" ? "bg-white text-logistics-blue shadow-sm" : "text-slate-500 hover:text-[#0A2540]"
              }`}
            >
              <span>Bookings ({bookings.length})</span>
              {bookings.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#FF6B00] text-white text-[9px] rounded-full">
                  new
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("quotes")}
              className={`py-2 px-4 rounded-lg transition-all cursor-pointer ${
                activeTab === "quotes" ? "bg-white text-logistics-blue shadow-sm" : "text-slate-500 hover:text-[#0A2540]"
              }`}
            >
              Quotes ({quotes.length})
            </button>
          </div>
        </div>

        {/* Content switch */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">

            {/* TAB 1: REAL-TIME SEARCHING AND DYNAMIC VECTOR ROUTES */}
            {activeTab === "tracker" && (
              <motion.div
                key="tracker-tab-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 text-left"
              >
                {/* Tracker Search Console panel */}
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl max-w-2xl mx-auto text-center space-y-4 shadow-sm">
                  <h3 className="font-display font-extrabold text-[#0A2540] text-lg">
                    Real-Time Shipping Telemetry Tracker
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal max-w-md mx-auto">
                    Type your code below to track active truck dispatches. Use <span className="font-mono font-bold text-logistics-orange bg-[#0A2540]/5 px-1 py-0.5 rounded">CTNS-EXPRESS</span> or <span className="font-mono font-bold text-logistics-orange bg-[#0A2540]/5 px-1 py-0.5 rounded">CTNS-PREMIUM</span> to test the interactive map simulator.
                  </p>

                  <form onSubmit={handleFormSearch} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        required
                        placeholder="e.g. CTNS-EXPRESS"
                        value={trackInput}
                        onChange={(e) => setTrackInput(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-logistics-orange rounded-xl py-3 px-4 pl-10 text-sm font-mono uppercase focus:outline-none"
                      />
                      <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#0A2540] hover:bg-logistics-orange text-white text-xs font-bold py-3 px-6 rounded-xl transition-all cursor-pointer uppercase tracking-wider block shrink-0"
                    >
                      Locate Cargo
                    </button>
                  </form>

                  {trackingError && (
                    <div className="text-red-500 flex items-center justify-center space-x-1 text-xs pt-1">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{trackingError}</span>
                    </div>
                  )}
                </div>

                {/* Tracking Visualization (Only if record active) */}
                {trackingRecord ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10"
                  >
                    {/* Visual Progress Map Path Card (7 cols) */}
                    <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-3xl space-y-8 flex flex-col justify-between">
                      <div>
                        {/* Headers */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-6">
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-[#FF6B00] font-bold uppercase">GPS TRANSIT PATHWAY</span>
                            <h4 className="font-display font-extrabold text-logistics-blue text-lg">
                              Status: <span className="text-logistics-orange font-sans">{trackingRecord.status}</span>
                            </h4>
                          </div>
                          
                          <div className="bg-[#0A2540] text-white py-1 px-3 rounded-md font-mono text-xs border border-white/5 uppercase">
                            ID: <span className="font-bold text-logistics-orange">{trackingRecord.trackingNumber}</span>
                          </div>
                        </div>

                        {/* Interactive Truck Dotted Vector Map */}
                        <div className="relative py-10 bg-white border border-slate-100 rounded-2xl p-6 shadow-inner overflow-hidden">
                          {/* Map Background Grid lines */}
                          <div className="absolute inset-0 bg-grid-slate-100 opacity-20 pointer-events-none" />
                          
                          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4 relative z-10 w-full px-4">
                            
                            {/* Origin address marker */}
                            <div className="text-center md:text-left space-y-1 md:max-w-[140px] shrink-0">
                              <div className="w-8 h-8 rounded-full bg-[#0A2540] border-2 border-white shadow flex items-center justify-center mx-auto md:mx-0">
                                <MapPin className="w-4.5 h-4.5 text-white" />
                              </div>
                              <h5 className="font-bold text-slate-800 text-xs">Origin</h5>
                              <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">{trackingRecord.origin}</p>
                            </div>

                            {/* Center Dotted Pathway line */}
                            <div className="relative flex-1 w-full max-w-[220px] h-3 hidden md:flex items-center">
                              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full" />
                              {/* Transit dotted line */}
                              <div 
                                className="absolute top-1/2 left-0 h-1 bg-[#FF6B00] -translate-y-1/2 rounded-full transition-all duration-1000"
                                style={{ width: `${trackingRecord.percent}%` }}
                              />
                              
                              {/* Animated moving truck */}
                              <div 
                                className="absolute top-1/2 -translate-y-1/2 rounded-full p-2 bg-[#FF6B00] shadow-md border hover:scale-110 transition-all duration-1000"
                                style={{ left: `calc(${trackingRecord.percent}% - 14px)` }}
                              >
                                <Truck className="w-3.5 h-3.5 text-white animate-bounce" />
                              </div>
                            </div>

                            {/* Destination address marker */}
                            <div className="text-center md:text-right space-y-1 md:max-w-[140px] shrink-0">
                              <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-300 shadow flex items-center justify-center mx-auto md:ml-auto md:mr-0">
                                <CheckCircle2 className="w-4.5 h-4.5 text-slate-400" />
                              </div>
                              <h5 className="font-bold text-slate-800 text-xs">Cargo Target</h5>
                              <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">{trackingRecord.destination}</p>
                            </div>

                          </div>

                          <div className="border-t border-slate-100 mt-8 pt-4 flex justify-between items-center text-[11px] font-mono text-slate-400">
                            <span>ROUTE PERCENTAGE COMPLETION:</span>
                            <span className="font-bold text-slate-700">{trackingRecord.percent}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Technical specifications details */}
                      <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-slate-100 text-left">
                          <span className="text-slate-400 font-mono text-[9px] block uppercase">Assigned Carrier Operator</span>
                          <span className="font-semibold text-slate-700 block mt-1">{trackingRecord.driver}</span>
                          <span className="text-[10px] text-logistics-orange font-medium mt-0.5 block">{trackingRecord.driverPhone}</span>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-100 text-left">
                          <span className="text-slate-400 font-mono text-[9px] block uppercase">Est Arrival Delivery Window</span>
                          <span className="font-semibold text-slate-700 block mt-1">{trackingRecord.eta}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block capitalize">{trackingRecord.vehicle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress log and payload diagnostics (5 cols) */}
                    <div className="lg:col-span-5 bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-3xl space-y-6">
                      <div className="text-left">
                        <span className="text-[10px] font-mono tracking-widest text-[#FF6B00] font-bold uppercase block mb-1">PAYLOAD REGISTER</span>
                        <h4 className="font-display font-extrabold text-logistics-blue text-lg">Shipment Log Diagnostics</h4>
                        <p className="text-xs text-slate-500 mt-1 italic font-sans leading-relaxed">
                          "{trackingRecord.shipment}"
                        </p>
                      </div>

                      {/* Telemetry Tracking Logs */}
                      <div className="space-y-4 text-left pt-2 border-t border-slate-200">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">DISPATCH MILESTONE LOGS</span>
                        
                        <div className="relative pl-5 space-y-6 before:absolute before:left-1.5 before:top-1 before:bottom-1 before:w-0.5 before:bg-slate-200">
                          {trackingRecord.logs.map((log: any, index: number) => (
                            <div key={index} className="relative text-xs">
                              <span className="absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full bg-logistics-orange border-2 border-white shadow-sm" />
                              <div className="space-y-0.5">
                                <div className="flex justify-between font-bold text-slate-800">
                                  <span>{log.status}</span>
                                  <span className="text-slate-400 font-mono text-[10px]">{log.time}</span>
                                </div>
                                <p className="text-slate-500 font-sans text-[11px] leading-relaxed">{log.details}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-12 text-center text-slate-400 border border-slate-100 max-w-lg mx-auto space-y-3">
                    <Truck className="w-10 h-10 text-slate-300 mx-auto animate-pulse" />
                    <p className="text-sm font-semibold text-slate-600">No telemetry route active</p>
                    <p className="text-xs text-slate-400 leading-normal">
                      Search standard parcel routes like <span className="font-mono bg-white inline-block px-1 rounded shadow-sm">CTNS-EXPRESS</span> or book a dispatch job to initialize telemetry routes here.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: ACTIVE RECENT BOOKINGS CACHED */}
            {activeTab === "bookings" && (
              <motion.div
                key="bookings-tab-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-extrabold text-[#0A2540] text-lg">
                    Client-Initiated Bookings
                  </h3>
                  {bookings.length > 0 && (
                    <button
                      onClick={onClearHistory}
                      className="text-xs text-slate-400 hover:text-red-500 font-semibold flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Purge History</span>
                    </button>
                  )}
                </div>

                {bookings.length === 0 ? (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center text-slate-400 space-y-4">
                    <FileCheck className="w-12 h-12 text-slate-300 mx-auto" />
                    <div>
                      <h4 className="font-bold text-slate-600 text-sm">No bookings registered in local storage</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-normal">
                        Submit a cargo scheduling form via the Booking page to save custom orders here for immediate validation checking.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const bSec = document.getElementById("booking");
                        if (bSec) bSec.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-logistics-orange rounded-lg shadow cursor-pointer uppercase tracking-wider"
                    >
                      Schedule Booking
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className="bg-slate-50 border border-slate-150 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all relative"
                      >
                        <span className="absolute top-4 right-4 bg-green-100 text-green-700 font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {b.status}
                        </span>

                        <div className="space-y-4">
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-slate-400 font-mono block">TRACKING ID: <strong className="text-logistics-blue">{b.trackingNumber}</strong></span>
                            <h4 className="font-display font-bold text-[#0A2540] text-base">{b.name}</h4>
                            <span className="text-xs text-slate-500 capitalize">{b.vehicleType}</span>
                          </div>

                          <div className="space-y-1.5 border-t border-slate-200/50 pt-3 text-xs text-slate-600 font-sans">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Date:</span>
                              <span className="font-semibold">{b.deliveryDate}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-400 shrink-0">Pickup:</span>
                              <span className="font-semibold line-clamp-1 text-right">{b.pickupLocation}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-400 shrink-0">Delivery:</span>
                              <span className="font-semibold line-clamp-1 text-right">{b.deliveryLocation}</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-slate-200/20 text-slate-700 font-semibold font-mono">
                              <span>Pricing:</span>
                              <span className="text-green-600">${b.estimatedCost || 180}</span>
                            </div>
                          </div>
                        </div>

                        {/* Booking actions */}
                        <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                          <button
                            onClick={() => handleTrackQuery(b.trackingNumber)}
                            className="text-xs font-mono font-bold text-[#FF6B00] flex items-center space-x-1 hover:underline cursor-pointer"
                          >
                            <span>Live Map Tracker</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            onClick={() => onCancelBooking(b.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                          >
                            Cancel Ticket
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: ACTIVE REQUESTED QUOTES */}
            {activeTab === "quotes" && (
              <motion.div
                key="quotes-tab-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-left"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-extrabold text-[#0A2540] text-lg">
                    Client-Submitted Inquiries
                  </h3>
                </div>

                {quotes.length === 0 ? (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center text-slate-400 space-y-4">
                    <FileCheck className="w-12 h-12 text-slate-300 mx-auto" />
                    <div>
                      <h4 className="font-bold text-slate-600 text-sm">No custom quotes requested</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-normal">
                        Submit a standard pricing calculation in the Quote tab to cache detailed sales inquiries.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quotes.map((q) => (
                      <div
                        key={q.id}
                        className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all text-sm flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-200/40">
                            <span className="font-mono text-xs font-bold text-logistics-blue bg-[#0A2540]/5 py-0.5 px-2 rounded-md">
                              {q.id}
                            </span>
                            <span className="text-[10px] text-yellow-600 bg-yellow-50 font-semibold px-2 py-0.5 rounded-full uppercase">
                              {q.status}
                            </span>
                          </div>

                          <div className="space-y-0.5">
                            <h4 className="font-display font-extrabold text-slate-800 text-base">{q.name}</h4>
                            <p className="text-xs text-slate-500 font-mono italic">{q.companyName}</p>
                          </div>

                          <div className="text-xs text-slate-600 space-y-1 b-t b-slate-100 pt-2 font-sans">
                            <p><span className="text-slate-400">Phone:</span> {q.phone}</p>
                            <p><span className="text-slate-400">Vehicle:</span> {q.vehicleType}</p>
                            <p className="text-slate-500 line-clamp-2 italic">"{q.shipmentDescription}"</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center">
                          <span className="text-[10px] text-slate-400">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </span>
                          <span className="font-mono text-xs font-bold text-green-600">
                            Est: ${q.estimatedCost || 150}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
