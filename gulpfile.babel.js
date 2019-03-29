import gulp from 'gulp'
import uglify from 'gulp-uglify'
import babelUglify from 'gulp-babel-minify'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import {Server as Karma} from 'karma'

gulp.task('build-commonjs', (done) => {
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
             .pipe(gulp.dest('dist/commonjs'))
             .on('end', () => done())
})

gulp.task('build-es2015', (done) => {
  return gulp.src('build/bus.js')
             .pipe(babelUglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('dist/es2015'))
             .on('end', () => done())
})

gulp.task('build-systemjs', (done) => {
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
             .pipe(gulp.dest('dist/systemjs'))
             .on('end', () => done())
})

gulp.task('build-umd', (done) => {
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
             .pipe(gulp.dest('dist/umd'))
             .on('end', () => done())
})

gulp.task('build-amd', (done) => {
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
             .pipe(gulp.dest('dist/amd'))
             .on('end', () => done())
})

gulp.task('copy-declaration', (done) => {
  return gulp.src('build/bus.d.ts')
             .pipe(gulp.dest('dist'))
             .on('end', () => done())
})

gulp.task('unit_test', (done) => {
  return new Karma({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
    }, done()).start()
})

gulp.task('build', gulp.series(
    'build-commonjs',
    'build-es2015',
    'build-systemjs',
    'build-amd',
    'build-umd',
    'copy-declaration'
  )
)