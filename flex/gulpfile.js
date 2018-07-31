// 引入 gulp
var gulp = require('gulp');
//sudo npm install -g browser-sync 一定要全局安装
//browser-sync start --server --files "**/*.css, **/*.html"
// 引入组件
//cnpm install gulp gulp-postcss precss postcss-bem postcss-nested postcss-alias postcss-crip postcss-font-magician postcss-triangle postcss-circle postcss-all-link-colors postcss-center postcss-clearfix postcss-position postcss-size postcss-color-short postcss-px2rem --save-dev

//cnpm install postcss-write-svg postcss-px-to-viewport postcss-aspect-ratio-mini postcss-viewport-units postcss-cssnext --save-dev

//cnpm install postcss-cssnext --save-dev

var postcss = require('gulp-postcss');
var precss = require('precss');


var bem = require('postcss-bem');
var nested = require('postcss-nested');
var alias = require('postcss-alias'); //定义自己简写的属性

var crip = require('postcss-crip');//别人定义好的速写属性 https://github.com/johnie/crip-css-properties


var magician = require('postcss-font-magician');
var triangle = require('postcss-triangle');
var circle = require('postcss-circle');
var linkColors = require('postcss-all-link-colors');
var center = require('postcss-center'); //居中
var clearfix = require('postcss-clearfix');
var position = require('postcss-position'); //一行定位
var size = require('postcss-size'); //简写宽高
//var verthorz = require('postcss-verthorz');
var colorShort = require('postcss-color-short');
var px2rem = require('postcss-px2rem');
//var postcsswritesvg = require('postcss-write-svg') // 解决1px方案

// UI设计稿750px宽，那么100vw = 750px，即1vw = 7.5px
var pxtoviewport = require('postcss-px-to-viewport'); // 代码中写px编译后转化成vm
var postcssvg=require('postcss-write-svg')
var ratiomini=require('postcss-aspect-ratio-mini');
var viewportunits=require('postcss-viewport-units')
var cssnext=require('postcss-cssnext')

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});


gulp.task('css', function () {
    var processors = [postcss,precss,bem({style: 'bem',shortcuts:{
            'component':'c',
            'modifier':'m',
            'descendent':'d'
        }}),nested,/*px2rem({remUnit: 72}),*/alias, crip, magician, triangle, circle, linkColors, center, clearfix, position, size, colorShort/*,
        pxtoviewport({
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false
        }),postcssvg({utf8: false}),ratiomini,viewportunits,cssnext*/
    ];
    return gulp.src('./src/css.css') .pipe(postcss(processors)) .pipe(gulp.dest('./dest'));
});





// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });
});