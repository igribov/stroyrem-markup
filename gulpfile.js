var gulp = require('gulp'),
  pug = require('gulp-pug'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  spritesmith = require("gulp.spritesmith"),
  notify = require("gulp-notify"),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache');

gulp.task('views', function buildHTML() {
  return gulp.src('./src/views/pages/*.pug')
    .pipe(pug({
      // Your options in here.
    }))
    .pipe(gulp.dest('./public/'));
});


gulp.task('style', function buildHTML() {
  return gulp.src(['./src/style/pages/*.styl', './src/style/common.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true
    }))
    .on("error", notify.onError(function (error) {
      return "Message to the notifier: " + error.message;
    }))
    .pipe(autoprefixer(['last 2 version']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/style/'));
});

// Работа с JS
gulp.task('scripts', function () {
  return gulp.src([
    'src/js/*.js'
  ])
    .pipe(gulp.dest('public/js/'));
});

// Сборка спрайтов PNG
gulp.task('cleansprite', function () {
  return del.sync('public/img/sprite/sprite.png');
});


gulp.task('spritemade', function () {
  spriteData =
    gulp.src('src/img/sprite/*.*')
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.styl',
        padding: 15,
        cssFormat: 'stylus',
        algorithm: 'binary-tree',
        cssTemplate: 'stylus.template.mustache',
        cssVarMap: function (sprite) {
          sprite.name = 's-' + sprite.name;
        }
      }));
  spriteData.img.pipe(gulp.dest('public/img/')); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest('src/style/includes/')); // путь, куда сохраняем стили
});

gulp.task('sprite', ['cleansprite', 'spritemade']);

gulp.task('fonts', function buildHTML() {
  return gulp.src('./src/style/fonts/**')
    .pipe(gulp.dest('./public/fonts/'));
});

gulp.task('img', function () {
  return gulp.src(['src/content/img/**/*', '!spc/img/sprite/*'])
    .pipe(cache(imagemin({
      progressive: true,
      use: [pngquant()]
    })))
    .pipe(gulp.dest('public/img/'));
});

// Очистка папки сборки
gulp.task('clean', function () {
  return del.sync('public');
});

gulp.task('default', ['views', 'style','scripts', 'fonts', 'sprite', 'img']);

gulp.task('serve', ['default'], function () {

  browserSync.init({
    server: "./public"
  });

  gulp.watch("src/style/**/*.styl", ['style']);
  gulp.watch("src/views/**/*.pug", ['views']);
  gulp.watch("src/js/*.js", ['scripts']);
  gulp.watch("src/img/**/*", ['sprite', 'img']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
  gulp.watch("public/*.js").on('change', browserSync.reload);
  gulp.watch("public/style/*.css").on('change', browserSync.reload);
});