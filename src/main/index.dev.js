/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Set environment for development
/** 
if (typeof process.env.NODE_ENV === 'string') {
  // we don't have to reassign the value to `process.env.NODE_ENV`
  // since above webpack 4, the value has been set automatically
  // in built files according to the `mode` variable
} else {
  process.env.NODE_ENV = 'development';
}
*/
// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => { })
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
})
// Require `main` process to boot app
require('./index')
