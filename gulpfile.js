const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');


function minifySCSS() {
    return gulp.src('./assets/css/*.scss') 
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/css')); 
};

function watchFiles() {
    gulp.watch('./assets/css/*.scss', minifySCSS);
  }

exports.default = watchFiles;