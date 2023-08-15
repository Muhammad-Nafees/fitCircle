module.exports = {
  dependencies: {
    "react-native-video": {
      platforms: {
        android: {
          sourceDir: "../node_modules/react-native-video/android-exoplayer",
        },
      },
    },
  },
  assets: ['./assets/fonts'],
  transformer: {
    assetPlugins: ['react-native-dotenv'],
  },
};