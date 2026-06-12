/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    setIsSent(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white font-sans scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-logistics-blue/5 py-1.5 px-3.5 rounded-full border border-logistics-blue/5">
            <span className="w-1.5 h-1.5 bg-logistics-orange rounded-full" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3.5xl sm:text-4xl text-logistics-blue tracking-tight">
            Contact CTNS Logistics LLC
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Our corporate dispatch office is available around the clock. Fill out the contact message sheet below, or call our 24/7 hotline directly.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Coordinates & Google Map Vector (5 cols) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            
            {/* Contact Cards */}
            <div className="space-y-6 text-left">
              <h3 className="font-display font-bold text-xl text-logistics-blue mb-4">
                Corporate Coordinates
              </h3>

              {/* Phone item */}
              <a 
                href="tel:1-800-555-0199" 
                className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group block"
              >
                <div className="p-3 bg-logistics-blue rounded-xl text-white group-hover:bg-logistics-orange transition-colors">
                  <Phone className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-400 font-mono text-[10px] uppercase tracking-wider">24/7 Hotshot Dispatch Hotline</h4>
                  <p className="text-base font-bold text-logistics-blue mt-0.5">1-800-555-0199</p>
                  <p className="text-xs text-slate-500 mt-0.5">Toll-free inside USA & Canadian sectors</p>
                </div>
              </a>

              {/* Email item */}
              <a 
                href="mailto:dispatch@ctnslogistics.com" 
                className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group block"
              >
                <div className="p-3 bg-logistics-blue rounded-xl text-white group-hover:bg-logistics-orange transition-colors">
                  <Mail className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-400 font-mono text-[10px] uppercase tracking-wider">Business & Invoice Queries</h4>
                  <p className="text-base font-bold text-logistics-blue mt-0.5">dispatch@ctnslogistics.com</p>
                  <p className="text-xs text-slate-500 mt-0.5">Response Typically Under 15 Minutes</p>
                </div>
              </a>

              {/* Location address item */}
              <div className="flex items-start space-x-4 p-4 rounded-2xl border border-transparent text-left">
                <div className="p-3 bg-logistics-blue rounded-xl text-white">
                  <MapPin className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-400 font-mono text-[10px] uppercase tracking-wider">National Logistics Head Office</h4>
                  <p className="text-base font-bold text-logistics-blue mt-0.5">100 Logistics Pkwy</p>
                  <p className="text-sm text-slate-700 font-semibold">Dallas, TX 75201</p>
                  <div className="flex items-center space-x-1 text-slate-500 text-xs mt-1.5 font-mono uppercase">
                    <Clock className="w-3.5 h-3.5 text-logistics-orange" />
                    <span>24 Hours Daily • 365 Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Stylized Interactive Google Maps vector placeholder */}
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-3xl space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                <span>HEADQUARTERS REGION MAP</span>
                <span className="text-green-600 font-bold">● ACTIVE SECTOR</span>
              </div>

              {/* SVG Map Pathway */}
              <div className="relative h-44 bg-[#0A2540] rounded-xl overflow-hidden shadow-inner border border-white/5 flex items-center justify-center">
                {/* SVG decorative coordinates lattice background */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-map" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-map)" />
                  <path d="M0,80 Q100,20 200,90 T400,60" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                {/* Styled Map Graphics */}
                <div className="relative text-center text-white space-y-1 z-10 p-4">
                  <div className="inline-flex bg-logistics-orange text-white p-2 rounded-full shadow-lg border-2 border-white animate-bounce mb-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h5 className="font-display font-bold text-xs">CTNS Logistics Hub Dallas</h5>
                  <p className="text-[10px] text-white/60 font-mono">Latitude: 32.7767° N, Longitude: -96.7970° W</p>
                  <span className="text-[9px] font-mono tracking-widest text-[#FF6B00] font-bold block pt-1.5">
                    COVERS LOCAL, REGIONAL & NATIONAL ROUTES
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Dispatch Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-3xl text-left">
            
            <h3 className="font-display font-extrabold text-[#0A2540] text-xl mb-1.5">
              Instant Dispatch Message Sheet
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-8">
              Message our executive dispatch operations team. We process online inquiries immediately inside business hours.
            </p>

            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-5 text-slate-700 leading-normal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-500 uppercase">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-logistics-orange rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-500 uppercase">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-logistics-orange rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-500 uppercase">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-logistics-orange rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-500 uppercase">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify shipping volumes, recurring regional routes, specific vehicle requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-logistics-orange rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit bar */}
                  <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center space-x-1 text-slate-500 text-left">
                      <AlertCircle className="w-4 h-4 text-logistics-orange shrink-0 animate-pulse" />
                      <span>Usually monitored 24/7/365</span>
                    </span>
                    <button
                      type="submit"
                      className="bg-[#0A2540] hover:bg-logistics-orange text-white text-xs font-bold uppercase tracking-wider py-3.5 px-8 rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4 text-logistics-orange" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="inline-flex p-3 bg-green-50 text-green-600 rounded-full border border-green-100 mb-2">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-display font-extrabold text-xl text-[#0A2540]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Thank you. We have forwarded your credentials to dispatch managers. A terminal coordinator will contact you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
