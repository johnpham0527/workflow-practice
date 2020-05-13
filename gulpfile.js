const {src, dest} = require('gulp');

function html(cb) {
  src('src/calculator.html').pipe(dest('build'));
  cb();
}

exports.default = html