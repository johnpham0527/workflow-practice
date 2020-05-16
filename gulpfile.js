const {src, dest, series} = require('gulp');
const babel = require('gulp-babel');
const concatenate = require ('gulp-concat');

function html(cb) {
  src('src/*.html').pipe(dest('build'));
  cb();
}
function css(cb) {
  src('src/*css').pipe(dest('build'));
  cb();
}

function js(cb) {
  src('src/*.js')
  //.pipe(babel({presets: ['es2015']}))
  .pipe(concatenate('build.js'))
  .pipe(babel())
  .pipe(dest('build'));
  cb();
}

exports.default = series(html, css, js);