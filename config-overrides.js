const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

cmd = getFileName(process.argv[1]);
src_dir = process.argv[2];
build_dir = process.argv[3];
public_dir = "public";

console.log("cmd:", cmd);
console.log("src dir:", src_dir);
if(cmd == "build.js")
	console.log("build dir:", build_dir);

if(typeof src_dir === 'undefined' || cmd == "build.js" && typeof build_dir === 'undefined'){
	console.log("Not all arguments were provided");
	process.exit(1);
}


module.exports = {
    paths: function (paths, env) {
        paths.appIndexJs = path.resolve(__dirname, src_dir + '/index.tsx');
        paths.appSrc = path.resolve(__dirname, src_dir);
		paths.testsSetup = path.resolve(__dirname, src_dir + '/setupTests.ts');
		paths.proxySetup = path.resolve(__dirname, src_dir + '/setupProxy.js');
		paths.swSrc = path.resolve(__dirname, src_dir + '/service-worker.ts');
		paths.appTypeDeclarations = path.resolve(__dirname, src_dir + '/react-app-env.d.ts');
		if(cmd == "build.js")
			paths.appBuild = path.resolve(__dirname, build_dir);
		paths.appPublic = path.resolve(__dirname, public_dir);
		paths.appHtml = path.resolve(__dirname, public_dir + '/index.html');
        return paths;
    },
	webpack: function (config, env) {
		config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
		return config;
	},
	jest: function(config) {
        let src_dir_in = src_dir;
        if(src_dir.indexOf('/') != -1)
            src_dir_in = src_dir.split('/')[1];

		config.roots = ['<rootDir>/' + src_dir_in],
		config.collectCoverageFrom = [src_dir_in + '/**/*.{js,jsx,ts,tsx}', '!' + src_dir_in + '/**/*.d.ts'];
		config.setupFilesAfterEnv = ['<rootDir>/' + src_dir_in + '/setupTests.ts'];
		config.testMatch = [
			'<rootDir>/' + src_dir_in + '/**/__tests__/**/*.{js,jsx,ts,tsx}',
			'<rootDir>/' + src_dir_in + '/**/*.{spec,test}.{js,jsx,ts,tsx}',
		];
		return config;
	}
}


function getFileName(path){
	return path.split('\\').pop().split('/').pop();
}