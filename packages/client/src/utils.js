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

export const requireCondition = function() {
  const pass = arguments[0];
  const value = arguments.length === 3 ? arguments[1] : undefined;
  const message = arguments.length === 3 ? arguments[2] : arguments[1];

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

export const requireFunction = function() {
  const { name, value } = extractArgs(arguments);
  return requireCondition(
    typeof value === 'function',
    value,
    expectationMessage(name, value, 'a function')
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

export const requireBetween = function() {
  const { name, value, min, max } = extractArgs(arguments, 'min', 'max');
  return requireCondition(
    typeof value === 'number' && (min <= value) && (value <= max),
    value,
    expectationMessage(name, value, 'a number between ' + min + ' and ' + max)
  )
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

export const requireNonNegative = function() {
  const { name, value } = extractArgs(arguments);
  return requireCondition(
    typeof value === 'number' && value >= 0,
    value,
    expectationMessage(name, value, 'a number greater than or equal to zero')
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

export const isWithin = (num1, num2, tolerance) => Math.abs(num1 - num2) < tolerance;

export default {
  requireCondition,
  requirePresent,
  requireFunction,
  requireArray,
  requireArrayOfLength,
  requireOneOf,
  requireBetween,
  requirePositionObject,
  requireInstanceOf,
  requireGreaterThanZero,
  requireNonNegative,
  makeArray,
  flatten,
  isWithin,
}
