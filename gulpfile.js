var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var del = require('del');
var spritesmith = require("gulp.spritesmith");
var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');


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
    .on("error", notify.onError(function(error) {
        return "Message to the notifier: " + error.message;
    }))
    .pipe(autoprefixer(['last 2 version']))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/style/'));
});

// Сборка спрайтов PNG
gulp.task('cleansprite', function() {
    return del.sync('public/img/sprite/sprite.png');
});


gulp.task('spritemade', function() {
    var spriteData =
        gulp.src('src/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.styl',
            padding: 15,
            cssFormat: 'stylus',
            algorithm: 'binary-tree',
            cssTemplate: 'stylus.template.mustache',
            cssVarMap: function(sprite) {
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

// Очистка папки сборки
gulp.task('clean', function() {
    return del.sync('public');
});

gulp.task('default', ['views','style','fonts','sprite']);

gulp.task('serve', ['default'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("src/style/**/*.styl", ['style']);
    gulp.watch("src/views/**/*.pug", ['views']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
    gulp.watch("public/style/*.css").on('change', browserSync.reload);
});