import gulp from 'gulp';
import tsc from 'gulp-typescript';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import {Server as Karma} from 'karma';

gulp.task('build', ['unit_test', 'copy-sourcemap', 'copy-declaration'], () => {
  return gulp.src('build/bus.js')
             .pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist'));
});

gulp.task('copy-sourcemap', () => {
  return gulp.src('build/bus.js.map')
             .pipe(gulp.dest('dist'));
});

gulp.task('copy-declaration', () => {
  return gulp.src('build/bus.d.ts')
             .pipe(gulp.dest('dist'));
});

gulp.task('unit_test', (done) => {
  let _server = new Karma({
    configFile: __dirname + '/karma.conf.js'
  }, done);

  return _server.start();
});
