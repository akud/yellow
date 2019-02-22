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
  const array = requireArray(name, value);

  return requireCondition(
    requireArray(value).length === n,
    value,
    expectationMessage(name, value, 'an array of length ' + n)
  );
}

export default {
  requirePresent,
  requireArray,
  requireArrayOfLength,
}
