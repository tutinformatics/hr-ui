// import { writable } from 'svelte/store';
// export const spaces = writable([]);

import { writable } from 'svelte-persistent-store/dist/local';

export const spaces = writable('spaces', []);