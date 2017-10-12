// ES6
import React from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl"
import DrawControl from './draw'

import * as types from './constants'

const Map = ReactMapboxGl({
  accessToken: types.ACCESS_TOKEN,
  minZoom: 20,
  maxZoom: 20
})

// circle: https://www.npmjs.com/package/mapbox-gl-circle

// https://www.mapbox.com/api-documentation/#retrieve-a-dataset
class MapExample extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (<Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
        <DrawControl />
    </Map>)
  }
}

export default MapExample
