/**
 * Monitor a DOM element's shape, calling the callback when it changes.
 *
 * Returns an object with a stop() method to stop polling
 *
 *
 * ref - ref object to the DOM element to monitor
 * callback of the form ({ width, height }) that will be called when the shape changes
 */
export default (ref, callback) => {
  let shape;

  const intervalId = setInterval(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (
        !shape ||
        shape.width != rect.width ||
        shape.height != rect.height
      ) {
        shape = { width: rect.width, height: rect.height };
        callback(shape);
      }
    }
  }, 10);

  return {
    stop: () => clearInterval(intervalId)
  };
}
