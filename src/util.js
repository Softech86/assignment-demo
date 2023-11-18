export const clickSelf = (callback, ...customParam) => (event) => {
    if (event.target === event.currentTarget) {
        callback(...customParam);
    } else {
        console.warn('clickSelf: event.target !== event.currentTarget')
    }
};

export const stopPropagation = (callback, ...customParam) => (event) => {
    event.stopPropagation();
    callback?.(...customParam);
};
