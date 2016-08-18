## Mobimon Coming Soon....

TODO:
  * Project Scaffolding - done
  * Set up project testing - done
  * Migrate old still useful code
  * Come up with a way to hook core and plugins

Game Architecture:
  * `core` - Game Platform
  * `cartridges` - Game extensions

Scaffolding:
Platform type design where core will be the platform.

When using cartridges, core is then used by a cartridge; which should copy core and then mixin functionality.

All plugins should be self contained and have the same Public API, this will allow the communication of core and cartridges.

  * core - base game and resources for base game
    - config: shared configs
    - public: client side resources.
    - server: server side resources.
    - shared: shared resources within core only.

  * shared - resources that should be kept top level as they can be shared between core and cartridges.
    - images - images.
    - info - json files.

  * node_modules - Kept top level to prevent repo bloat.

  * cartridges - self contained modules that hook into core, where core is then imported as a type of "controller."

Testing:
  * Using `tape` for now.
    - mark untested modules:
      ```javascript
      import helpers from '../../utils/test/test.helpers';

      test('Create tests for Main Page', assert => helpers.createFailingTest(assert));`
      ```


### Credits:
  Monsters' artwork was done by [Mike Mazur](https://dribbble.com/Michaelmazur)!
