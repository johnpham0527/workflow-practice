const {src, dest, series, parallel, watch} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const concatenate = require ('gulp-concat');
const sass = require('gulp-sass');

const origin = 'src';
const destination = 'build';

sass.compiler = require('node-sass');

async function clean(cb) {
  await del(destination);
  cb();
}

function html(cb) {
  src(`${origin}/*.html`).pipe(dest(`${destination}`));
  cb();
}
function css(cb) {
  src(`${origin}/*.css`)
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(dest(`${destination}/css`));
  cb();
}

function js(cb) {

  var onError = function(err) {
    notify.onError({
                title:    "Gulp",
                subtitle: "Failure!",
                message:  "Error: <%= error.message %>",
                sound:    "Beep"
            })(err);

    this.emit('end');
};

  src([
    `${origin}/*.js`
  ])
  .pipe(plumber({erroHandler: onError}))
  .pipe(concatenate('build.js'))
  .pipe(babel())
  /*
  .pipe(babel({
    presets: ['env', 'react'],
    plugins: ['transform-react-jsx']
  }))
  */
  .pipe(dest(`${destination}/js`));
  cb();
}

function watcher(cb) {
  watch(`${origin}/*.html`).on('change', series(html, browserSync.reload));
  watch(`${origin}/*.css`).on('change', series(css, browserSync.reload));
  watch(`${origin}/*.js`).on('change', series(js, browserSync.reload));
  cb();
}

function server(cb) {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: destination
    }
  });
  cb();
}

exports.default = series(clean, parallel(html, css, js), server, watcher);