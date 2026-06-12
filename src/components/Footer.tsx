/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowUpCircle 
} from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 font-sans border-t border-white/5 relative overflow-hidden">
      
      {/* Upper Footer Segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 text-left relative z-10">
        
        {/* Brand Segment (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="cursor-pointer hover:opacity-95 active:scale-98 transition-all inline-block" onClick={handleScrollToTop}>
            <Logo variant="light" height={42} />
          </div>
          
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            Professional trucking and logistics carrier supplying reliable express box truck and cargo van deliveries locally, regionally, and nationally.
          </p>

          {/* Social media listings */}
          <div className="flex items-center space-x-3 pt-2">
            <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-[#FF6B00] transition-all" title="Follow us on LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-[#FF6B00] transition-all" title="Follow us on Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-[#FF6B00] transition-all" title="Follow us on Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-[#FF6B00] transition-all" title="Follow us on Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Segment (2.5 cols) */}
        <div className="lg:col-span-2.5 space-y-4">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider font-mono">Quick Links</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handleScrollToSection("home")} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
                Home Pathway
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("about")} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
                About Our Vision
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("services")} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
                Service Catalog
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("fleet")} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
                Cargo Vehicle Fleet
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("why-choose-us")} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
                Operational Edge
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("booking")} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
                Book Freight
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("contact")} className="hover:text-[#FF6B00] transition-colors cursor-pointer">
                Contact Office
              </button>
            </li>
          </ul>
        </div>

        {/* Services Segment (2.5 cols) */}
        <div className="lg:col-span-2.5 space-y-4">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider font-mono">Our Carrier Services</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => handleScrollToSection("services")} className="hover:text-[#FF6B00] transition-all cursor-pointer">
                Heavy Box Truck Freight
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("services")} className="hover:text-[#FF6B00] transition-all cursor-pointer">
                Cargo Van Courier Delivery
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("services")} className="hover:text-[#FF6B00] transition-all cursor-pointer">
                Same-Day Last-Mile Delivery
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("services")} className="hover:text-[#FF6B00] transition-all cursor-pointer">
                B2B Commercial Logistics
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("services")} className="hover:text-[#FF6B00] transition-all cursor-pointer">
                Scheduled Account Delivery
              </button>
            </li>
            <li>
              <button onClick={() => handleScrollToSection("services")} className="hover:text-[#FF6B00] transition-all cursor-pointer">
                Expedited Priority Hotshot
              </button>
            </li>
          </ul>
        </div>

        {/* Contacts Segment (3 cols) */}
        <div className="lg:col-span-3 space-y-5">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider font-mono">Operations Coordinates</h4>
          
          <ul className="space-y-3.5 text-xs text-slate-450 text-left">
            <li className="flex items-start space-x-2.5">
              <Phone className="w-4 h-4 text-logistics-orange shrink-0 mt-0.5" />
              <span>
                <span className="text-slate-500 block font-sans uppercase text-[9px] tracking-wide">Hotshot Hotlines</span>
                <a href="tel:1-800-555-0199" className="hover:text-[#FF6B00]">1-800-555-0199</a>
              </span>
            </li>
            
            <li className="flex items-start space-x-2.5">
              <Mail className="w-4 h-4 text-logistics-orange shrink-0 mt-0.5" />
              <span>
                <span className="text-slate-500 block font-sans uppercase text-[9px] tracking-wide">Sales Queries</span>
                <a href="mailto:dispatch@ctnslogistics.com" className="hover:text-[#FF6B00]">dispatch@ctnslogistics.com</a>
              </span>
            </li>

            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4.5 h-4.5 text-logistics-orange shrink-0 mt-0.5" />
              <span>
                <span className="text-slate-500 block font-sans uppercase text-[9px] tracking-wide">National HQ</span>
                <span>100 Logistics Pkwy, Dallas, TX 75201</span>
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Lower Legal Frame Segment */}
      <div className="bg-slate-950 py-6 text-xs text-slate-500 border-t border-white/5 relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p>© {currentYear} CTNS Logistics LLC. All rights reserved. Registered Transportation & Freight Carrier.</p>

          <div className="flex items-center space-x-4">
            <button onClick={handleScrollToTop} className="font-semibold text-slate-400 hover:text-[#FF6B00] flex items-center space-x-1 cursor-pointer">
              <span>Back To Top</span>
              <ArrowUpCircle className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
