export default {
  requirePresent: function() {
    let name;
    let obj;
    if (arguments.length === 2) {
      name = arguments[0];
      obj = arguments[1];
    } else {
      name = 'argument';
      obj = arguments[0];
    }

    if (!obj) {
      throw new Error(name + ' is required');
    } else {
      return obj;
    }
  },
}
