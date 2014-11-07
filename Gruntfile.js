module.exports = function(grunt) {
  var _banner = '/*! <%= pkg.name %> - v<%= pkg.version %>\n' +
          '    Copyright <%= grunt.template.today("yyyy") %> <%= pkg.company %> */';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          '_js/jquery-1.11.1.js',
          // include any bootstrap here
          '_js/bootstrap/transition.js',
          '_js/bootstrap/collapse.js',
          '_js/bootstrap/dropdown.js',
          '_js/bootstrap/tooltip.js',
          '_js/bootstrap/scrollspy.js',
          // include our application.js
          '_js/application.js'
        ],
        dest: 'build/js/compiled.js'
      }
    },

    uglify: {
      options: {
        banner: _banner,
        mangle: {
          except: ['jQuery', 'Modernizr']
        },
        compress: {
          //drop_console: true
        }
      },
      build: {
        files: {
          'build/js/respond-1.4.2.min.js'          : '_js/respond-1.4.2.js',
          'build/js/modernizr-custom-2.8.2.min.js' : '_js/modernizr-custom-2.8.2.js',
          'build/js/compiled.min.js'               : 'build/js/compiled.js'
        }
      }
    },

    imagemin: {
      options: {
        cache: false
      },
      dist: {
        files: [{
          expand : true,
          cwd    : 'images/',
          src    : ['**/*.{png,jpg,gif}'],
          dest   : 'build/images/'
        }]
      }
    },

    svgmin: {
      options: {
        plugins: [
          { removeViewBox              : false },
          { removeUselessStrokeAndFill : false },
          { removeEmptyAttrs           : false },
          { removeEmptyTile            : false },
          { removeUnknownsAndDefaults  : false }
        ]
      },
      dist: {
        files: [{
          expand : true,
          cwd    : '_images/',
          src    : ['**/*.svg'],
          dest   : 'build/images/'
        }]
      }
    },

    compass: {
      dist: {
        options: {
          specify     : ['sass/style.scss', 'sass/ie.scss'],
          sassDir     : 'sass',
          cssDir      : 'build/css',
          fontsDir    : 'fonts',
          outputStyle : 'compressed',
          imagesDir   : 'build/images'
        }
      },

      theme: {
        options: {
          specify     : ['_typedoc/themes/plottable/assets/css/theme.scss'],
          sassDir     : '_typedoc/themes/plottable/assets/css',
          cssDir      : '_typedoc/themes/plottable/assets/css',
          fontsDir    : 'fonts',
          outputStyle : 'compressed',
          imagesDir   : '_typedoc/themes/plottable/assets/images'
        }
      }
    },

    watch: {
      scripts: {
        files: ['_js/*.js', '_images/*', '*.html'],
        tasks: ['concat', 'uglify', 'newer:imagemin', 'newer:svgmin'],
        options: { spawn: false }
      },
      css: {
        files: ['sass/**/*.scss', '_typedoc/themes/plottable/assets/css/theme.scss'],
        tasks: ['compass'],
        options: { spawn: false }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['concat', 'uglify', 'newer:imagemin', 'newer:svgmin', 'compass']);
}
