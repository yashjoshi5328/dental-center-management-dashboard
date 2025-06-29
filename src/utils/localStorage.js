import { USER_KEY } from "./constants";

export const saveUserToLocalStorage = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

export const getUserFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error reading user from localStorage:", error);
    return null;
  }
};

export const removeUserFromLocalStorage = () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Error removing user from localStorage:", error);
  }
};
