/**
 * Created by Justin on 5/7/2016.
 */
var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var gulpUtil = require('gulp-util');

// Run all
gulp.task('default', ['libs-all'/*, 'build:typescript'*/], function(){
    return gulpUtil.log('Gulp is running!');
});

// Clear out public/lib folder
gulp.task('clean', () => {
    return del('public/lib')
});

gulp.task('socketio', ['clean'], () => {
    console.log('socketio');
    gulp.src('node_modules/socket.io-client/**/**').pipe(gulp.dest('public/lib/socket.io-client'));
});

gulp.task('angular2-websocket', ['clean'], () => {
    console.log('angular2-websocket');
    gulp.src('node_modules/angular2-websocket/**/**').pipe(gulp.dest('public/lib/angular2-websocket'));
});

gulp.task('angular', ['clean'], () => {
    console.log('@angular');
    gulp.src('node_modules/@angular/**/**').pipe(gulp.dest('public/lib/@angular'));
});

gulp.task('es6-shim', ['clean'], () => {
    console.log('es6-shim');
    gulp.src('node_modules/es6-shim/**/**').pipe(gulp.dest('public/lib/es6-shim'));
});

gulp.task('zone.js', ['clean'], () => {
    console.log('zone.js');
    gulp.src('node_modules/zone.js/**/**').pipe(gulp.dest('public/lib/zone.js'));
});

gulp.task('systemjs', ['clean'], () => {
    console.log('systemjs');
    gulp.src('node_modules/systemjs/**/**').pipe(gulp.dest('public/lib/systemjs'));
});

gulp.task('rxjs', ['clean'], () => {
    console.log('rxjs');
    gulp.src('node_modules/rxjs/**/**').pipe(gulp.dest('public/lib/rxjs'));
});

gulp.task('reflect-metadata', ['clean'], () => {
    console.log('reflect-metadata');
    gulp.src('node_modules/reflect-metadata/**/**').pipe(gulp.dest('public/lib/reflect-metadata'));
});

gulp.task('angular2-in-memory-web-api', ['clean'], () => {
    console.log('angular2-in-memory-web-api');
    gulp.src('node_modules/angular2-in-memory-web-api/**/**').pipe(gulp.dest('public/lib/angular2-in-memory-web-api'));
});

// Write all files to public/lib
gulp.task('libs-all', ['angular', 'es6-shim', 'zone.js', 'systemjs', 'rxjs', 'reflect-metadata', 'angular2-in-memory-web-api', 'socketio', 'angular2-websocket'], () => {
    console.log('build all libs');
});


// Transpile all typescript files
//gulp.task('build:typescript', ['libs-all'], function() {
//    var tsProject = ts.createProject('public/tsconfig.json');
//    var tsResult = gulp.src('public/app/**/*.ts')
//        .pipe(sourcemaps.init())
//        .pipe(ts(tsProject));
//
//    return tsResult.js.pipe(sourcemaps.write())
//        .pipe(gulp.dest('public/app/**/*.js'));
//});
