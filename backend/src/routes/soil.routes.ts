import { Router, Response } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.middleware';
import { sampleSoilTests } from '../data/mockData';
import { SoilTest } from '../types';

const router = Router();
let soilTests: SoilTest[] = [...sampleSoilTests];

router.get('/', authenticateToken, (_req: AuthenticatedRequest, res: Response) => {
  return res.json({ soilTests });
});

router.post('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { sampleDetails, labName, farmerName, farmerPhone } = req.body;

  if (!sampleDetails) {
    return res.status(400).json({ error: 'Sample details are required' });
  }

  const newTest: SoilTest = {
    id: `soil-${Date.now()}`,
    farmerId: req.user?.id || 'demo-farmer-1',
    farmerName: farmerName || req.user?.name || 'Ramesh Patel',
    farmerPhone: farmerPhone || req.user?.phone || '+91 98765 43210',
    labName: labName || 'Krishi Vigyan Kendra Soil Testing Lab',
    sampleDetails,
    status: 'SUBMITTED',
    date: new Date().toISOString().split('T')[0],
  };

  soilTests.unshift(newTest);
  return res.status(201).json({ success: true, soilTest: newTest });
});

router.put('/:id/status', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status, nitrogen, phosphorus, potassium, ph, recommendation } = req.body;

  const testIndex = soilTests.findIndex((t) => t.id === id);
  if (testIndex === -1) {
    return res.status(404).json({ error: 'Soil test request not found' });
  }

  soilTests[testIndex] = {
    ...soilTests[testIndex],
    status: status || soilTests[testIndex].status,
    nitrogen: nitrogen !== undefined ? Number(nitrogen) : soilTests[testIndex].nitrogen,
    phosphorus: phosphorus !== undefined ? Number(phosphorus) : soilTests[testIndex].phosphorus,
    potassium: potassium !== undefined ? Number(potassium) : soilTests[testIndex].potassium,
    ph: ph !== undefined ? Number(ph) : soilTests[testIndex].ph,
    recommendation: recommendation || soilTests[testIndex].recommendation,
  };

  return res.json({ success: true, soilTest: soilTests[testIndex] });
});

export default router;
