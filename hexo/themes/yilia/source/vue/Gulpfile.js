
var gulp = require('gulp');
var contentIncluder = require('gulp-content-includer');
var makeVersion = require('gulp-make-css-url-version');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
//var postcss = require("gulp-postcss");
var sass = require('gulp-sass');
//var sassyImport = require("postcss-sassy-import");
var amdOptimize = require('amd-optimize');
//var requirejsOptimize = require('gulp-requirejs-optimize');
var rjs = require('gulp-requirejs');
var seajsCombo = require('gulp-seajs-combo');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// 源码路径
var src = {
    html: 'html/**/*.html',
    include: 'html/include/**/*.html',
    sass: 'sass/**/*.scss',
	css: 'css/**/*.css',
    js: 'js/**/*.js',
    lib: 'lib/**/*.*',
    img: 'img/**',
    fonts: 'fonts/*.*'
};

// 发布路径
var dist = {
    root: 'assets',
    css: 'assets/css',
    js: 'assets/js',
};

// 清理指定目录
gulp.task('clean', function () {
    return gulp.src(dist.root, {
        read: false
    })
    .pipe(clean());
});

// 处理css
gulp.task('css', function () {
    return gulp.src(src.css)
    .pipe(cleanCSS())
    .pipe(gulp.dest(dist.css))
    .pipe(reload({ stream: true }));
});

// 处理HTML
gulp.task('html', function () {
    return gulp.src(src.html)
    .pipe(contentIncluder({
        includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g,
        baseSrc: './html'
    }))
    .pipe(replace('/img/','../img/'))
    .pipe(gulp.dest(dist.root));
});

gulp.task('sass', function () {
    return gulp.src(src.sass)
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: [
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 9',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ],
        cascade: false
    }))
    .pipe(replace('/img/', '../../img/'))
    .pipe(gulp.dest(dist.css));
});
gulp.task('sass:watch', function () {
gulp.watch('./sass/**/*.scss', ['sass']);
});
// 复制、压缩、重命名JS
gulp.task('js', function () {
    return gulp.src(src.js)
    .pipe(gulp.dest(dist.js))
    .pipe(uglify())
    .pipe(gulp.dest(dist.js));
});

// 发布任务
gulp.task('release', function () {
     runSequence('clean', 'html','css', 'sass', 'js');
});

// 开发任务
gulp.task('default', function () {
    
    // 处理HTML
    gulp.task('html-dev', function () {
        return gulp.src(src.html)
        .pipe(contentIncluder({
            includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g,
            baseSrc: './html'
        }))
        .pipe(replace('/img/','../img/'))
        .pipe(gulp.dest(dist.root));
    });

    // 编译Sass
    gulp.task('sass-dev', function () {
        return gulp.src(src.sass)
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
               'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 9',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6'
            ],
            cascade: false
        }))
        .pipe(replace('/img/', '../../img/'))
        .pipe(gulp.dest(dist.css))
        .pipe(reload({ stream: true }));
    });
	 // 复制、压缩、重命名CSS
    gulp.task('css-dev', function () {
        return gulp.src(src.css)
        .pipe(gulp.dest(dist.css))
        .pipe(reload({ stream: true }));
    });
    
    // 复制、压缩、重命名JS
    gulp.task('js-dev', function () {
        return gulp.src(src.js)
        .pipe(gulp.dest(dist.js))
        .pipe(reload({ stream: true }));
    });

    // 静态服务器 + 监听 scss/html 文件
    gulp.task('server', ['html-dev','css-dev','sass-dev', 'js-dev'], function () {
        browserSync.init({
            server: "./",
            notify: false,
            open: false
        });
        gulp.watch("html/**/*.html", function () {
            runSequence('html-dev');
            // 解决html重载空白的问题
            setTimeout(function(){
                gulp.src('assets/**/*.html')
                .pipe(reload({ stream: true }));
            },300);
        });
        gulp.watch("sass/**/*.scss", ['sass-dev']);
		gulp.watch("css/**/*.css", ['css-dev']);
        gulp.watch("js/**/*.js", ['js-dev']);
    });

    // 开启服务后跑一次发布流程
    runSequence('clean', 'server', 'html-dev', 'css-dev', 'sass-dev', 'js-dev');

});