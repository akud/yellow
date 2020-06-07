const TOP = {
  isPrimary: () => false,
  getName: () => 'TOP',
  isSpatiallyOriented: () => true,
  getAngle: jest.fn(),
  getOrientationRating: jest.fn(),
  mockReset: () => { TOP.getAngle.mockReset(); TOP.getOrientationRating.mockReset(); }
};
const BOTTOM = {
  isPrimary: () => false,
  getName: () => 'BOTTOM',
  isSpatiallyOriented: () => true,
  getAngle: jest.fn(),
  getOrientationRating: jest.fn(),
  mockReset: () => { BOTTOM.getAngle.mockReset(); BOTTOM.getOrientationRating.mockReset(); }
};
const LEFT = {
  isPrimary: () => false,
  getName: () => 'LEFT',
  isSpatiallyOriented: () => true,
  getAngle: jest.fn(),
  getOrientationRating: jest.fn(),
  mockReset: () => { LEFT.getAngle.mockReset(); LEFT.getOrientationRating.mockReset(); }
};
const RIGHT = {
  isPrimary: () => false,
  getName: () => 'RIGHT',
  isSpatiallyOriented: () => true,
  getAngle: jest.fn(),
  getOrientationRating: jest.fn(),
  mockReset: () => { RIGHT.getAngle.mockReset(); RIGHT.getOrientationRating.mockReset(); }
};
const TOP_RIGHT = {
  isPrimary: () => false,
  getName: () => 'TOP_RIGHT',
  isSpatiallyOriented: () => true,
  getAngle: jest.fn(),
  getOrientationRating: jest.fn(),
  mockReset: () => { TOP_RIGHT.getAngle.mockReset(); TOP_RIGHT.getOrientationRating.mockReset(); }
};
const TOP_LEFT = {
  isPrimary: () => false,
  getName: () => 'TOP_LEFT',
  isSpatiallyOriented: () => true,
  getAngle: jest.fn(),
  getOrientationRating: jest.fn(),
  mockReset: () => { TOP_LEFT.getAngle.mockReset(); TOP_LEFT.getOrientationRating.mockReset(); }
};
const BOTTOM_RIGHT = {
  isPrimary: () => false,
  getName: () => 'BOTTOM_RIGHT',
  isSpatiallyOriented: () => true,
  getAngle: jest.fn(),
  getOrientationRating: jest.fn(),
  mockReset: () => { BOTTOM_RIGHT.getAngle.mockReset(); BOTTOM_RIGHT.getOrientationRating.mockReset(); }
};
const BOTTOM_LEFT = {
  isPrimary: () => false,
  getName: () => 'BOTTOM_LEFT',
  isSpatiallyOriented: () => true,
  getAngle: jest.fn(),
  getOrientationRating: jest.fn(),
  mockReset: () => { BOTTOM_LEFT.getAngle.mockReset(); BOTTOM_LEFT.getOrientationRating.mockReset(); }
};
const PRIMARY = {
  isPrimary: () => true,
  getName: () => 'PRIMARY',
  isSpatiallyOriented: () => false,
  getAngle: () => null,
  getOrientationRating: () => true,
};
const UNSPECIFIED = {
  isPrimary: () => false,
  getName: () => 'UNSPECIFIED',
  isSpatiallyOriented: () => false,
  getAngle: () => null,
  getOrientationRating: () => true,
};

export const resetMockOrientations = () => {
  TOP.mockReset();
  BOTTOM.mockReset();
  LEFT.mockReset();
  RIGHT.mockReset();
  TOP_LEFT.mockReset();
  TOP_RIGHT.mockReset();
  BOTTOM_LEFT.mockReset();
  BOTTOM_RIGHT.mockReset();
}

export default {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
  TOP_RIGHT,
  TOP_LEFT,
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
}
