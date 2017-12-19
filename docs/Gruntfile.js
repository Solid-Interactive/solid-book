'use strict';

module.exports = function(grunt) {
    
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        buildGhPages : {
            book : {
              options : {
                dist : '_book'
              }
            }
        },
        shell : {
          options : {
            stdout : true,
            stderr : true
          },
          build : {
            command : 'gitbook build'
          }
        }
    });

    grunt.registerTask('deploy', [
      'shell:build',
      'buildGhPages:book'
    ]);

};
