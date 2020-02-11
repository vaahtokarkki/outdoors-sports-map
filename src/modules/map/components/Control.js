import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { MapControl } from 'react-leaflet';

export default class Control extends MapControl { // note we're extending MapControl from react-leaflet, not Component from react
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { className, children } = this.props;

    const control = L.control({
      position: this.props.position || 'bottomright',
    }); // see http://leafletjs.com/reference.html#control-positions for other positions

    control.handleClick = this.handleClick;

    // eslint-disable-next-line func-names
    control.onAdd = function () {
      const div = L.DomUtil.create('div', `custom-control ${className}`);
      const link = L.DomUtil.create('a', 'custom-control-button', div);

      L.DomEvent
        .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
        .on(link, 'click', L.DomEvent.stop)
        .on(link, 'click', this.handleClick, control);

      ReactDOM.render(children, link);

      return div;
    };

    this.leafletElement = control;
  }

  // `createLeafletElement` is mandatory for custom components
  // TODO: Evaluate with `react-leaflet` v2 or when the logic for this component will change
  //
  // https://github.com/PaulLeCam/react-leaflet/blob/master/UPGRADING.md#v11
  // https://react-leaflet.js.org/docs/en/v1/custom-components
  // eslint-disable-next-line class-methods-use-this
  createLeafletElement() {}

  handleClick(event) {
    L.DomEvent.stopPropagation(event);
    event.stopPropagation();

    // eslint-disable-next-line no-unused-expressions
    this.props.handleClick && this.props.handleClick(event);
  }
}

Control.propTypes = {
  handleClick: PropTypes.func,
};
