const {src, dest} = require('gulp');
const babel = require('gulp-babel');

function html(cb) {
  src('src/calculator.html').pipe(dest('build'));
  cb();
}



exports.default = html