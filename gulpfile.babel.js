import gulp from 'gulp';
import tsc from 'gulp-typescript';
import uglify from 'gulp-uglify';
import browserify from 'gulp-uglify';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import {Server as Karma} from 'karma';

gulp.task('build', [
  'build-commonjs',
  'build-es2015'
]);

gulp.task('build-commonjs', () => {
  return gulp.src('build/bus.js')
             .pipe(babel({
               presets: [
                 'es2015'
               ]
             }))
             .pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist/commonjs'));
});

gulp.task('build-es2015', () => {
  return gulp.src('build/bus.js')
             //.pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist/es2015'));
});

gulp.task('unit_test', (done) => {
  let _server = new Karma({
    configFile: __dirname + '/karma.conf.js'
  }, done);

  return _server.start();
});
