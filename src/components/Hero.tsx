/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowRight, Play, ShieldAlert, Truck, Send, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onQuoteClick: () => void;
  onBookingClick: () => void;
  onTrackSubmit: (trackingCode: string) => void;
}

export default function Hero({ onQuoteClick, onBookingClick, onTrackSubmit }: HeroProps) {
  const [trackingInput, setTrackingInput] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      onTrackSubmit(trackingInput.trim());
      setTrackingInput("");
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-24 md:pt-36 flex items-center justify-center overflow-hidden bg-logistics-blue text-white font-sans"
    >
      {/* Background Hero Image with Dark Blue / Orange overlays for optimal contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/ctns_hero_logistics_1781264186234.jpg" 
          alt="CTNS Logistics modern premium cargo fleet and terminal"
          className="w-full h-full object-cover scale-[1.01] opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute inset-0 bg-[#0A2540]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/90 via-[#0A2540]/75 to-transparent" />
      </div>

      {/* Decorative Brand Accent Circles */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-logistics-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Main Brand Copy column (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
          
          {/* Trust Badge Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-logistics-orange animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-semibold">
              Fast, Reliable & Professional Delivery Services
            </span>
          </motion.div>

          {/* Core Headlines */}
          <div className="space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-3.5xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-white"
            >
              Reliable Logistics <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-logistics-orange via-orange-400 to-white">
                Solutions You Can Count On
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-sans text-white/80 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl"
            >
              Delivering Freight, Packages, and Business Solutions Safely, Efficiently, and On Time. Specialize in professional cargo van and box truck hotshot deliveries.
            </motion.p>
          </div>

          {/* Action CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-lg"
          >
            <button
              onClick={onQuoteClick}
              className="bg-logistics-orange hover:bg-logistics-orange-hover text-white px-8 py-4.5 rounded-xl text-md font-bold transition-all transform active:scale-95 shadow-lg shadow-logistics-orange/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Get A Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onBookingClick}
              className="bg-white/10 hover:bg-white/15 text-white hover:text-white px-8 py-4.5 rounded-xl text-md font-bold transition-all border border-white/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Truck className="w-5 h-5 text-logistics-orange" />
              <span>Book Delivery Now</span>
            </button>
          </motion.div>

          {/* Highlight features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="grid grid-cols-3 gap-4 pt-4 max-w-md border-t border-white/10 text-xs sm:text-sm font-medium"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-logistics-orange shrink-0" />
              <span className="text-white/80">On-Demand Dispatch</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-logistics-orange shrink-0" />
              <span className="text-white/80">Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-logistics-orange shrink-0" />
              <span className="text-white/80">Smart Tracker</span>
            </div>
          </motion.div>

        </div>

        {/* Live Real-Time Tracking Sandbox panel on the Hero page (5 cols) */}
        <div className="lg:col-span-5 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-b from-[#0A2540]/60 to-[#07192C]/80 backdrop-blur-md border border-white/15 p-6 rounded-2xl md:p-8 shadow-2xl relative"
          >
            {/* Visual Header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-logistics-orange/10 rounded-lg border border-logistics-orange/20 text-logistics-orange">
                  <Truck className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Live Cargo Tracker</h3>
                  <p className="text-xs text-white/60 font-mono">Real-Time Dispatch Console</p>
                </div>
              </div>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>

            <p className="text-sm text-white/80 mb-5 leading-relaxed">
              Track your cargo shipment in real-time. Enter your booking ID or tracking code below to visualize your parcel route.
            </p>

            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/50 mb-2 uppercase tracking-wide">
                  ENTER SHIPMENT ID or TRACKING NUMBER
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. CTNS-EXPRESS"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="w-full bg-[#07192C] border border-white/15 rounded-xl py-3 px-4 pl-11 text-white placeholder-white/35 text-sm font-mono focus:outline-none focus:border-logistics-orange focus:ring-1 focus:ring-logistics-orange transition-all uppercase"
                  />
                  <Send className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-white/95 text-logistics-blue font-bold tracking-wide py-3 px-5 rounded-xl text-sm transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                Track Cargo Payload
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-white/10 bg-white/5 -mx-6 md:-mx-8 px-6 md:px-8 py-3 rounded-b-2xl">
              <div className="flex items-start space-x-2.5 text-xs text-white/70">
                <ShieldAlert className="w-4.5 h-4.5 text-logistics-orange shrink-0 mt-0.5" />
                <p>
                  <span className="font-semibold text-white">Quick Demo IDs:</span> We've initialized live simulation records: <span className="font-mono bg-logistics-blue/80 py-0.5 px-1.5 rounded text-logistics-orange border border-white/10">CTNS-EXPRESS</span> or <span className="font-mono bg-logistics-blue/80 py-0.5 px-1.5 rounded text-logistics-orange border border-white/10">CTNS-PREMIUM</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Modern Wave bottom curve cutout */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-50 relative z-10" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
    </section>
  );
}
