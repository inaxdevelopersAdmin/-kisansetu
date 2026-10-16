import { Router, Request, Response } from 'express';
import { sampleMarketItems } from '../data/mockData';
import { MarketItem } from '../types';

const router = Router();
let items: MarketItem[] = [...sampleMarketItems];

const liveMandiRates = [
  { commodity: 'Wheat (गेहूं)', variety: 'Sharbati/Lokwan', mandi: 'Indore Mandi', minPrice: 2450, maxPrice: 3100, modalPrice: 2820, trend: '+₹40' },
  { commodity: 'Paddy / Rice (धान)', variety: 'Pusa Basmati 1509', mandi: 'Karnal Mandi', minPrice: 3200, maxPrice: 4100, modalPrice: 3850, trend: '+₹110' },
  { commodity: 'Soybean (सोयाबीन)', variety: 'Yellow Yellow', mandi: 'Ujjain Mandi', minPrice: 4200, maxPrice: 4750, modalPrice: 4620, trend: '-₹30' },
  { commodity: 'Mustard (सरसों)', variety: 'Bold 42% Oil', mandi: 'Jaipur Mandi', minPrice: 5100, maxPrice: 5650, modalPrice: 5480, trend: '+₹75' },
  { commodity: 'Cotton (कपास)', variety: 'Medium Staple', mandi: 'Rajkot Mandi', minPrice: 6800, maxPrice: 7600, modalPrice: 7350, trend: '+₹150' },
  { commodity: 'Onion (प्याज)', variety: 'Nashik Red', mandi: 'Lasalgaon Mandi', minPrice: 1200, maxPrice: 1850, modalPrice: 1620, trend: '-₹50' },
  { commodity: 'Potato (आलू)', variety: 'Jyoti / Pukhraj', mandi: 'Agra Mandi', minPrice: 1100, maxPrice: 1450, modalPrice: 1320, trend: '+₹20' },
];

router.get('/items', (_req: Request, res: Response) => {
  return res.json({ items });
});

router.post('/items', (req: Request, res: Response) => {
  const { cropName, variety, quantityQtl, expectedRate, mandiLocation, sellerName, sellerPhone } = req.body;

  if (!cropName || !quantityQtl || !expectedRate) {
    return res.status(400).json({ error: 'Crop name, quantity, and expected rate are required' });
  }

  const newItem: MarketItem = {
    id: `mkt-${Date.now()}`,
    cropName,
    variety: variety || 'Standard Quality',
    quantityQtl: Number(quantityQtl),
    expectedRate: Number(expectedRate),
    mandiLocation: mandiLocation || 'Nearby District APMC',
    sellerName: sellerName || 'Kisan Producer',
    sellerPhone: sellerPhone || '+91 98000 00000',
    postedDate: new Date().toISOString().split('T')[0],
  };

  items.unshift(newItem);
  return res.status(201).json({ success: true, item: newItem });
});

router.get('/mandi-rates', (_req: Request, res: Response) => {
  return res.json({
    updatedAt: new Date().toISOString(),
    rates: liveMandiRates,
  });
});

export default router;
