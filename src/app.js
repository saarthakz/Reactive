import { Counter } from "../components/counter.js";
import { Signal, Component, Effect } from "./lib.js";
import { _ } from "./template.js";

export class App extends Component {
    constructor(parent, props) {
        super(parent, props);
        this.state = {
            count: new Signal(0)
        };
        this.subToState();
        new Effect(() => console.log("Count is", this.state.count.get()), [this.state.count]);

    };

    render() {
        return _(
            'p: Paragraph Here',
            {},
            [new Counter(_('div')._, this.state).render()]
        )._;
    };
};

const app = new App(document.getElementById("app"), {});

app.parent.replaceChildren(app.render());
