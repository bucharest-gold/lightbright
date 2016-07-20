const records = new WeakMap();
const timings = [];

function timer(record) {
  if (record.step === 'init') {
    const e = {};
    Error.captureStackTrace(e);
    const stack = e.stack.split('\n').slice(5);
    const location = stack[0].match(/\W+at (\w+)\./)[1];
    records.set(record.handle, {
      location,
      stack,
      init: record.timestamp
    });
  } else if (record.step === 'post') {
    const trace = records.get(record.handle);
    trace.post = record.timestamp;
    trace.elapsed = trace.post - trace.pre;
    timings.push(trace);
  } else if (record.step === 'pre') {
    records.get(record.handle)[record.step] = record.timestamp;
  }
}

module.exports = {
  timer,
  timings: () => timings
};