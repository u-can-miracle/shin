const gulp = require('gulp');
const connect = require('gulp-connect');
const less = require('gulp-less');

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
  gulp.src('./src/less/style.less')
    .pipe(less({ javascriptEnabled: true }))
    .pipe(gulp.dest('./src/css'))
    .pipe(connect.reload())
    .on('error', console.error.bind(console));
});

gulp.task('watch', function () {
  gulp.watch('./src/index.html', ['html']);
  gulp.watch(['./src/less/**/*.less'], ['less']);
});

gulp.task('default', ['connect', 'watch']);
