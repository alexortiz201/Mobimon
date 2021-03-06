## Mobimon Coming Soon....

TODO:
  * Project Scaffolding - done
  * Set up project testing - done
  * Migrate old still useful code
  * Come up with a way to hook core and plugins
  * set up prod built distro

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

    test('Create tests for Main Page', assert => helpers.createFailingTest(assert));
  ```

Quirks:
  * props.router.replace('/login') does not rewrite url in dev server.
  * redux-logger middleware does not print redux-loop side effects.


Commands Available:

```bash
## Commands
## [] Square brackets are optional
## (e.g. start -> start:dist)

# Start server (default is dev environment)
# or dev server with dist version
npm start[:dist]
# Start watch on core or cartridges
npm run watch[:cartridges]

# Build dist
npm run build:dist


## Utils
# Run all tests or core or cartridges or e2e (safari)
npm run test[:core, :cartridges, :e2e]
# Lint all or core/{public, shared} or cartridges
npm run lint[:core, :cartridges]

# Copy static assets into dist
npm run copy
# Clean up the dist directory
npm run clean
# update dependencies and check for unused dependencies
npm run update
```

### Credits:
  Monsters' artwork was done by [Mike Mazur](https://dribbble.com/Michaelmazur)!
