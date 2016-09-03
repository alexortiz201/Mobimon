module.exports = {
  'go to login': function (browser) {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'Case')
      .waitForElementVisible('input.login-button', 1000);
  },

  'login': function (browser) {
    browser
      .click('input.login-button')
      .pause(1000)
      .assert.containsText('div.pick-character-container h3', 'Welcome Case, pick your destiny...')
  },

  'select character': function (browser) {
    browser
      .click('div.pick-character-container div.pick-character-list div.bilsner')
      .waitForElementVisible('div.incubator-container', 1000)
      .end();
  }
};
