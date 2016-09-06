### Cartridges export an object with a path and component,

  ```javascript
    // Route being Route configs, reducers export via same object
    /**
     * NOTE: Route needs to be capitalized
     */
    export default { Route, reducers };
  ```

  * These are then registered via registerCartridge helper in `/core/public/utils/cartridges/cartridges-utils`.
  * Which pushes onto an array that core loads when building the Main routes in `/core/public/components/Root/`

