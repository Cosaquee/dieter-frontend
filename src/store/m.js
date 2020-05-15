import { writable } from 'svelte/store';
// import { writable, readable, derived } from 'svelte-persistent-store/local';

const MEALS = [];

const { subscribe, set, update } = writable(MEALS);

const addMeal = meal => update(meals => {
    return [...meals, meal];
});

const reset = () => {
    set(MEALS)
};

export default {
    subscribe,
    addMeal,
    reset,
    MEALS
};