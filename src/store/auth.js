import { writable } from 'svelte/store';

const user = {};
const { subscribe, set, update } = writable(user);

const authUser = user => update(users => {
    return {
        isAuthenticated: true,
        id: user.username,
        attributes: user.attributes,
        token: user["signInUserSession"]["idToken"]
    }
});

const reset = () => {
    set({});
};

export default {
    subscribe,
    authUser,
    reset,
    user
};