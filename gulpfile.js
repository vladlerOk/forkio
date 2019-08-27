// 'use strict';
//
// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const autoprefixer   = require('gulp-autoprefixer');
//
// sass.compiler = require('node-sass');
//
// gulp.task('sass', function () {
//   return gulp.src('src/scss/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer({
//       browsers: ['last 10 versions'],
//       cascade: false
//     }))
//     .pipe(gulp.dest('dist/css'));
// });
//
// gulp.task('watch', function() {
//   gulp.watch('src/scss/*.scss', gulp.series('sass'));
// });

'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let autoprefixer   = require('gulp-autoprefixer');
let imagemin   = require('gulp-imagemin');
let cleanCSS = require('gulp-clean-css');
let jquery = require('gulp-jquery');
let uglify = require('gulp-uglify');
let pipeline = require('readable-stream').pipeline;


sass.compiler = require('node-sass');

gulp.task('scss', function () {
  return gulp.src('src/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.reload({stream: true}));
});


gulp.task('imgs', function() {
  return gulp.src("src/img/*.+(jpg|jpeg|png|gif)")
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true
    }))
    .pipe(gulp.dest("dist/img"))
});

gulp.task('minify-css', () => {
  return gulp.src('dist/css/app.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('browser-sync', function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    //notify: false
    tunnel: true
  });
  done();
});

gulp.task('jquery', function () {
  return gulp.src('node_modules/jquery/src')
    .pipe(jquery({
      flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
    }))
    .pipe(gulp.dest('dist/js/jquery.custom.js'));
  // creates ./public/vendor/jquery.custom.js
});

gulp.task('compress', function () {
  return pipeline(
    gulp.src('src/js/*.js'),
    uglify(),
    gulp.dest('dist/js')
  );
});

// gulp.task('dev', gulp.parallel('browser-sync',  function () {
//   gulp.watch('src/scss/*.scss', gulp.series('scss'))
// }));
gulp.task('dev', gulp.parallel('browser-sync', 'scss', 'minify-css', 'jquery', 'compress'));



// gulp.task('watch', function() {
//   gulp.watch('src/scss/*.scss', gulp.series('sass'));
// });

