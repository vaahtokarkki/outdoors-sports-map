/*
   eslint-disable
   react/destructuring-assignment,
   react/jsx-props-no-spreading,
   react/no-string-refs,
   react/prop-types,
*/

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Marker } from 'react-leaflet';
import { setLocation } from '../actions';
import { getLocation } from '../selectors';
import latLngToArray from '../helpers';
import AriaHiddenIcon from '../AriaHiddenIcon';

const iconUrl = require('@assets/markers/location.png');
const iconRetinaUrl = require('@assets/markers/location@2x.png');

const createIcon = () =>
  new AriaHiddenIcon({
    iconUrl,
    iconRetinaUrl,
    iconSize: [12, 23],
    iconAnchor: [6, 23],
  });

class UserLocationMarker extends Component {
  constructor(props) {
    super(props);

    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragEnd() {
    const { location } = this.refs;
    this.props.setLocation(latLngToArray(location.leafletElement.getLatLng()));
  }

  render() {
    const { ...rest } = this.props;
    return (
      <Marker
        ref="location"
        icon={createIcon()}
        zIndexOffset={1000}
        draggable
        onDragEnd={this.handleDragEnd}
        {...rest}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  position: getLocation(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setLocation }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserLocationMarker);
