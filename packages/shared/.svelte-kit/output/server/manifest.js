export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DXoPj7D-.js",app:"_app/immutable/entry/app.BDdLwJML.js",imports:["_app/immutable/entry/start.DXoPj7D-.js","_app/immutable/chunks/CjpaXY6j.js","_app/immutable/chunks/0rLPA_AH.js","_app/immutable/chunks/DZPD8nSJ.js","_app/immutable/entry/app.BDdLwJML.js","_app/immutable/chunks/0rLPA_AH.js","_app/immutable/chunks/Bi-yJ7m7.js","_app/immutable/chunks/BD0j3kGy.js","_app/immutable/chunks/DZPD8nSJ.js","_app/immutable/chunks/CB2QPaHd.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
