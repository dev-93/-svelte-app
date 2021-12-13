import { writable } from 'svelte/store';

export let todos = writable([
    { id: 1, done: false, description: 'write some docs'},
    { id: 2, done: false, description: 'start writing JSConf talk'},
    { id: 3, done: true, description: 'buy some milk'},
    { id: 4, done: false, description: 'mow the lawn'},
    { id: 5, done: false, description: 'feed the turtle'},
    { id: 6, done: false, description: 'fix some bugs'},
]);