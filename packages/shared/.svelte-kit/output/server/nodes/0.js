

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CBkqIwwm.js","_app/immutable/chunks/BD0j3kGy.js","_app/immutable/chunks/0rLPA_AH.js","_app/immutable/chunks/CB2QPaHd.js"];
export const stylesheets = [];
export const fonts = [];
