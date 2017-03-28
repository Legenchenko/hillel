var gulp = require('gulp');
var plumber = require('gulp-plumber');

// connect
var connect = require('gulp-connect-multi')(); 
gulp.task('connect', connect.server({
    host: '127.0.0.1',
    root: ['./site'],
    port: 9090,
    livereload: true,
    
}));

//styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('styles', function(){
		gulp.src('./dev/test/scss/styles.scss')
			.pipe(plumber())
            .pipe(sass({
				outputSlyle: 'compressed'
			}))
			.pipe(prefix('last 2 version'))
			.pipe(gulp.dest('./site/css'))
            .pipe(connect.reload());
});

//templates
var pug = require('gulp-pug');

gulp.task('templates', function(){
		gulp.src('./dev/test/pug/*.pug')
			.pipe(plumber())
            .pipe(pug())     //?????
			.pipe(gulp.dest('./site'))
            .pipe(connect.reload());
});

//script
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script', function(){
		gulp.src('./dev/test/js/*.js')
            .pipe(plumber())
			.pipe(concat('script.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./site/js'))
            .pipe(connect.reload());
});

//imagemin
var imagemin = require('gulp-imagemin');
 
gulp.task('images', function() {
    gulp.src('./dev/test/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./site/images'))
        .pipe(connect.reload());
});

// watcher
gulp.task('watcher', function() {
    gulp.watch('pug/**/*.pug', {cwd:'./dev/test/'}, ['templates']);
    gulp.watch('scss/*.scss', {cwd:'./dev/test/'}, ['styles']);
    gulp.watch('js/*.js', {cwd:'./dev/test/'}, ['scripts']);
    gulp.watch('images/**/*.{png,jpg,jpeg,gif,svg}', {cwd:'./dev/test/'}, ['images']);
});


gulp.task('default', ['styles', 'templates','script', 'images']);
gulp.task('site', ['default', 'connect', 'watcher']);