import app from '../src/app';

describe('Krishimitara Backend API Tests', () => {
  it('verifies Express app is instantiated correctly', () => {
    expect(app).toBeDefined();
  });

  it('verifies environment default port', () => {
    const port = process.env.PORT || 4000;
    expect(Number(port)).toBe(4000);
  });
});
