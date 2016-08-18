module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
      'build/bus.js',
      'build/bus_test.js'
    ],
    exclude: [],
    preprocessors: {
      'build/bus.js': ['browserify', 'coverage'],
      'build/bus_test.js': ['browserify']
    },
    coverageReporter: {
      type : 'lcov',
      dir : 'unit_coverage/'
    },
    reporters: ['dots', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });

  if(process.env.TRAVIS) {
    config.browsers = ['Chrome_travis_ci'];
  }
};
