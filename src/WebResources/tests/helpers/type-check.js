require('ts-node').register({
  //This is required so that the tests use the same tsconfig as the main project.
  //The ts-node section of the tsconfig.json is used for ts-node specific options.
  project: require.resolve('../../tsconfig.json'),
})