/**
 * Created by Justin on 5/10/2016.
 */
(function(global){

    // map tells the System loader where to look for things
    var map = {
        'app':      'app', // 'dist',
        'rxjs':     'lib/rxjs',
        'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
        'socket.io-client': 'lib/socket.io-client',
        '@angular': 'lib/@angular'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        '@angular/router': { main: 'index.js', defaultExtension: 'js' },
        'rxjs': { main:'/bundles/Rx.umd.js', defaultExtension: 'js' },
        'socket.io-client': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' }
    };

/*    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        //'@angular/platform-server',
        '@angular/router'
    ];
*/

    var packageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router-deprecated'
    ];

    // Individual files (~300 requests):
    function packIndex(pkgName){
        //console.log(pkgName);
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        //console.log(pkgName);
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    // add package entries for angular packages in the form
    //packageNames.forEach(function(pkgName){
    //    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    //});

    packageNames.forEach(setPackageConfig);

    var config = {
        map: map,
        packages: packages
    };

    //if(global.filterSystemConfig){
    //    global.filterSystemConfig(config);
    //}

    System.config(config);

})(this);