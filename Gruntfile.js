module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     concat: { //to applay this concat we have to run $grunt build in the terminal.
    options: {
      separator: ';',
    },
    dist: {
      src: ['public/client/**/*.js'], //to take every thing inside public client to applay the concat on them ==> meaning it will but all of them in same file
      dest: 'public/dest/build.js', //It will creat a file called build.js inside the folder public/dest(we added an empty dest folder).
    },// Don't forget to make the grunt.registerTask('build', ['concat']);
  },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

   

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
    my_target: {
      files: {
        'public/client/**/*.js': ['public/dest/build.js' , 'style.css'] ///we needed to uglify the whole client folder after we concatentaed it
      }
    }
  },

    eslint: {
      target: [
      'public/dest/build.js'
      ]

    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', ['concat' ,'uglify','eslint'
  ]);
 
  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
