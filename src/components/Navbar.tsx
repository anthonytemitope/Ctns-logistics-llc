/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, ShieldCheck, ClipboardList, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

interface NavbarProps {
  onQuoteClick: () => void;
  onBookingClick: () => void;
  onClientHubClick: () => void;
  pendingCount: number;
}

export default function Navbar({ onQuoteClick, onBookingClick, onClientHubClick, pendingCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
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

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Services", id: "services" },
    { name: "Fleet", id: "fleet" },
    { name: "Why Choose Us", id: "why-choose-us" },
    { name: "Booking", id: "booking" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <>
      {/* Top Banner Contact Line */}
      <div className="bg-logistics-blue text-white/90 py-2 px-4 text-xs font-sans tracking-wide border-b border-white/5 transition-all hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-logistics-orange" />
              <span>Immediate Support: <a href="tel:1-800-555-0199" className="hover:text-logistics-orange font-medium">1-800-555-0199</a></span>
            </span>
            <span className="flex items-center space-x-1.5 opacity-90">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span>Full Liability Cargo Insurance • US DOT Compliant</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onClientHubClick}
              className="flex items-center space-x-1 hover:text-logistics-orange transition-colors font-medium text-xs py-0.5 px-2 bg-white/10 rounded-full cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Client Hub</span>
              {pendingCount > 0 && (
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-logistics-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-logistics-orange"></span>
                </span>
              )}
            </button>
            <span className="text-white/45">|</span>
            <span className="text-white/80">Available 24/7/365</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed top-0 md:top-8 left-0 right-0 z-50 transition-all duration-300 px-4 max-w-7xl mx-auto ${
          isScrolled 
            ? "md:top-2" 
            : ""
        }`}
      >
        <div
          id="navbar"
          className={`mx-auto rounded-none md:rounded-2xl transition-all duration-300 border-b md:border ${
            isScrolled
              ? "bg-[#0A2540]/95 backdrop-blur-md shadow-lg border-white/10 py-3"
              : "bg-[#0A2540]/80 backdrop-blur-sm border-white/5 py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            {/* Brand Logo */}
            <div 
              className="cursor-pointer hover:opacity-95 active:scale-98 transition-all"
              onClick={() => scrollToSection("home")}
            >
              <Logo variant="light" height={42} />
            </div>

            {/* Desktop Navigation Link items */}
            <nav id="desktop-menu" className="hidden lg:flex items-center space-x-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-3.5 py-1.5 text-sm font-medium text-white/85 hover:text-logistics-orange hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* CTA Buttons in Nav */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={onClientHubClick}
                className="flex items-center space-x-1.5 text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all text-sm font-medium border border-white/10 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-logistics-orange animate-spin-slow" />
                <span>Track Cargo</span>
              </button>
              <button
                onClick={onQuoteClick}
                className="bg-logistics-orange hover:bg-logistics-orange-hover text-white text-sm font-bold min-w-[140px] py-2 px-4.5 rounded-lg transition-all duration-200 transform active:scale-95 shadow-md md:shadow-lg shadow-logistics-orange/20 cursor-pointer"
              >
                Get A Quote
              </button>
            </div>

            {/* Mobile Menu Trigger Button */}
            <div className="flex lg:hidden items-center space-x-3">
              <button
                onClick={onClientHubClick}
                className="p-2 bg-white/5 text-white/90 hover:text-logistics-orange rounded-lg relative cursor-pointer"
                title="Client Portal & Tracking"
              >
                <ClipboardList className="w-5 h-5" />
                {pendingCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-logistics-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-logistics-orange"></span>
                  </span>
                )}
              </button>
              <button
                id="menu-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white/90 hover:text-logistics-orange focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg cursor-pointer transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-[64px] md:top-[128px] left-0 right-0 z-40 bg-logistics-blue/98 backdrop-blur-lg border-b border-white/10 p-6 flex flex-col space-y-5 lg:hidden shadow-xl"
          >
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full text-left py-3 px-4 text-base font-semibold text-white/90 hover:text-logistics-orange hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="h-px bg-white/10 w-full" />

            {/* Mobile Actions Header */}
            <div className="flex flex-col space-y-3 pt-2">
              <div className="flex items-center justify-between px-4 text-xs font-mono text-white/50">
                <span>IMMEDIATE DISPATCH Support</span>
                <span className="text-green-400 font-bold">● ONLINE</span>
              </div>
              <a
                href="tel:1-800-555-0199"
                className="flex items-center justify-center space-x-2 text-white bg-white/5 py-3 rounded-xl border border-white/10 text-base font-bold hover:text-logistics-orange hover:border-logistics-orange transition-all"
              >
                <Phone className="w-5 h-5 text-logistics-orange" />
                <span>Call 1-800-555-0199</span>
              </a>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onClientHubClick();
                  }}
                  className="bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/15 shadow-sm text-sm hover:bg-white/20 transition-all cursor-pointer"
                >
                  Client Tracker Hub
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onQuoteClick();
                  }}
                  className="bg-logistics-orange hover:bg-logistics-orange-hover text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm text-center cursor-pointer"
                >
                  Get Quotes Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
