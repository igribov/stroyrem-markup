var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


gulp.task('views', function buildHTML() {
  return gulp.src('./src/views/*.pug')
    .pipe(pug({
    // Your options in here.
    }))
    .pipe(gulp.dest('./public/'));
});


gulp.task('style', function buildHTML() {
  return gulp.src('./src/style/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/style/'));
});

gulp.task('fonts', function buildHTML() {
  return gulp.src('./src/style/fonts/**')
    .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('default', ['views','style','fonts']);

gulp.task('serve', ['default'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("src/style/**/*.styl", ['style']);
    gulp.watch("src/views/**/*.pug", ['views']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
    gulp.watch("public/style/*.css").on('change', browserSync.reload);
});