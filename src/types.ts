/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  deliveryLocation: string;
  deliveryDate: string;
  vehicleType: string;
  shipmentDetails: string;
  status: 'Pending' | 'Confirmed' | 'In Transit' | 'Delivered' | 'Cancelled';
  trackingNumber: string;
  createdAt: string;
  estimatedCost?: number;
}

export interface Quote {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  shipmentDescription: string;
  vehicleType: string;
  estimatedDistance?: number;
  estimatedCost?: number;
  status: 'Pending' | 'Responded';
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
}

export interface FleetItem {
  id: string;
  name: string;
  capacity: string;
  payload: string;
  dimensions: string;
  idealFor: string;
  image: string;
  tag: string;
  specs: {
    engine: string;
    fuelType: string;
    cargoVolume: string;
  };
}
