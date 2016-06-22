var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var paths = {
    dest: {
        root: 'build',
        css: 'build/css',
        fonts: 'build/fonts',
        js: 'build/js',
        templates: 'build/templates'
    },

    appFiles: {
        root: 'src/*.*',
        fonts: 'src/fonts/**/*',
        js: [
            'src/app/**/*.module.js',
            'src/app/**/*.js'
        ],
        templates: 'src/app/**/*.html'
    },

    vendorFiles: {
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        js: [
            'src/vendor/*.js',
            '!src/vendor/jquery-1.11.2.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/moment/min/moment.min.js',
        ],
        jQuery: 'src/vendor/jquery-1.11.2.min.js'
    }
};

/**
 * Main Tasks
 */
gulp.task('default', ['build', 'watch']);

/**
 * Watch task
 */
gulp.task('watch', ['build'], function () {
    watch(paths.appFiles.root, function () {
        gulp.start('copy');
    });

    watch(paths.appFiles.fonts, function () {
        gulp.start('copy');
    });

    watch(paths.vendorFiles.js, function () {
        gulp.start('vendorJS');
    });

    watch(paths.appFiles.js, function () {
        gulp.start('appJS');
    });

    watch(paths.appFiles.templates, function () {
        gulp.start('copy');
    });
});

/**
 * Build task
 */
gulp.task('build', false, function (cb) {
    runSequence('clean', ['appJS', 'vendorJS', 'copy'], cb);
});

/**
 * Clean task
 */
gulp.task('clean', false, function () {
    return del([paths.dest.root]);
});

// Concat app JS files to build
gulp.task('appJS', false, function () {
    return gulp.src(paths.appFiles.js)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest.js));
});

// Concat vendor JS files to build
gulp.task('vendorJS', false, function () {
    return gulp.src(paths.vendorFiles.js)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest.js));
});

/**
 * Copy
 */
gulp.task('copy', false, function () {
    gulp.src(paths.appFiles.root)
        .pipe(gulp.dest(paths.dest.root));

    gulp.src(paths.vendorFiles.css)
        .pipe(gulp.dest(paths.dest.css));

    gulp.src(paths.appFiles.fonts)
        .pipe(gulp.dest(paths.dest.fonts));

    gulp.src(paths.appFiles.templates)
        .pipe(gulp.dest(paths.dest.templates));

    gulp.src(paths.vendorFiles.jQuery)
        .pipe(gulp.dest(paths.dest.js));
});