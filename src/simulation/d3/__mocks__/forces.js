export const repellingForceName = 'repelling';
export const repellingForceValue = jest.fn();
export const RepellingForce = jest.fn().mockImplementation(() => ({
  getName: jest.fn().mockReturnValue(repellingForceName),
  getForce: jest.fn().mockReturnValue(repellingForceValue),
}));

export const centeringForceName = 'centering';
export const centeringForceValue = jest.fn();
export const CenteringForce = jest.fn().mockImplementation(() => ({
  getName: jest.fn().mockReturnValue(centeringForceName),
  getForce: jest.fn().mockReturnValue(centeringForceValue),
}));

export const collisionForceName = 'collision';
export const collisionForceValue = jest.fn();
export const CollisionForce = jest.fn().mockImplementation(() => ({
  getName: jest.fn().mockReturnValue(collisionForceName),
  getForce: jest.fn().mockReturnValue(collisionForceValue),
}));

export const linkForceName = 'link';
export const linkForceValue = jest.fn();
export const LinkForce = jest.fn().mockImplementation(() => ({
  getName: jest.fn().mockReturnValue(linkForceName),
  getForce: jest.fn().mockReturnValue(linkForceValue),
}));
