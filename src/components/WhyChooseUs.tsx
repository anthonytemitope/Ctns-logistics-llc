/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, 
  MapPin, 
  Smile, 
  Clock, 
  MessageSquareShare, 
  UserCheck, 
  Calendar, 
  PhoneCall, 
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { motion, useInView } from "motion/react";

export default function WhyChooseUs() {
  // Animated counters state
  const [deliveries, setDeliveries] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [ontime, setOntime] = useState(0);
  const [supportText, setSupportText] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  useEffect(() => {
    if (!isInView) return;

    // Fast-counting intervals
    let deliveriesCount = 0;
    const deliveriesTarget = 1000;
    const deliveriesInterval = setInterval(() => {
      deliveriesCount += 25;
      if (deliveriesCount >= deliveriesTarget) {
        setDeliveries(deliveriesTarget);
        clearInterval(deliveriesInterval);
      } else {
        setDeliveries(deliveriesCount);
      }
    }, 25);

    let customersCount = 0;
    const customersTarget = 500;
    const customersInterval = setInterval(() => {
      customersCount += 13;
      if (customersCount >= customersTarget) {
        setCustomers(customersTarget);
        clearInterval(customersInterval);
      } else {
        setCustomers(customersCount);
      }
    }, 25);

    let ontimeCount = 0;
    const ontimeTarget = 99;
    const ontimeInterval = setInterval(() => {
      ontimeCount += 2;
      if (ontimeCount >= ontimeTarget) {
        setOntime(ontimeTarget);
        clearInterval(ontimeInterval);
      } else {
        setOntime(ontimeCount);
      }
    }, 20);

    return () => {
      clearInterval(deliveriesInterval);
      clearInterval(customersInterval);
      clearInterval(ontimeInterval);
    };
  }, [isInView]);

  const reasons = [
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "On-Time Delivery",
      description: "We plan precise schedules around traffic telemetry to ensure we always hit customer arrival windows with zero delays."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Licensed & Insured",
      description: "Fully compliant with US DOT guidelines, carrying high liability cargo insurance coverage for ultimate customer safety."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-white" />,
      title: "Professional Drivers",
      description: "All our drivers are thoroughly vetted, commercial driver certified, background screened, and dressed in corporate uniform."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: "Reliable Service",
      description: "We have an extensive backup dispatch strategy, standby drivers, and a meticulously fully-maintained active fleet."
    },
    {
      icon: <MessageSquareShare className="w-6 h-6 text-white" />,
      title: "Real-Time Communication",
      description: "No blind spots. Customers enjoy instant dispatch text status notifications and direct cellular driver connection."
    },
    {
      icon: <Smile className="w-6 h-6 text-white" />,
      title: "Customer Satisfaction",
      description: "We maintain a flawless consumer feedback score. We support your logistics needs or make it right immediately."
    }
  ];

  return (
    <section 
      id="why-choose-us" 
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#0A2540] text-white font-sans scroll-mt-10 overflow-hidden relative"
    >
      {/* Decorative Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-logistics-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Why Choose Section headers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 py-1.5 px-3.5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 bg-logistics-orange rounded-full animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
                THE CTNS LOGISTICS EDGE
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3.5xl sm:text-4xl text-white tracking-tight leading-tight">
              A Higher Standard of Professional Cargo Transportation
            </h2>
          </div>
          <div className="lg:col-span-4 text-left">
            <p className="text-white/70 text-sm leading-relaxed">
              We look past the shipping point. Our goal is to streamline customer dispatch corridors, offering the exact vehicles, driver screening, and communication frameworks you need.
            </p>
          </div>
        </div>

        {/* Reasons Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-logistics-orange/40 p-8 rounded-2xl text-left transition-all"
            >
              <div className="flex items-center space-x-4 mb-5">
                <div className="p-3 bg-gradient-to-br from-[#FF6B00] to-orange-600 rounded-xl shadow-md border border-white/10">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Statistics Banner Cards Section */}
        <div className="border-t border-white/10 pt-16">
          <h3 className="text-xs font-mono tracking-widest uppercase text-white/50 mb-10 text-center font-bold">
            CTNS PERFORMANCE TRACK RECORD AT A GLANCE
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            
            {/* Stat Item 1 */}
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl text-center space-y-2">
              <span className="font-display font-extrabold text-3.5xl sm:text-4.5xl md:text-5xl text-[#FF6B00] block tracking-tight">
                {deliveries}+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                Deliveries Completed
              </span>
            </div>

            {/* Stat Item 2 */}
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl text-center space-y-2">
              <span className="font-display font-extrabold text-3.5xl sm:text-4.5xl md:text-5xl text-white block tracking-tight">
                {customers}+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                Happy Customers
              </span>
            </div>

            {/* Stat Item 3 */}
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl text-center space-y-2">
              <span className="font-display font-extrabold text-3.5xl sm:text-4.5xl md:text-5xl text-[#FF6B00] block tracking-tight">
                {ontime}%
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                On-Time Rate
              </span>
            </div>

            {/* Stat Item 4 */}
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl text-center space-y-2">
              <span className="font-display font-extrabold text-3.5xl sm:text-4.5xl md:text-5xl text-white block tracking-tight">
                24/7
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                Customer Support
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
