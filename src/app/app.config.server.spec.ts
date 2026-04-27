import { config } from './app.config.server';

describe('app.config.server', () => {
  it('should provide server application config', () => {
    expect(config).toBeTruthy();
    expect(config.providers).toBeDefined();
    expect((config.providers ?? []).length).toBeGreaterThan(0);
  });
});