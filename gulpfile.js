const {src, dest} = require('gulp');
const babel = require('gulp-babel');

function html(cb) {
  src('src/calculator.html').pipe(dest('build'));
  cb();
}

function js(cb) {
  src('src/*.js')
  //.pipe(babel({presets: ['es2015']}))
  .pipe(babel())
  .pipe(dest('build'));
  cb();
}

exports.default = html
exports.default = js;