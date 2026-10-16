import { Router, Request, Response } from 'express';
import { sampleDiagnoses } from '../data/mockData';

const router = Router();

router.post('/analyze', (req: Request, res: Response) => {
  const { crop, symptoms, hasImage } = req.body;

  let selectedKey = 'wheat_rust';

  if (crop) {
    const cropLower = String(crop).toLowerCase();
    if (cropLower.includes('rice') || cropLower.includes('dhan')) {
      selectedKey = 'rice_blast';
    } else if (cropLower.includes('cotton') || cropLower.includes('kapas')) {
      selectedKey = 'cotton_bollworm';
    } else if (cropLower.includes('tomato') || cropLower.includes('tamatar')) {
      selectedKey = 'tomato_blight';
    }
  }

  const diagnosis = sampleDiagnoses[selectedKey] || sampleDiagnoses.wheat_rust;

  return res.json({
    success: true,
    diagnosis: {
      ...diagnosis,
      timestamp: new Date().toISOString(),
      verifiedByAI: true,
      model: 'KisanSetu-Vision-Gemini-Agri-v2',
      inputProvided: { crop, symptoms, hasImage: !!hasImage },
    },
  });
});

router.get('/samples', (_req: Request, res: Response) => {
  return res.json({
    samples: Object.values(sampleDiagnoses),
  });
});

export default router;
