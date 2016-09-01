module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        jasmine: {
            src: 'src/*.js',
            options: {
                specs: 'specs/*.spec.js'
            }
        },
        watch: {
            files: 'src/*.js',
            tasks: ['jasmine']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.registerTask('default', 'jasmine');
}
