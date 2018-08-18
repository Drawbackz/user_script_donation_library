let gulp = require('gulp');
cache = require('gulp-cache');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let tsify = require('tsify');
let tsconfig = {
    noImplicitAny: true,
    target: "es2015",
    module: "commonjs",
};

let isDebug = false;

gulp.task('build', function () {
    let b = browserify({
        basedir: "src/",
        debug: isDebug,
        entries: ["user_script_project_support.ts"],
        cache: cache,
        packageCache: {}
    })
    .plugin(tsify, tsconfig).bundle().pipe(source('user_script_project_support.js'));
    b.pipe(gulp.dest("build/"));
});