/*****************************************************************************************
* Gruntfile.js: is the script responsable for preparing the app  for transport
*
*     -USAGE-
*
*      $ grunt
*          -It will Generate the default files for:
*              * /public-min/
*              * /index.min.html
*              * /public-debug/
*              * /index.debug.html
*
*      $ grunt pack
*          -It will Generate the default files for transport and the pack folder
*              * /pack
*           !important: the pack folder is a ready for transport copy of the min folder.
*
*      $ grunt ngMin
*          -It will generate all the min and debug default files but applying a more
*           reduced min version of the application code applying, on the structure
*         !important: it can cause some bugs if the application is not following the correct patterns
*
*      $ grunt noLog
*          -It will generate all the min and debug default files but removing
*           all console.log from the app
*         !important: it can cause some bugs if the application is not following the correct patterns
*
*      $ grunt refresh
*           -It will delete all the generate files by grunt in the folder.
******************************************************************************************/

var saveLicense = require('uglify-save-license'),
    indexFile = 'index.html',
    rootFolder = 'public',
    debugFolder = 'public-debug',
    minFolder = 'public-min',
    packFolder = 'pack',
    libFolder = rootFolder + '/lib',
    processes = ['clean:all','processhtml','copy','concat:style', 'concat:libs', 'concat:app', 'concat:one', 'uglify','cssmin'];

var processFunc = function(src,filePath){
  return '\n/***************' + filePath + '*********************/\n' + src;
};

var cssProcessFunc = function(src,filePath){
  src = src.replace(/\.\.\/fonts/g,'fonts')
           .replace(/\/style\/fonts/g,'/fonts')
           .replace(/\.\.\/img/g,'/img');
  return '\n/***************' + filePath + '*********************/\n' + src;
};

var angularMerge = function(src,filePath){
  src = src.replace(/js\/config\/i18n\//g,'/i18n/');
  return src.replace(/\'use\sstrict\';/,'');
};

var options = {
  clean: {
    all: [debugFolder,minFolder,packFolder,'index.debug.html','index.min.html'],
    debugapp: [debugFolder + '/libs.debug.js'],
    indexmin: ['index.pmin.html'],
  },
  processhtml: {
    min: {//generates index.min.html
      options: {
        data: {
          mode: 'min'
        }
      },
      files: {
        'index.pmin.html': [indexFile]
      }
    },
    debug: {//generates index.debug.html
      options: {
        data: {
          mode: 'debug'
        }
      },
      files: {
        'index.debug.html': [indexFile]
      }
    }
  },
  copy: {
    fonts: {
      expand: true,
      cwd: rootFolder + '/style/fonts/',
      src: '**',
      dest: debugFolder + '/fonts/',
      filter: 'isFile',
    },
    img: {
      expand: true,
      cwd: rootFolder + '/img/',
      src: '**',
      dest: debugFolder + '/img/',
      filter: 'isFile',
    },
    partials: {
      expand: true,
      cwd: rootFolder + '/partials/',
      src: '**',
      dest: debugFolder + '/partials/',
      filter: 'isFile',
    },
    favicon: {
      expand: true,
      cwd: rootFolder + '/',
      src: 'favicon.ico',
      dest: debugFolder + '/',
      filter: 'isFile',
    },
    min: {
      expand: true,
      cwd: debugFolder + '/',
      src: ['**','!app.debug.js','!style.debug.css'],
      dest: minFolder + '/',
      filter: 'isFile',
    },
    pack: {
      expand: true,
      cwd: './',
      src: [ 'index.min.html', 'server.js' , 'package.json', 'Gruntfile.js'],
      dest: './' + packFolder + '/',
      filter: 'isFile',
    },
    packFolder: {
      expand: true,
      cwd: './' + minFolder + '/',
      src: '**',
      dest: './' + packFolder + '/' + minFolder + '/',
      filter: 'isFile',
    },
    server: {
      expand: true,
      cwd: './server/',
      src: '**',
      dest: './' + packFolder + '/server/',
      filter: 'isFile',
    }
  },
  concat: {
    style: {
      options: {
        separator: '',
        process: cssProcessFunc,
        banner: '',
        footer: ''
      },
      files: {
        'public-debug/style.debug.css': [
          'public/style/css/*.css',
          'public/style/css/*/*.css'
        ]
      }
    },
    libs: {
      options: {
        separator: '\n',
        process: processFunc,
        banner: '',
        footer: ''
      },
      files: {
        'public-debug/libs.debug.js': [
          libFolder + '/jquery/jquery.min.js',
          libFolder + '/jquery-ui/jquery-ui.min.js',
          libFolder + '/bootstrap/bootstrap.min.js',
          libFolder + '/angular/angular.min.js',
          libFolder + '/angular/angular-route.min.js',
          libFolder + '/angular/angular-animate.min.js'
        ]
      }
    },
    app: {
      options: {
        separator: '\n',
        process: angularMerge,
        banner: '\'use strict\';',
        footer: ''
      },
      files: {
        'public-debug/app.debug.js': [
          rootFolder + '/js/config/app.js',
          rootFolder + '/js/config/*.js',
          rootFolder + '/js/filters/filters.js',
          rootFolder + '/js/filters/**/*.js',
          rootFolder + '/js/filters/*.js',
          rootFolder + '/js/services/services.js',
          rootFolder + '/js/services/**/*.js',
          rootFolder + '/js/services/*.js',
          rootFolder + '/js/directives/directives.js',
          rootFolder + '/js/directives/**/*.js',
          rootFolder + '/js/directives/*.js',
          rootFolder + '/js/controllers/controllers.js',
          rootFolder + '/js/controllers/**/*.js',
          rootFolder + '/js/controllers/*.js'
        ]
      }
    },
    one: {
      options: {
        separator: '\n',
        banner: '',
        footer: ''
      },
      files: {
        'public-debug/app.debug.js': [
          debugFolder + '/libs.debug.js',
          debugFolder + '/app.debug.js'
        ]
      }
    },
    enus: {
      options: {
        separator: '\n\n',
        banner: '',
        footer: ''
      },
      files: {
        'server/i18n/en-us/gen.i18n':['gen/i18n/en-us/*.i18n']
      },
      dist:{
        src: ['gen/i18n/en-us/*.i18n'],
        dest: 'server/i18n/en-us/gen.i18n'
      }
    },
    es: {
      options: {
        separator: '\n\n',
        banner: '',
        footer: ''
      },
      files: {
        'server/i18n/es/gen.i18n' : ['gen/i18n/es/*.i18n'],
      },
      dist: {
        src: ['gen/i18n/es/*.i18n'],
        dest: 'server/i18n/es/gen.i18n'
      }
    },
    ptbr: {
      options: {
        separator: '\n\n',
        banner: '',
        footer: ''
      },
      files: {
        'server/i18n/pt-br/gen.i18n': ['gen/i18n/pt-br/*.i18n']
      },
      dist: {
        src: ['gen/i18n/pt-br/*.i18n'],
        dest: 'server/i18n/pt-br/gen.i18n'
      }
    }
  },
  'string-replace': {
    ngMin: {
      files: {
        'public-min/app.min.js': 'public-min/app.min.js'
      },
      options: {
        replacements: [{
            pattern: /var\sFilters\=angular\.module\(\"/g,
            replacement: 'angular.module("'
          },
          {
            pattern: /(\,|\;)Filters\.filter\(\"/g,
            replacement: '.filter("'
          },
          {
            pattern: /var\sServices\=angular\.module\(\"/g,
            replacement: 'angular.module("'
          },
          {
            pattern: /(\,|\;)Services\.service\(\"/g,
            replacement: '.service("'
          },
          {
            pattern: /var\sControllers\=angular\.module\(\"/g,
            replacement: 'angular.module("'
          },
          {
            pattern: /(\,|\;)Controllers\.controller\(\"/g,
            replacement: '.controller("'
          },
          {
            pattern: /var\sDirectives\=angular\.module\(\"/g,
            replacement: 'angular.module("'
          },
          {
            pattern: /(\,|\;)Directives\.directive\(\"/g,
            replacement: '.directive("'
          }
        ]
      }
    }
  },
  uglify: {
    js: {
      options: {
        preserveComments: saveLicense
      },
      files: {
        'public-min/app.min.js': debugFolder + '/app.debug.js'
      }
    }
  },
  cssmin: {
    css: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      files: {
        'public-min/style.min.css': debugFolder + '/style.debug.css'
      }
    }
  },
  htmlmin: {
    dist: {
      options: {                                 
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   
        'index.min.html': 'index.pmin.html'
      }
    }
  }
};

module.exports = function(grunt) {

  options.pkg = grunt.file.readJSON('package.json');

  // Project configuration.
  grunt.initConfig(options);

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask('default', [
    // 1) clean old folder
    'clean:all', 
    // 2) Generates index.min.html & index.debug.html
    'processhtml', 'htmlmin' , 'clean:indexmin' ,
    // 3) copy from ROOT to DEBUG
    'copy:favicon', 'copy:fonts', 'copy:img', 'copy:partials', 
    // 4) concat files from ROOT to DEBUG
    'concat:style' , 'concat:libs', 'concat:app' , 'concat:one' , 'clean:debugapp',
    // 5) copy from DEBUG to MIN Folder
    'copy:min' , 
    // 6) minify CSS, JS & HTML
    'cssmin' , 'uglify' ] );

  //pack tasks
  grunt.registerTask('pack', ['copy:pack', 'copy:packFolder', 'copy:server']);
  grunt.registerTask('refresh', ['clean:all']);
  grunt.registerTask('ngMin', ['string-replace:ngMin']);
  
  //i18n install for highlights & sections
  grunt.registerTask('i18n', ['concat:enus', 'concat:es', 'concat:ptbr']);
};
