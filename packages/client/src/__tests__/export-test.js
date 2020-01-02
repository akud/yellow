import Yellow, {
  Elements,
  Simulations,
  Graphs,

  Graph,
  Node,
  Edge,
} from '../export';

describe('export', () => {
  it('exports on the default object', () => {
    expect(Yellow.Elements).toBeTruthy();
    expect(Yellow.Simulations).toBeTruthy();
    expect(Yellow.Graphs).toBeTruthy();

    expect(Yellow.Graph).toBeTruthy();
    expect(Yellow.Node).toBeTruthy();
    expect(Yellow.Edge).toBeTruthy();
  });

  it('exports named exports', () => {
    expect(Elements).toBeTruthy();
    expect(Simulations).toBeTruthy();
    expect(Graphs).toBeTruthy();

    expect(Graph).toBeTruthy();
    expect(Node).toBeTruthy();
    expect(Edge).toBeTruthy();
  });
});
