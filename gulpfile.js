var gulp = require('gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    gulp.src('dev/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dev/css'));
});

gulp.task('styles', function() {
    gulp.src('dev/css/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('minify-css', function() {
    gulp.src('dist/css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/min'));
});

gulp.task('uglify', function() {
    gulp.src('dev/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('serve', function() {

    browserSync.init({
        server: "dist"
    });
    
    gulp.watch("dist/js/*.js").on('change', browserSync.reload);
    gulp.watch("dist/css/*.css").on('change', browserSync.reload);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve'], function() {
    gulp.watch('dev/sass/*.scss', ['sass']);
    gulp.watch('dev/css/*.css', ['styles']);
    gulp.watch('dist/css/*.css', ['minify-css']);
    gulp.watch('dev/js/*.js', ['uglify']);
});