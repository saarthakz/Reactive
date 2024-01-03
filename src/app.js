import { Counter } from "../components/counter.js";
import { Signal, Component, Effect, globals, afterInitRender } from "./lib.js";

export class App extends Component {
    constructor(parent, props) {
        super(parent, props);
        this.state = {
            count: new Signal(0)
        };
        this.subToState();
        new Effect(() => console.log(this.state.count.get()), [this.state.count]);

    };

    afterRender = () => { };

    _render() {
        const wrapper = document.createElement('div');
        this.parent.innerHTML = `
            ${(() => {
                new Counter(wrapper, this.state).render();
                return wrapper.innerHTML;
            })()}
        `;
    };

};

const app = new App(document.getElementById("app"), {});

app.render();

afterInitRender();