/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, FastForward, HeartHandshake, Award, Clock3, Compass } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const values = [
    {
      icon: <Shield className="w-6 h-6 text-logistics-orange" />,
      title: "Secure Transportation",
      description: "Every commercial dispatch handles payload tracking and strict secure load guidelines so cargo remains immaculate."
    },
    {
      icon: <FastForward className="w-6 h-6 text-logistics-orange" />,
      title: "Expedited Deliveries",
      description: "Using immediate routing telemetry, cargo travels the absolute fastest corridors without logistics friction."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-logistics-orange" />,
      title: "Client Commitment",
      description: "No cargo is too small. We build relationships with businesses to serve as their critical freight backbone."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F8FAFC] font-sans scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-logistics-orange/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-logistics-blue/5 rounded-full blur-2xl" />
            
            <div className="relative bg-white border border-slate-100 p-8 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center space-x-3 text-logistics-blue">
                <Award className="w-8 h-8 text-logistics-orange shrink-0" />
                <span className="font-display font-bold text-lg">Integrity & Excellence</span>
              </div>
              
              <blockquote className="text-slate-600 italic text-md leading-relaxed">
                "We launched CTNS Logistics LLC to bridge the gap in secure, fast local freight. Our drivers understand transit targets, ensuring Box Trucks and Cargo Vans run with flawless synchronization."
              </blockquote>
              
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 bg-logistics-blue rounded-full flex items-center justify-center font-display font-extrabold text-white text-md">
                  CT
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Corporate Leadership</h4>
                  <p className="text-xs text-slate-500">CTNS Logistics Management</p>
                </div>
              </div>
            </div>

            {/* Float Stat Badge */}
            <div className="absolute -bottom-10 right-6 bg-logistics-blue text-white py-4 px-6 rounded-xl shadow-lg border border-white/10 hidden sm:block">
              <div className="flex items-center space-x-3">
                <Clock3 className="w-8 h-8 text-logistics-orange" />
                <div>
                  <p className="text-2xl font-extrabold font-display leading-none text-white">100%</p>
                  <p className="text-[10px] text-white/70 tracking-wider uppercase font-mono mt-1">Uptime Dispatch</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Copy Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="h-px w-6 bg-logistics-orange" />
                <span className="text-xs font-mono uppercase tracking-widest text-logistics-orange font-bold">
                  ABOUT CTNS LOGISTICS LLC
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-logistics-blue tracking-tight">
                Your Trusted Partner for Fast & Dependable Transport
              </h2>
            </div>

            <div className="text-slate-600 space-y-4 text-base leading-relaxed">
              <p>
                <strong>CTNS Logistics LLC</strong> provides dependable transportation and logistics solutions for businesses and individuals. We specialize in fast, secure, and professional freight transportation using cargo vans and box trucks to ensure every shipment arrives safely and on schedule.
              </p>
              <p>
                Whether you need immediate same-day last-mile distribution or a reliable corporate delivery schedule, our customized truck freight networks are engineered to offer peace of mind. We maintain a high standard of compliance, premium safety equipment, and dynamic communication portals.
              </p>
            </div>

            {/* Custom Values Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              {values.map((v, i) => (
                <div key={i} className="space-y-2 text-left">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 bg-logistics-orange/10 rounded-lg">
                      {v.icon}
                    </div>
                    <h3 className="font-display font-semibold text-sm text-logistics-blue">
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
