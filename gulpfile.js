'use strict';

var gulp = require('gulp'),
    path = require('path');

var libPaths = [
    path.join('node_modules', 'bootstrap/dist', '**')
];

gulp.task('copy-libs', function () {
    return gulp.src(libPaths)
        .pipe(gulp.dest(path.join('public', 'lib')));
});

gulp.task('copy-libs-js', function () {
    return gulp.src(path.join('node_modules', 'jquery/dist', 'jquery.js'))
        .pipe(gulp.dest(path.join('public', 'lib','js')));
});

gulp.task('copy-static', function () {
    return gulp.src(path.join('static', '**'))
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['copy-libs', 'copy-libs-js', 'copy-static']);
