module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ["babel-plugin-styled-components",
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
  ],
};
