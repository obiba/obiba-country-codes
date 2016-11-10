var gulp = require('gulp');
var path = require('path');
var debug = require('gulp-debug');
var inject = require('gulp-inject-string');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var fs = require('fs');
var fse = require('fs-extra')

gulp.task('default', ['create:all']);

gulp.task('create:all', function () {
  var files = JSON.parse(fs.readFileSync('./sources.json', 'utf-8'));
  files.forEach(function(file){
    gulp.src(file)
      .pipe(inject.prepend('obibaCountryCodes.' + path.basename(file).replace('\.*$','') + ' = '))
      .pipe(inject.append(';'))
      .pipe(gulp.dest('tmp'))
    ;
  });

  gulp.src('./tmp/*')
    .pipe(concat('all.js'))
    .pipe(inject.prepend('var obibaCountryCodes = {};'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist'))
});
