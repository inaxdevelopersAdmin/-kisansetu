import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.middleware';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'krishimitara_super_secret_jwt_key_2026';

const DEMO_USERS = [
  {
    id: 'demo-farmer-1',
    phone: '+919876543210',
    name: 'Ramesh Patel',
    role: 'FARMER',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    language: 'hi',
  },
  {
    id: 'demo-lab-1',
    phone: '+919876543211',
    name: 'Krishi Vigyan Soil Lab',
    role: 'AGRI_LAB',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    language: 'hi',
  },
  {
    id: 'demo-trans-1',
    phone: '+919876543212',
    name: 'Gurkirat Logistics',
    role: 'TRANSPORTER',
    state: 'Punjab',
    district: 'Ludhiana',
    language: 'pa',
  },
  {
    id: 'demo-govt-1',
    phone: '+919876543213',
    name: 'Agriculture Officer Bhopal',
    role: 'GOVERNMENT',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    language: 'hi',
  },
  {
    id: 'demo-agro-1',
    phone: '+919876543214',
    name: 'Kisan Agro Seed Corp',
    role: 'AGRO_COMPANY',
    state: 'Maharashtra',
    district: 'Pune',
    language: 'mr',
  },
];

router.post('/login', (req: Request, res: Response) => {
  const { phone, otp, role } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // Find user or generate demo profile
  let user = DEMO_USERS.find((u) => u.phone === phone);
  if (!user) {
    user = {
      id: `user-${Date.now()}`,
      phone,
      name: 'Kisan Mitra',
      role: role || 'FARMER',
      state: 'Madhya Pradesh',
      district: 'Sehore',
      language: 'hi',
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
      phone: user.phone,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  return res.json({
    message: 'Authentication successful',
    token,
    user,
  });
});

router.get('/me', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const current = DEMO_USERS.find((u) => u.id === req.user?.id) || {
    id: req.user?.id || 'demo-farmer-1',
    name: req.user?.name || 'Ramesh Patel',
    phone: req.user?.phone || '+919876543210',
    role: req.user?.role || 'FARMER',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    language: 'hi',
  };

  return res.json({ user: current });
});

router.get('/roles', (_req: Request, res: Response) => {
  return res.json({
    roles: [
      { id: 'FARMER', label: 'Farmer (किसान)', description: 'Crop advice, Khata book, soil testing, market sales' },
      { id: 'AGRI_LAB', label: 'Agricultural Lab (प्रयोगशाला)', description: 'Soil & water sample testing, digital reports' },
      { id: 'TRANSPORTER', label: 'Transport Provider (वाहन चालक / लॉजिस्टिक्स)', description: 'Farm to mandi harvest transit, vehicle listing' },
      { id: 'GOVERNMENT', label: 'Government / Institution (सरकारी अधिकारी)', description: 'Schemes, advisories, subsidy verification' },
      { id: 'AGRO_COMPANY', label: 'Agro Company (कृषि कंपनी / क्रेता)', description: 'Direct procurement, certified inputs' },
      { id: 'SPONSOR_NGO', label: 'Sponsor / NGO (सहयोगी संस्था)', description: 'Rural upliftment, training programs' },
    ],
  });
});

export default router;
