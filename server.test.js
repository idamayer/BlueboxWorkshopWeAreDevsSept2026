const test = require('node:test');
const assert = require('node:assert/strict');
const { createDatabaseGate } = require('./server');

test('database gate queues work instead of failing immediately under burst traffic', async () => {
  const gate = createDatabaseGate(2, 100);
  const started = [];
  const completed = [];

  const worker = async (label) => {
    const release = await gate.acquire();
    started.push(label);
    await new Promise(resolve => setTimeout(resolve, 20));
    completed.push(label);
    release();
  };

  await Promise.all([
    worker('first'),
    worker('second'),
    worker('third'),
  ]);

  assert.deepEqual(started.sort(), ['first', 'second', 'third']);
  assert.deepEqual(completed.sort(), ['first', 'second', 'third']);
  assert.equal(gate.active, 0);
});
