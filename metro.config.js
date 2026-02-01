const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro configuration compatible Expo
 * https://docs.expo.dev/guides/customizing-metro
 */
const config = getDefaultConfig(__dirname);

// Configuration pour Supabase (crypto & stream polyfills)
config.resolver.extraNodeModules = {
    crypto: require.resolve('react-native-get-random-values'),
    stream: require.resolve('readable-stream'),
};

config.resolver.unstable_enablePackageExports = false;

module.exports = config;
