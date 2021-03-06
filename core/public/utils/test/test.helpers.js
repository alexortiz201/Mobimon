const createFailingTest = (assert) => {
  const expected = true;
  const actual = false;

  assert.equal(actual, expected,
    'Test have been written');

  assert.end();
};

const makeProps = (defaults, settings) =>
  Object.assign({}, defaults, settings);

export default { createFailingTest, makeProps };
