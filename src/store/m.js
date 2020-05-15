import { writable } from 'svelte/store';

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
