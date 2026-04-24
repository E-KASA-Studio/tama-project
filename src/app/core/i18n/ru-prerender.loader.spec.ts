import { firstValueFrom } from 'rxjs';
import { RuPrerenderLoader } from './ru-prerender.loader';

describe('RuPrerenderLoader', () => {
  it('should return RU translations from local JSON', async () => {
    const loader = new RuPrerenderLoader();
    const translations = await firstValueFrom(loader.getTranslation('ru'));

    expect(Object.keys(translations).length).toBeGreaterThan(0);
    expect(translations['nav']).toBeDefined();
  });
});