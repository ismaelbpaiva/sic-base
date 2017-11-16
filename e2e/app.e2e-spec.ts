import { SicBasePage } from './app.po';

describe('sic-base App', () => {
  let page: SicBasePage;

  beforeEach(() => {
    page = new SicBasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
