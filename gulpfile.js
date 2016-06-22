var argv = require('minimist')(process.argv.slice(2));
var concat = require('gulp-concat');
var del = require('del');
var fs = require('fs');
var ftp = require('vinyl-ftp');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
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
    },

    ftpConfig: './ftp-config.json'
};

// Production option to minify code
var PROD = argv.prod;

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

// Concat app JS files to build. Minify if going to prod.
gulp.task('appJS', false, function () {
    return gulp.src(paths.appFiles.js)
        .pipe(concat('app.js'))
        .pipe(gulpif(PROD, uglify()))
        .pipe(gulp.dest(paths.dest.js));
});

// Concat vendor JS files to build. Minify if going to prod.
gulp.task('vendorJS', false, function () {
    return gulp.src(paths.vendorFiles.js)
        .pipe(concat('vendor.js'))
        .pipe(gulpif(PROD, uglify()))
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

/**
 * Deploy
 */
gulp.task('deploy', function () {
    // Set prod to true to minify
    PROD = true;
    runSequence('build', 'upload');
});

/**
 * Upload to ftp
 */
gulp.task('upload', function () {
    var config = JSON.parse(fs.readFileSync(paths.ftpConfig));

	var conn = ftp.create({
		host: config.host,
		user: config.user,
		password: config.password,
		parallel: config.parallel,
		log: gutil.log
	});

    return gulp.src(paths.dest.root + '/**', { buffer: false })
        .pipe(conn.newer(config.webroot)) // only upload newer files
        .pipe(conn.dest(config.webroot));
});
