const {src, dest} = require('gulp');
const babel = require('gulp-babel');
const concatenate = require ('gulp-concat');

function html(cb) {
  src('src/calculator.html').pipe(dest('build'));
  cb();
}

function js(cb) {
  src('src/*.js')
  //.pipe(babel({presets: ['es2015']}))
  .pipe(concatenate())
  .pipe(babel())
  .pipe(dest('build'));
  cb();
}

exports.default = html
exports.default = js;