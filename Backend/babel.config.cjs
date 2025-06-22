// babel.config.cjs
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' }
        // ¡No ponemos "modules": false! Así Babel convertirá import→require
      }
    ]
  ]
};
