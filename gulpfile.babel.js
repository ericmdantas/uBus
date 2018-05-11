import gulp from 'gulp';
import tsc from 'gulp-typescript';
import uglify from 'gulp-uglify';
import babelUglify from 'gulp-babel-minify';
import browserify from 'gulp-uglify';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import {Server as Karma} from 'karma';

gulp.task('build', [
  'build-commonjs',
  'build-es2015',
  'build-systemjs',
  'build-amd',
  'build-umd',
  'copy-declaration'
]);

gulp.task('build-commonjs', () => {
  return gulp.src('build/bus.js')
             .pipe(babel({
               presets: [
                 'env'
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
             .pipe(babelUglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist/es2015'));
});

gulp.task('build-systemjs', () => {
  return gulp.src('build/bus.js')
             .pipe(babel({
               presets: [
                 [
                   'env', {
                     modules: 'systemjs'
                   }
                 ]
               ]
             }))
             .pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist/systemjs'));
});

gulp.task('build-umd', () => {
  return gulp.src('build/bus.js')
             .pipe(babel({
               presets: [
                 [
                   'env', {
                     modules: 'umd'
                   }
                 ]
               ]
             }))
             .pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist/umd'));
});

gulp.task('build-amd', () => {
  return gulp.src('build/bus.js')
             .pipe(babelUglify())
             .pipe(babel({
               presets: [
                 [
                   'env', {
                     modules: 'amd'
                   }
                 ]
               ]
             }))
             .pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist/amd'));
});

gulp.task('copy-declaration', () => {
  return gulp.src('build/bus.d.ts')
             .pipe(gulp.dest('dist'));
});

gulp.task('unit_test', (done) => {
  return new Karma({
      configFile: __dirname + '/karma.conf.js'
    }, (exitCode) => done(exitCode)).start();
});
