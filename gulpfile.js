const gulp = require('gulp');
const connect = require('gulp-connect');
const less = require('gulp-less');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');


gulp.task('move-css', function(){
	return gulp.src([
    'node_modules/magnific-popup/dist/magnific-popup.css',
  ])
		.pipe(gulp.dest('./src/assets/css'))
});

gulp.task('concat-js', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    'src/assets/js/app.js'
  ])
    .pipe(concat({ path: 'all.js' }))
    .pipe(gulp.dest('./src/assets/js'))
    .pipe(connect.reload());
});

gulp.task('concat-css', ['move-css'], function() {
  return gulp.src([
    'src/assets/css//magnific-popup.css',
    'src/assets/css//style.css'
  ])
    .pipe(concat({ path: 'all.css' }))
    .pipe(gulp.dest('./src/assets/css/'))
    .pipe(connect.reload());
});

gulp.task('min-css', ['concat-css'], function() {
  return gulp.src('src/assets/css/all.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('min-js', ['concat-js'], function() {
  gulp.src('src/assets/js/all.js')
    .pipe(minify())
    .pipe(gulp.dest('src/assets/js'));
});

gulp.task('build', ['min-css', 'min-js'])

gulp.task('connect', function() {
  connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./src'))
    .pipe(connect.reload());
});

gulp.task('less', function () {
  gulp.src('./src/assets/less/style.less')
    .pipe(less({ javascriptEnabled: true }))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(connect.reload())
    .on('error', console.error.bind(console));
});

gulp.task('watch', function () {
  gulp.watch('./src/index.html', ['html']);
  gulp.watch(['./src/assets/less/**/*.less'], ['less']);
  gulp.watch(['./src/assets/js/app.js'], ['concat-js']);
});

gulp.task('default', ['move-css', 'connect', 'watch']);
