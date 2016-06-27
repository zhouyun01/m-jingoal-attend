var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    browserSync = require('browser-sync');

gulp.task('styles', function() {
    return gulp.src('styles/**/*.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/assets/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        // .pipe(gulp.dest('dist/assets/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('images/**/*')
        // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/assets/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('cleanCash', function (done) {
    return cache.clearAll(done);
});

// Clean
gulp.task('clean', function(cb) {
    return del(['dist/assets/styles', 'dist/assets/scripts', 'dist/assets/images'], cb)
});

// Default task
// gulp.task('default', ['clean'], function() {
//     gulp.start('styles', 'scripts', 'images', 'watch', 'browser-sync');
// });

gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images', 'watch', 'browser-sync');
});

// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('styles/**/*.less', ['styles']);
    // Watch .js files
    gulp.watch('scripts/**/*.js', ['scripts']);
    // Watch image files
    gulp.watch('images/**/*', ['images']);
});

gulp.task('browser-sync', function() {
    var files = [
        './**/*.html',
        'dist/assets/styles/**/*.css',
        'dist/assets/images/**/*',
        'dist/assets/scripts/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});
