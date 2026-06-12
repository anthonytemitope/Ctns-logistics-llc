/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Truck, Ruler, Sparkles, Scale, Info, Check } from "lucide-react";
import { motion } from "motion/react";
import { FleetItem } from "../types";

interface FleetProps {
  onVehicleSelect: (vehicleType: string) => void;
}

export default function Fleet({ onVehicleSelect }: FleetProps) {
  const [activeTab, setActiveTab] = useState<"all" | "box" | "van">("all");

  const fleetList: FleetItem[] = [
    {
      id: "box-truck-spec",
      name: "High-Capacity Commercial Box Truck",
      capacity: "Up to 8 Pallets",
      payload: "10,000 lbs Max Payload Capacity",
      dimensions: '26ft Length x 96" Width x 96" Height',
      idealFor: "Medium-to-large business freight, warehouse inventory movements, heavy palletized loads, and corporate supply chains.",
      image: "/src/assets/images/ctns_box_truck_1781264203540.jpg",
      tag: "Heavy Freight",
      specs: {
        engine: "6.7L Cummins Turbo Diesel",
        fuelType: "Diesel / Ultra-Low Sulfur",
        cargoVolume: "1,600 cubic feet available"
      }
    },
    {
      id: "cargo-van-spec",
      name: "Expedited High-Roof Cargo Van",
      capacity: "Up to 2 Pallets",
      payload: "3,500 lbs Max Payload Capacity",
      dimensions: '14ft Length x 70" Width x 76" Height',
      idealFor: "Last-mile home parcel shipments, medical sample sprints, urgent tech parts deliveries, and flexible inner-city corridors.",
      image: "/src/assets/images/ctns_cargo_van_1781264218206.jpg",
      tag: "Expedited Courier",
      specs: {
        engine: "3.5L EcoBoost V6Twin-scroll Gas",
        fuelType: "Unleaded Regular",
        cargoVolume: "450 cubic feet available"
      }
    }
  ];

  const filteredFleetList = fleetList.filter(v => {
    if (activeTab === "all") return true;
    if (activeTab === "box") return v.tag === "Heavy Freight";
    if (activeTab === "van") return v.tag === "Expedited Courier";
    return true;
  });

  return (
    <section id="fleet" className="py-20 md:py-28 bg-[#F8FAFC] font-sans scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-logistics-blue/5 py-1.5 px-3.5 rounded-full border border-logistics-blue/5">
            <span className="w-1.5 h-1.5 bg-logistics-orange rounded-full" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
              OUR PROFESSIONAL FLEET
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3.5xl sm:text-4xl text-logistics-blue tracking-tight">
            Engineered For Speed & Payload Compliance
          </h2>
          <p className="text-slate-500 text-sm sm:text-md leading-relaxed">
            We operate fully equipped commercial Box Trucks and high-roof Cargo Vans, meticulously maintained and secure.
          </p>

          {/* Quick tab filters */}
          <div className="inline-flex bg-slate-200/60 p-1.5 rounded-xl border border-slate-200 pt-1.5">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all cursor-pointer ${
                activeTab === "all" ? "bg-[#0A2540] text-white shadow-sm" : "text-slate-600 hover:text-[#0A2540]"
              }`}
            >
              Show All Fleet
            </button>
            <button
              onClick={() => setActiveTab("box")}
              className={`px-4.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all cursor-pointer ${
                activeTab === "box" ? "bg-[#0A2540] text-white shadow-sm" : "text-slate-600 hover:text-[#0A2540]"
              }`}
            >
              Box Trucks
            </button>
            <button
              onClick={() => setActiveTab("van")}
              className={`px-4.5 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all cursor-pointer ${
                activeTab === "van" ? "bg-[#0A2540] text-white shadow-sm" : "text-slate-600 hover:text-[#0A2540]"
              }`}
            >
              Cargo Vans
            </button>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredFleetList.map((vehicle) => (
            <div
              key={vehicle.id}
              id={vehicle.id}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col group"
            >
              {/* Image Section */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay Badge */}
                <span className="absolute top-4 left-4 bg-logistics-orange font-mono text-[10px] font-extrabold text-white px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                  {vehicle.tag}
                </span>
                
                {/* Bottom glass spec bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-5 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Scale className="w-5 h-5 text-logistics-orange shrink-0" />
                    <span className="text-sm font-semibold tracking-wide font-display">{vehicle.payload}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ruler className="w-5 h-5 text-logistics-orange shrink-0" />
                    <span className="text-sm font-semibold tracking-wide font-display">{vehicle.dimensions.split(" x ")[0]} class</span>
                  </div>
                </div>
              </div>

              {/* Text Specs Section */}
              <div className="p-6 sm:p-8 text-left flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="font-display font-extrabold text-xl text-logistics-blue">
                    {vehicle.name}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {vehicle.idealFor}
                  </p>

                  {/* Physical details grid */}
                  <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-[11px] text-slate-500 font-mono">
                    <div className="space-y-1">
                      <span className="text-slate-400 block font-sans uppercase tracking-[0.05em] text-[9px]">DIESEL/GAS LIMITS</span>
                      <span className="font-semibold text-slate-800">{vehicle.specs.fuelType.split("Gas")[0]}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block font-sans uppercase tracking-[0.05em] text-[9px]">ENGINE SPEC</span>
                      <span className="font-semibold text-slate-800">{vehicle.specs.engine.split("Gas")[0]}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block font-sans uppercase tracking-[0.05em] text-[9px]">CONTAINER SIZE</span>
                      <span className="font-semibold text-slate-800">{vehicle.specs.cargoVolume}</span>
                    </div>
                  </div>

                  {/* Capability checkpoints */}
                  <ul className="space-y-2 pt-2 text-xs text-slate-600 font-sans">
                    <li className="flex items-center space-x-2">
                      <div className="p-0.5 bg-green-100 text-green-700 rounded">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Fully enclosed weatherproof hard-side enclosure</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="p-0.5 bg-green-100 text-green-700 rounded">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Equipped with cargo tie-down hooks and safety blankets</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-slate-400 text-xs">
                    <Info className="w-4 h-4 text-logistics-orange shrink-0" />
                    <span>Real-time dispatch ready</span>
                  </div>
                  <button
                    onClick={() => onVehicleSelect(vehicle.tag === "Heavy Freight" ? "Box Truck (High Capacity)" : "Cargo Van (Expedited)")}
                    className="bg-logistics-blue hover:bg-logistics-orange text-white text-xs font-bold py-3 px-5 rounded-xl shadow transition-all cursor-pointer"
                  >
                    Select vehicle for Delivery
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
