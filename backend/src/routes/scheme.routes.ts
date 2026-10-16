import { Router, Request, Response } from 'express';
import { sampleGovSchemes } from '../data/mockData';

const router = Router();

const farmAdvisories = [
  {
    id: 'adv-1',
    season: 'Zaid / Summer 2026',
    crop: 'Moong & Urad (ग्रीष्मकालीन मूंग)',
    title: 'Yellow Mosaic Virus (YMV) Precaution',
    message: 'Whiteflies act as vectors for YMV in summer moong. Install yellow sticky traps and spray Thiamethoxam 25% WG @ 80g/acre at 20-25 days after sowing.',
    alertLevel: 'WARNING',
  },
  {
    id: 'adv-2',
    season: 'Kharif Preparation',
    crop: 'Cotton & Soybean',
    title: 'Pre-Monsoon Deep Summer Ploughing',
    message: 'Complete deep summer ploughing (Chisel or Disc plough) to expose soil-borne pupae and weed rhizomes to scorching sunlight.',
    alertLevel: 'INFO',
  },
  {
    id: 'adv-3',
    season: 'Weather Alert',
    crop: 'All Standing Crops',
    title: 'Unseasonal Thunderstorms & Hail Warning',
    message: 'IMD predicts scattered thunderstorm activity with gusty winds (35-45 kmph) over Central India. Postpone fertilizer broadcasting and irrigate light.',
    alertLevel: 'CRITICAL',
  },
];

router.get('/schemes', (req: Request, res: Response) => {
  const { category, search } = req.query;
  let result = [...sampleGovSchemes];

  if (category) {
    result = result.filter((s) => s.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const query = String(search).toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.nameHindi.toLowerCase().includes(query) ||
        s.benefit.toLowerCase().includes(query)
    );
  }

  return res.json({ schemes: result });
});

router.get('/advisories', (_req: Request, res: Response) => {
  return res.json({ advisories: farmAdvisories });
});

export default router;
