import { FirecoreModule } from './firecore.module';

describe('FirecoreModule', () => {
  let firecoreModule: FirecoreModule;

  beforeEach(() => {
    firecoreModule = new FirecoreModule();
  });

  it('should create an instance', () => {
    expect(firecoreModule).toBeTruthy();
  });
});
