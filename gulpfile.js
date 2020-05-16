const {src, dest, series} = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const concatenate = require ('gulp-concat');

const origin = 'src';
const destination = 'build';

function clean(cb) {
  del(destination);
}

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