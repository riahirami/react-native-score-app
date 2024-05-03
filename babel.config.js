module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        '@babel/plugin-transform-private-methods',
        {
          loose: true
        }
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            _config: './src/config',
            _components: './src/components/',
            _features: './src/features/',
            _models: './src/models/',
            _enums: './src/enums/',
            _utils: './src/utils/',
            _store: './src/store/',
            _navigation: './src/navigation',
            _hooks: './src/hooks/',
            _languages: './src/locales/languages',
            _i18n: './src/locales/i18n'
          }
        }
      ]
    ]
  };
};
