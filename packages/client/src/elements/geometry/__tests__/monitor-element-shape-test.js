import monitorElementShape from '../monitor-element-shape';

describe('monitorElementShape', () => {

  let callback;
  let ref;

  beforeEach(() => {
    jest.useFakeTimers();
    callback = jest.fn();
  });

  it('does nothing if there is no current value on the ref', () => {
    monitorElementShape({}, callback);
    jest.runOnlyPendingTimers();
    expect(callback).not.toHaveBeenCalled();
    expect(clearInterval).not.toHaveBeenCalled();
  });

  it('picks up a new current value', () => {
    const ref = {};
    monitorElementShape(ref, callback);
    jest.runOnlyPendingTimers();
    expect(callback).not.toHaveBeenCalled();

    ref.current = newElement({ width: 42, height: 10 });

    jest.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledOnceWith({ width: 42, height: 10 });
    expect(clearInterval).not.toHaveBeenCalled();
  });

  it('makes subsequent calls to the callback if the shape changes', () => {
    const ref = { current: newElement({ width: 57, height: 4 }) };

    monitorElementShape(ref, callback);
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledOnceWith({ width: 57, height: 4 });

    ref.current = newElement({ width: 42436, height: 9213475 });
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledWith({ width: 42436, height: 9213475 });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(clearInterval).not.toHaveBeenCalled();
  });

  it('returns an object that can stop polling', () => {
    const monitor = monitorElementShape(ref, callback);

    expect(clearInterval).not.toHaveBeenCalled();

    monitor.stop();

    expect(clearInterval).toHaveBeenCalledOnce();
  });


  const newElement = ({width=10, height=10}) => ({
    getBoundingClientRect: jest.fn().mockReturnValue({ width, height }),
  });
});
