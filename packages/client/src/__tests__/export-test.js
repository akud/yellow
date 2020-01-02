import Export from '../export';

describe('export', () => {
  it('loads successfully', () => {
    expect(Export.Graph).toBeTruthy();
    expect(Export.Node).toBeTruthy();
    expect(Export.Edge).toBeTruthy();
  });
});
