import classNames from 'classnames';

export const cx = classNames;

export const setOnLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
}

export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};