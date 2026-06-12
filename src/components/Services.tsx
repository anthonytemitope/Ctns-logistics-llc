/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Truck, 
  Package, 
  Navigation2, 
  Briefcase, 
  CalendarClock, 
  Zap, 
  X, 
  CheckCircle, 
  ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ServiceItem } from "../types";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const servicesList: ServiceItem[] = [
    {
      id: "box-truck",
      title: "Box Truck Delivery",
      description: "Reliable transportation for medium and large shipments.",
      detailedDescription: "Designed for commercial shipping, bulky stock transfer, and high-volume freight deliveries. Our box trucks feature hydraulic lift gates and full payload tie-down tracks to ensure smooth transport for palletized freight, industrial equipment, or massive parcels.",
      features: ["Dock-height capability", "Hydraulic Lift Gates (2000lb+ capacity)", "E-Track securement strap networks", "Up to 10,000 lbs high cargo payload capability"]
    },
    {
      id: "cargo-van",
      title: "Cargo Van Delivery",
      description: "Fast and flexible delivery solutions.",
      detailedDescription: "Ideal for fast residential or commercial hotshots, medical supplies, high-value electronics, and parcel sprints. Our high-roof cargo vans easily maneuver tight loading bays or heavy urban traffic to deliver your crucial shipping items immediately.",
      features: ["Same-Day courier dispatch", "Weatherproof locked cargo holds", "Rapid multi-drop distributions", "Perfect for high-value delicate payloads"]
    },
    {
      id: "last-mile",
      title: "Last-Mile Delivery",
      description: "Efficient final destination delivery service.",
      detailedDescription: "The vital link between distributions centers and final consumer sites. We specialize in residential parcel drops, commercial doorstep freight delivery, and white-glove setup options to leave your final clients deeply satisfied.",
      features: ["Dynamic routing technology", "Curbside or inside drop-off schedules", "Live signature & image proof of delivery", "Specialized fragile handling protocols"]
    },
    {
      id: "commercial-logistics",
      title: "Commercial Logistics",
      description: "Transportation solutions for businesses.",
      detailedDescription: "Enterprise-grade supply chain logistics catering to storage delivery, multi-branch distribution, retail replenishment, and raw materials carriage. Enjoy deep service agreement pricing and a dedicated CTNS dispatch manager.",
      features: ["Dedicated corporate accounts", "B2B freight distribution routes", "Consistent branch restocking services", "Comprehensive monthly digital reporting logs"]
    },
    {
      id: "scheduled-deliveries",
      title: "Scheduled Deliveries",
      description: "Recurring transportation services.",
      detailedDescription: "Consolidate your daily, weekly, or routine bi-weekly freight transfer requirements. Program your custom routes in our calendar scheduling engine once, and rest assured we'll execute on-time, every time, automatically.",
      features: ["Guaranteed fleet availability", "Locked-in pricing tiers", "Daily/Weekly fixed-window dispatching", "Assigned seasoned routine drivers"]
    },
    {
      id: "expedited-freight",
      title: "Expedited Freight",
      description: "Urgent deliveries handled with priority.",
      detailedDescription: "When hours mean dollars. Enjoy priority hotshot routing with instant dispatch trigger. Your freight is loaded and immediately headed to its target without cross-docking, intermediate stops, or schedule delays.",
      features: ["Immediate target team dispatch", "Dedicated continuous direct routing", "Live GPS mileage & speed tracking", "Guaranteed delivery time windows"]
    }
  ];

  const getServiceIcon = (id: string) => {
    switch(id) {
      case "box-truck": return <Truck className="w-8 h-8 text-white" />;
      case "cargo-van": return <Package className="w-8 h-8 text-white" />;
      case "last-mile": return <Navigation2 className="w-8 h-8 text-white" />;
      case "commercial-logistics": return <Briefcase className="w-8 h-8 text-white" />;
      case "scheduled-deliveries": return <CalendarClock className="w-8 h-8 text-white" />;
      case "expedited-freight": return <Zap className="w-8 h-8 text-white" />;
      default: return <Truck className="w-8 h-8 text-white" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white font-sans scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-logistics-blue/5 py-1.5 px-3.5 rounded-full border border-logistics-blue/5">
            <span className="w-1.5 h-1.5 bg-logistics-orange rounded-full" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
              WHAT WE DO BEST
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3.5xl sm:text-4xl text-logistics-blue tracking-tight">
            Comprehensive Transportation & Delivery Services
          </h2>
          <p className="text-slate-500 text-sm sm:text-md leading-relaxed">
            From quick local hotshots in premium cargo vans to commercial bulk freight in heavy box trucks, we provide flexible carrier services tailored precisely to your schedule.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F8FAFC] border border-slate-100 p-8 rounded-2xl flex flex-col justify-between hover:shadow-xl hover:border-slate-200/60 transition-all group"
            >
              <div className="space-y-5 text-left">
                {/* Icon Wrapper */}
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-[#FF6B00] blur-md opacity-30 rounded-xl group-hover:opacity-50 transition-opacity" />
                  <div className="relative p-3.5 bg-gradient-to-br from-[#FF6B00] to-orange-600 rounded-xl shadow-lg shadow-logistics-orange/20 text-white">
                    {getServiceIcon(service.id)}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-logistics-blue group-hover:text-logistics-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-5 border-t border-slate-200/40 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-logistics-blue hover:text-logistics-orange font-mono uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Read Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onSelectService(service.title)}
                  className="bg-transparent hover:bg-logistics-blue text-logistics-blue hover:text-white px-3.5 py-1.5 rounded-lg border border-logistics-blue/25 hover:border-logistics-blue text-xs font-bold transition-all cursor-pointer"
                >
                  Book Service
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Modal Overlay for Deep Service Details */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col z-10"
              >
                {/* Banner Header Accent */}
                <div className="bg-logistics-blue p-6 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="p-2 bg-logistics-orange rounded-lg text-white">
                      {getServiceIcon(selectedService.id)}
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-lg leading-relaxed">{selectedService.title}</h4>
                      <p className="text-xs text-white/60 font-mono">Premium Transport Spec</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 text-left space-y-6 max-h-[70vh] overflow-y-auto">
                  <div className="space-y-2">
                    <h5 className="text-xs font-mono font-bold text-logistics-orange uppercase tracking-wide">
                      Core Operations Overview
                    </h5>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">
                      {selectedService.detailedDescription}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-mono font-bold text-logistics-orange uppercase tracking-wide">
                      Key Capabilities Included
                    </h5>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trust disclaimer */}
                  <div className="p-3.5 bg-[#F8FAFC] border border-slate-100 rounded-xl text-[11px] text-slate-500 leading-normal">
                    💡 All transport is handled by dedicated licensed drivers. Up to $100K standard cargo insurance protection limits is included in every base shipping calculation. Customizable up-values are available upon booking checkout request.
                  </div>
                </div>

                {/* Modal Actions Footer */}
                <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Close Sheet
                  </button>
                  <button
                    onClick={() => {
                      onSelectService(selectedService.title);
                      setSelectedService(null);
                    }}
                    className="bg-logistics-orange hover:bg-logistics-orange-hover text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Request This ServiceNow</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
