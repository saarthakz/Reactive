class BaseElement {
    constructor(type, data, attributes, children = []) {
        const element = document.createElement(type);
        element.textContent = String(data);
        for (let [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        };
        element.append(...children);
        this.element = element;
        this._ = this.element;
    };

    on(eventType, handlerFn) {
        this.element.addEventListener(eventType, () => handlerFn());
        return this;
    };

    attr(name, value) {
        this.element.setAttribute(name, value);
        return this;
    };

};

export function _(input, attributes = {}, children = []) {
    input = input.split(":");
    return new BaseElement(input.at(0), input.at(1) || '', attributes, children);
};
