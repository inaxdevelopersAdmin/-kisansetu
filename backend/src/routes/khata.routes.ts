import { Router, Response } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.middleware';
import { initialKhataTransactions } from '../data/mockData';
import { KhataTransaction } from '../types';

const router = Router();
let transactions: KhataTransaction[] = [...initialKhataTransactions];

router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id || 'demo-farmer-1';
  const userEntries = transactions.filter((t) => t.userId === userId || t.userId === 'demo-farmer-1');

  const totalIncome = userEntries
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = userEntries
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return res.json({
    transactions: userEntries,
    summary: {
      totalIncome,
      totalExpense,
      netBalance,
      entryCount: userEntries.length,
    },
  });
});

router.post('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { type, category, amount, description, clientSyncId, date } = req.body;

  if (!type || !amount || !category) {
    return res.status(400).json({ error: 'Type, category, and amount are required' });
  }

  const newEntry: KhataTransaction = {
    id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId: req.user?.id || 'demo-farmer-1',
    clientSyncId: clientSyncId || undefined,
    type,
    category,
    amount: Number(amount),
    description: description || '',
    date: date || new Date().toISOString(),
    syncStatus: 'SYNCED',
  };

  transactions.unshift(newEntry);
  return res.status(201).json({ success: true, transaction: newEntry });
});

// Offline-First Sync Queue Endpoint
router.post('/sync', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { queue } = req.body; // array of offline queue items
  const userId = req.user?.id || 'demo-farmer-1';

  if (!Array.isArray(queue)) {
    return res.status(400).json({ error: 'Queue must be an array of transactions' });
  }

  const syncedItems: KhataTransaction[] = [];

  for (const item of queue) {
    // Avoid duplicate sync if clientSyncId already present
    const existing = transactions.find(
      (t) => t.clientSyncId && t.clientSyncId === item.clientSyncId
    );

    if (existing) {
      syncedItems.push(existing);
    } else {
      const newEntry: KhataTransaction = {
        id: `tx-synced-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        userId,
        clientSyncId: item.clientSyncId,
        type: item.type,
        category: item.category,
        amount: Number(item.amount),
        description: item.description || '',
        date: item.date || new Date().toISOString(),
        syncStatus: 'SYNCED',
      };
      transactions.unshift(newEntry);
      syncedItems.push(newEntry);
    }
  }

  return res.json({
    success: true,
    message: `Successfully synchronized ${syncedItems.length} transactions from offline queue`,
    syncedItems,
  });
});

router.delete('/:id', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  transactions = transactions.filter((t) => t.id !== id);
  return res.json({ success: true, message: 'Transaction removed' });
});

export default router;
