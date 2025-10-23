const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /.*\/__tests__\/.*/,
  /.*\.test\.js$/,
  /.*\.test\.ts$/,
  /.*\.test\.tsx$/,
  /.*\.snap$/,
];

module.exports = config;