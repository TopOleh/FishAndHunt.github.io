var gulp, sass, browserSync, clean, concat, sourcemaps, autoprefixer ;
gulp = require("gulp");
sass = require("gulp-sass");
browserSync = require("browser-sync").create();
clean = require('gulp-clean');
concat = require('gulp-concat');
sourcemaps = require('gulp-sourcemaps');
autoprefixer = require('gulp-autoprefixer');

gulp.task('registration', function () {

});

gulp.task('templates', function () {
    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./app'))
        .pipe(browserSync.stream());
});
gulp.task('sass', function () {
    return gulp.src('./app/sass/**/*.sass')
        .pipe(sourcemaps.init())//Process the original sources
        .pipe(sass())
        .pipe(autoprefixer({
            browsers:[
                'last 20 versions',
                'last 20 Chrome versions',
                '> 20%',
                'ie 6-8'
            ],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream())
});


gulp.task('browser-sync',[
    'sass',
    'templates'
], function() {
    browserSync.init(null,{
        // proxy: "localhost:3000",
        port: 3000,
        server:{
            baseDir: './app'
        },
        notify: true
    });
});
gulp.task('default', function () {
   gulp.start('watch', 'browser-sync');
});

gulp.task('watch', function(){
    gulp.watch('./app/**/*.html', ['templates']);
    gulp.watch('./app/sass/**/*.sass', ['sass']);
    gulp.watch('./app/js/**/*.js', browserSync.reload);
});
