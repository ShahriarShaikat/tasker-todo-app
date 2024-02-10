const isBoolean = (val) => "boolean" === typeof val;

export function isValidate(data) {
  const { title, description, priority, complete } = data;
  if (
    title &&
    description &&
    priority &&
    isBoolean(complete) &&
    title.length > 0 &&
    description.length > 0 &&
    priority.length > 0
  ) {
    return true;
  } else {
    return false;
  }
}

export function getNextID(state) {
  if (state.length == 0) {
    return 1;
  } else {
    const bigID = state.reduce(
      (accumulator, current) =>
        current.id > accumulator ? current.id : accumulator,
      0
    );
    return bigID + 1;
  }
}
