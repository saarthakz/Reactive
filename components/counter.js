import { Component } from '../src/lib.js';
import { _ } from '../src/template.js';

export class Counter extends Component {
    constructor(parent, props) {
        super(parent, props);
    };

    render() {
        return _(
            'div', {}, [
            _('button:-', { id: 'dec-btn' }).on('click', (elem, evt) => this.props.count.set(this.props.count.get() - 1))._,
            _(`p:${this.props.count.get()}`)._,
            _('button:+', { id: 'inc-btn' }).on('click', (elem, evt) => this.props.count.set(this.props.count.get() + 1))._,
        ]
        )._;
    };

};