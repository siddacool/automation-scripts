

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CezjCfgT.js","_app/immutable/chunks/BD0j3kGy.js","_app/immutable/chunks/0rLPA_AH.js","_app/immutable/chunks/C3Td0iB2.js"];
export const stylesheets = [];
export const fonts = [];
