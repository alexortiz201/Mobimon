const createFailingTest = (assert) => {
  console.log('______________________test: createFailingTest');

  const expected = true;
  const actual = false;

  assert.equal(actual, expected,
    'Test have been written');

  assert.end();
};

export default { createFailingTest };
