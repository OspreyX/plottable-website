module.exports = function(grunt) {
  var _banner = '/*! <%= pkg.name %> - v<%= pkg.version %>\n' +
          '    Copyright <%= grunt.template.today("yyyy") %> <%= pkg.company %> */';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'js/jquery-1.11.1.js',
          // include any bootstrap here
          'js/bootstrap/transition.js',
          'js/bootstrap/collapse.js',
          'js/bootstrap/dropdown.js',
          'js/bootstrap/tooltip.js',
          'js/bootstrap/scrollspy.js',
          // include our application.js
          'js/application.js'
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
          'build/js/respond-1.4.2.min.js'          : 'js/respond-1.4.2.js',
          'build/js/modernizr-custom-2.8.2.min.js' : 'js/modernizr-custom-2.8.2.js',
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
          cwd    : 'images/',
          src    : ['**/*.svg'],
          dest   : 'build/images/'
        }]
      }
    },

    compass: {
      dist: {
        options: {
          specify     : ['sass/style.scss', 'sass/ie.scss'],
          banner      : _banner,
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
          banner      : _banner,
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
        files: ['js/*.js', 'images/*', '*.html'],
        tasks: ['concat', 'uglify', 'newer:imagemin', 'newer:svgmin'],
        options: { spawn: false }
      },
      css: {
        files: ['sass/**/*.scss', '_typedoc/themes/plottable/assets/css/theme.scss'],
        tasks: ['compass'],
        options: { spawn: false }
      }
    },

    bom: {
      src: ['docs/**/*.html']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-bom-removal');

  grunt.registerTask('default', ['concat', 'uglify', 'newer:imagemin', 'newer:svgmin', 'compass']);
}
