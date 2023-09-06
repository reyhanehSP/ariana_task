const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

//fonts
gulp.task('fonts', function() {
  return gulp.src('./assets/fonts/**/**/*') // Specify the source folder for fonts
    .pipe(gulp.dest('dist/fonts')); // Output the fonts to the destination folder
});


//js
gulp.task('scripts', function() {
  return gulp.src([
    './assets/js/*.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/highcharts/highcharts.js',
    './node_modules/select2/dist/js/select2.min.js',
    './node_modules/sweetalert2/dist/sweetalert2.min.js'

  ]) // Specify the source folder for JS files
    .pipe(concat('bundle.js')) // Concatenate all JS files into a single file
    .pipe(uglify()) // Minify the JS file
    .pipe(rename({ suffix: '.min' })) // Rename the minified file
    .pipe(gulp.dest('dist/js')); // Output the minified JS file to the destination folder
});

//SCSS:
gulp.task('styles', function() {
  return gulp.src('./assets/css/*.scss') // Specify the source folder for SCSS files
    .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
    .pipe(cleanCSS()) // Minify the CSS file
    .pipe(rename({ suffix: '.min' })) // Rename the minified file
    .pipe(gulp.dest('dist/css')); // Output the compiled and minified CSS file to the destination folder
});


gulp.task('css', function () {
  return gulp.src([
      './node_modules/bootstrap/dist/css/bootstrap.rtl.min.css',
      './node_modules/highcharts/css/highcharts.css',
      './node_modules/select2/dist/css/select2.min.css',
      './node_modules/sweetalert2/dist/sweetalert2.min.css',
      './node_modules/bootstrap-icons/font/bootstrap-icons.min.css',
  ])
      .pipe(cleanCSS()) 
      .pipe(concat('core.min.css'))
      .pipe(gulp.dest('./dist/css'));
});
gulp.task('watch', function () {
  gulp.watch('./assets/css/*.scss',  gulp.series( 'fonts', 'scripts', 'styles' , 'css'));
});
