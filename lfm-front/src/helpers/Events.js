function on(eventType, listener) {
    document.addEventListener(eventType, listener);
}

function trigger(eventType, data) {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
}

export { on, trigger };