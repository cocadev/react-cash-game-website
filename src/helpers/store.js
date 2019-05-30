import store from "store";

export const addToLocalStorage = (key, value) => {
	store.set(key, value);
};

export const removeFromLocalStorage = (key) => {
	store.remove(key);
};
