import { Signal, Effect, Component, globals } from '../src/lib.js';

export class Counter extends Component {
    constructor(parent, props) {
        super(parent, props);
    };

    // For attaching all the event listeners and declaring dynamic behaviour
    afterRender = () => {
        document.getElementById('inc-btn').onclick = (evt) => this.props.count.set(this.props.count.get() + 1);
        document.getElementById('dec-btn').onclick = (evt) => this.props.count.set(this.props.count.get() - 1);
    };

    _render() {
        this.parent.innerHTML += `<div>
            <button id='dec-btn'>-</button>
            <p>${this.props.count.get()}</p>
            <button id='inc-btn'>+</button>
        </div>`;
        globals.initialRender ? globals.afterRenders.push(this.afterRender) : this.afterRender();
    };

};