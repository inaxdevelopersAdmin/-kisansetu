import { Router, Request, Response } from 'express';
import { sampleTransportListings } from '../data/mockData';
import { TransportListing } from '../types';

const router = Router();
let listings: TransportListing[] = [...sampleTransportListings];
let bookings: any[] = [
  {
    id: 'book-1',
    farmerName: 'Ramesh Patel',
    farmerPhone: '+91 98765 43210',
    transporterName: 'Gurkirat Logistics',
    cropType: 'Wheat',
    tonnage: 6.5,
    pickup: 'Village Ashta, Sehore',
    drop: 'Sehore Krishi Upaj Mandi',
    status: 'CONFIRMED',
    bookingDate: '2026-04-16',
    estimatedFare: '₹2,730',
  },
];

router.get('/listings', (_req: Request, res: Response) => {
  return res.json({ listings });
});

router.post('/listings', (req: Request, res: Response) => {
  const { transporterName, phone, vehicleType, vehicleNumber, capacityTonnes, baseLocation, ratePerKm } = req.body;

  if (!transporterName || !vehicleType || !ratePerKm) {
    return res.status(400).json({ error: 'Required transporter fields missing' });
  }

  const newListing: TransportListing = {
    id: `trans-${Date.now()}`,
    transporterName,
    phone: phone || '+91 98000 00000',
    vehicleType,
    vehicleNumber: vehicleNumber || 'IND-TRANS',
    capacityTonnes: Number(capacityTonnes) || 5.0,
    baseLocation: baseLocation || 'Local District Hub',
    ratePerKm: Number(ratePerKm),
    available: true,
    rating: 5.0,
  };

  listings.unshift(newListing);
  return res.status(201).json({ success: true, listing: newListing });
});

router.post('/book', (req: Request, res: Response) => {
  const { farmerName, farmerPhone, transporterName, cropType, tonnage, pickup, drop, distanceKm, ratePerKm } = req.body;

  const fare = Math.round((Number(distanceKm) || 25) * (Number(ratePerKm) || 35));

  const newBooking = {
    id: `book-${Date.now()}`,
    farmerName: farmerName || 'Ramesh Patel',
    farmerPhone: farmerPhone || '+91 98765 43210',
    transporterName: transporterName || 'Kisan Express Mini-Trucks',
    cropType: cropType || 'Grains',
    tonnage: Number(tonnage) || 3.0,
    pickup: pickup || 'Farm gate',
    drop: drop || 'District APMC Mandi',
    status: 'CONFIRMED',
    bookingDate: new Date().toISOString().split('T')[0],
    estimatedFare: `₹${fare.toLocaleString('en-IN')}`,
  };

  bookings.unshift(newBooking);
  return res.status(201).json({ success: true, booking: newBooking });
});

router.get('/bookings', (_req: Request, res: Response) => {
  return res.json({ bookings });
});

export default router;
