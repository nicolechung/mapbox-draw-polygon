// ES6
import React from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl"
import DrawControl from 'react-mapbox-gl-draw'

// Don't forget to import the CSS
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import * as types from './constants'

const Map = ReactMapboxGl({
  accessToken: types.ACCESS_TOKEN,
  minZoom: 20,
  maxZoom: 20
});

const polygon = []

// some really small number
const DIFFERENCE = 1 / Math.pow(10, 9)

const finishPolygon = (list, newPoint) => {
  var original = list[0]
  if (original.lat - newPoint.lat < DIFFERENCE && original.lng - newPoint.lng < DIFFERENCE) {
    polygon.push(list[0])
    return true
  }
  return false
}


class MapExample extends React.Component {
  constructor(props) {
    super(props)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.state = {
      polygon: []
    }
  }

  handleMapClick = (event, map) =>{
    console.log(map.lngLat)
    if (this.polygon.length < 1) {
      const polygon = this.state.polygon.concat(map.lngLat)
      this.setState({
        polygon: polygon
      })
      return
    }
    if (finishPolygon(polygon, map.lngLat)) {
      alert('polygon closed')
      return
    }
    const polygon = this.state.polygon.concat(map.lngLat)
    this.setState({
      polygon: polygon
    })
  }

  render() {
    return (<Map
      style="mapbox://styles/mapbox/streets-v9"
      onClick={this.handleMapClick}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
        <DrawControl />
    </Map>)
  }
}

export default MapExample
