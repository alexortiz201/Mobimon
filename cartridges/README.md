### Cartridges need to export a Route object with a path and component,

  ```javascript
    const Route = {
      path: '/example',
      component: Example,
    };
  ```

  * These are then register via registerCartridge helper in `/core/public/utils/cartridges/cartridges-utils`.
  * Which pushes onto an array that core loads when building the Main routes in `/core/public/components/Root/`

