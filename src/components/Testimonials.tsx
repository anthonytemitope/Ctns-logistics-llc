/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, Quote, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Liam Henderson",
      role: "Director of Supply Chain",
      company: "Horizon Retail Group",
      quote: "We've contracted CTNS Logistics LLC for bi-weekly cargo van drops in metropolitan areas. Over 8 months, they've achieved 100% on-time consistency. Absolutely stellar communication, and we always get instant proof of delivery notifications.",
      rating: 5,
      classification: "Cargo Van Deliveries"
    },
    {
      name: "Vanessa Ortega",
      role: "Logistics Specialist",
      company: "BioMed Labs East",
      quote: "Transporting delicate clinical specimens requires intense climate and security safeguards. The high-roof cargo van teams at CTNS met our compliance regulations perfectly. They are reliable, thoroughly certified, and highly professional.",
      rating: 5,
      classification: "Last-Mile Specialist"
    },
    {
      name: "David Vance",
      role: "Warehouse Supervisor",
      company: "Peak Machinery & Distribution",
      quote: "We needed a 26ft box truck dispatcher with heavy liftgate capability on extremely short notice. CTNS secured our route, loaded 6 massive machinery pallets, and completed the 200-mile run safely ahead of schedule. Highly recommended!",
      rating: 5,
      classification: "Box Truck Freight"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] font-sans scroll-mt-10 overflow-hidden relative border-t border-slate-150">
      
      {/* Decorative Accents */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-logistics-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-logistics-blue/5 py-1.5 px-3.5 rounded-full border border-logistics-blue/5">
            <span className="w-1.5 h-1.5 bg-logistics-orange rounded-full animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
              VERIFIED REVIEWS
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3.5xl sm:text-4xl text-logistics-blue tracking-tight">
            Trusted By Professional Logistics Managers
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            See how our client networks rely on CTNS Logistics LLC to transport critical freight and manage supply lines.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col justify-between shadow-xl shadow-slate-100 relative group"
            >
              {/* Floating Quote graphic */}
              <div className="absolute top-6 right-6 opacity-5 group-hover:scale-110 transition-transform text-logistics-orange">
                <Quote className="w-16 h-16 shrink-0" />
              </div>

              <div className="space-y-6 text-left relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
                  ))}
                </div>

                {/* Body Text */}
                <p className="text-[#334155] text-sm md:text-md italic leading-relaxed font-sans">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between z-10">
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-11 h-11 bg-slate-100 border border-slate-200/80 rounded-full flex items-center justify-center font-display font-extrabold text-[#0A2540] text-sm shadow-sm">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[#0A2540] text-sm leading-tight">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">{item.role}, <span className="font-semibold text-slate-700">{item.company}</span></p>
                  </div>
                </div>
                
                {/* Sub-niche badge */}
                <span className="text-[9px] font-mono font-bold text-logistics-orange uppercase bg-logistics-orange/10 px-2.5 py-1 rounded">
                  {item.classification}
                </span>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Insurance compliance footer banner */}
        <div className="mt-14 p-6 bg-[#0a2540] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-white text-xs gap-4 max-w-4xl mx-auto text-left shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl text-logistics-orange border border-white/10">
              <ShieldCheck className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <h4 className="font-bold text-sm leading-normal">Fully Insured & Registered Carrier</h4>
              <p className="text-white/60 leading-normal text-[11px] mt-0.5">We maintain USDOT compliance filings and high-limit premium freight safety insurance liabilities.</p>
            </div>
          </div>
          <span className="font-mono text-xs text-logistics-orange font-bold uppercase py-1 px-3 bg-white/5 rounded-lg border border-white/10 text-center shrink-0">
            D-U-N-S Registered
          </span>
        </div>

      </div>
    </section>
  );
}
