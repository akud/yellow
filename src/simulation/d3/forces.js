import * as d3 from 'd3-force';

class Force {
  constructor(name, d3force) {
    this.name = name;
    this.d3force = d3force;
  }

  getName() {
    return this.name;
  }

  getForce() {
    return this.d3force;
  }
}

export class RepellingForce extends Force {
  constructor() {
    super('charge', d3.forceManyBody());
  }
}

export class CenteringForce extends Force {
  constructor(center) {
    super('center', d3.forceCenter(center.x, center.y))
  }
}

export class CollisionForce extends Force {
  constructor() {
    super('collision', d3.forceCollide().radius(n => n.getCollisionRadius()));
  }
}

export class LinkForce extends Force {
  constructor(links) {
    super('link', d3.forceLink(links)
      .distance(l => l.getDistance())
      .id(n => n.id)
    );
  }
}
