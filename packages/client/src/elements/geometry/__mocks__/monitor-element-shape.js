export const mockMonitor = { stop: jest.fn() };
const monitorElementShape = jest.fn().mockReturnValue(mockMonitor);

export const setMockElementShape = ({ width, height }) => {
  monitorElementShape.mockImplementation((ref, callback) => callback({ width, height }));
}

export const resetMockElementShapeMonitor = () => {
  mockMonitor.stop.mockReset();
  monitorElementShape.mockClear();
  setMockElementShape({ width: 10, height: 10 });
}

export default monitorElementShape;
