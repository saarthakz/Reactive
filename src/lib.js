// Global variable to keep track of the currently accessed computed or effect
let currentAccessed = null;

export class Signal {
    constructor(initialValue) {
        this._value = initialValue;
        this._components = new Set();
        this._effects = new Set();
    };

    get() {
        return this._value;
    };

    set(newVal) {
        if (this._value !== newVal) {
            this._value = newVal;
            this._notify();
        };
    };

    _subscribe(subscriber) {
        if (subscriber.type === "effect") this._effects.add(subscriber);
        if (subscriber.type === "component") this._components.add(subscriber);
    };

    _notify() {
        for (let { component, parent } of this._components) {
            component.render(parent);
        };

        for (let { effect } of this._effects) {
            effect._execute();
        };
    };
};

export class Effect {
    constructor(effectFn, dependencies) {
        this._effectFn = effectFn;
        this._dependencies = dependencies;
        this._subscribeToDependencies();
        this._isStale = true;
        this._execute();
    };

    _subscribeToDependencies() {

        // dependencies is a list of Signal dependencies 
        for (const dep of this._dependencies) {
            // For each Signal dependency, we add the effect execution as the signal subscription such that whenever the signal changes, the side effect runs
            dep._subscribe({ type: "effect", effect: this });
        };
    };

    _execute() {
        if (this._isStale) {
            currentAccessed = this;
            this._effectFn();
            currentAccessed = null;
        };
    };

    _update() {
        this._isStale = true;
        this._execute();
    };
};

export class Component {
    constructor(parent, props) {
        this.parent = parent;
        this.props = props;
        this.subscribeToProps();
        this.state = {};
    };

    subscribeToProps() {
        for (const val of Object.values(this.props)) {
            if (val instanceof Signal)
                val._subscribe({ type: 'component', component: this, parent });
        };
    };

    subToState() {
        for (const val of Object.values(this.state)) {
            if (val instanceof Signal) val._subscribe({ type: 'component', component: this, parent: this.parent });
        };
    };

    // The method to be overloaded
    _render() { };

    render() {
        this._render();
        globals.initialRender ? globals.afterRenders.push(this.afterRender) : this.afterRender();
    };

};

export const globals = {
    afterRenders: [],
    initialRender: true,
};

export function afterInitRender() {
    console.log(globals);
    globals.afterRenders.forEach((fn) => fn());
    globals.initialRender = false;
};