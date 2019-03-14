const extractArgs = (args, ...extraArgNames) => {
  let name;
  let value;
  let extraArgStartingIndex;
  if (args.length >= 2 + extraArgNames.length) {
    name = args[0];
    value = args[1];
    extraArgStartingIndex = 2;
  } else {
    name = 'argument';
    value = args[0];
    extraArgStartingIndex = 1;
  }

  const extraArgValues = {};
  extraArgNames.forEach((argName, i) => {
    extraArgValues[argName] = args[extraArgStartingIndex + i];
  });

  return Object.assign({ name, value }, extraArgValues);
}

const requireCondition = (pass, value, message) => {
  if (!pass) {
    throw new Error(message);
  } else {
    return value;
  }
}

const expectationMessage = (name, value, requirement) => {
  try {
    value = JSON.stringify(value);
  } catch {
    // Ignore
  }

  return `Expected ${name} to be ${requirement}; got ${value}.`;

}

export const requirePresent = function() {
  const { name, value } = extractArgs(arguments);
  return requireCondition(
    !!value,
    value,
    expectationMessage(name, value, 'present')
  );
}

export const requireArray = function() {
  const { name, value } = extractArgs(arguments);
  return requireCondition(
    Array.isArray(value),
    value,
    expectationMessage(name, value, 'an array')
  );
}

export const requireArrayOfLength = function() {
  const { name, value, n } = extractArgs(arguments, 'n');

  return requireCondition(
    requireArray(name, value).length === n,
    value,
    expectationMessage(name, value, 'an array of length ' + n)
  );
}

export const requireOneOf = function() {
  const { name, value, allowedValues } = extractArgs(arguments, 'allowedValues');
  return requireCondition(
    allowedValues.indexOf(value) !== -1,
    value,
    expectationMessage(name, value, 'one of ' + JSON.stringify(allowedValues))
  );
}

export const requirePositionObject = function() {
  const { name, value } = extractArgs(arguments);
  requirePresent(value);

  return requireCondition(
    typeof value === 'object' && typeof value.x === 'number' && typeof value.y === 'number',
    value,
    expectationMessage(name, value, 'a position object')
  );
}

export const requireInstanceOf = function() {
  const { name, value, clazz } = extractArgs(arguments, 'clazz');
  return requireCondition(
    requirePresent(value) instanceof clazz,
    value,
    expectationMessage(name, value, 'an instance of ' + clazz)
  );
}

export const requireGreaterThanZero = function() {
  const { name, value } = extractArgs(arguments);
  return requireCondition(
    typeof value === 'number' && value > 0,
    value,
    expectationMessage(name, value, 'a number greater than zero')
  );
}

export const makeArray = (array) => Array.isArray(array) ? array : [array];

export const flatten = (array) => {
  const result = [];
  makeArray(array).forEach(element => {
    makeArray(element).forEach(sub => {
      result.push(sub);
    });
  });
  return result;
};

export default {
  requirePresent,
  requireArray,
  requireArrayOfLength,
  requireOneOf,
  requirePositionObject,
  requireInstanceOf,
  requireGreaterThanZero,
  makeArray,
  flatten,
}
