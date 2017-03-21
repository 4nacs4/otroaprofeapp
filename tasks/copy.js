module.exports = {
  dist: {
    files:[
      {
        src: 'app/index.html',
        dest: 'dist/index.html'
      },
      {
        cwd: 'app/fonts',
        src: '**',
        dest: 'dist/fonts/',
        expand: true
      },
      {
        cwd: 'app/images',
        src: '**/*.*',
        dest: 'dist/images/',
        expand: true
      },
      //bootstrap fonts
      {
        cwd: 'app/bower_components/bootstrap/dist/fonts',
        src: '**/*.*',
        dest: 'dist/fonts/',
        expand: true
      },
      //app datastore
      {
        cwd: 'app/datastore',
        src: '**/*.*',
        dest: 'dist/datastore/',
        expand: true
      },
      //fontawesome fonts
      {
        cwd: 'app/bower_components/font-awesome/fonts',
        src: '**/*.*',
        dest: 'dist/fonts/',
        expand: true
      }
    ]
  }
};
