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

const polygon1 = [[
  [-0.24193999790344378, 51.52863615800902],
  [-0.2420037003705886, 51.528575668862544],
  [-0.24187428378721165, 51.52854563284197],
  [-0.2417797359212841, 51.528599447363206],
  [-0.24186556660015412, 51.52865493049168],
  [-0.24193999790344378, 51.52863615800902]
]]

// WHY this has to be an array inside an array?
const polygon2 = [[
  [-0.2416509898788206, 51.528656807771824],
  [-0.2417582782421448, 51.52860257614756],
  [-0.24163891993626407, 51.52858922681716],
  [-0.24145116531036592, 51.52861842847642],
  [-0.2416509898788206, 51.528656807771824]
]]

const polygonPaint = {
  'fill-color': '#6F788A',
  'fill-opacity': .7
};
// circle: https://www.npmjs.com/package/mapbox-gl-circle

// https://www.mapbox.com/api-documentation/#retrieve-a-dataset
class MapExample extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log(this.drawControl.draw.getAll());
  }

  render() {
    return (<Map
    onClick={this.handleClick}
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
        <DrawControl ref={(drawControl) => { this.drawControl = drawControl; }}/>
        <Layer
          type="fill"
          paint={polygonPaint}>
          <Feature coordinates={polygon1}/>
        </Layer>
        <Layer
          type="fill"
          paint={polygonPaint}>
          <Feature coordinates={polygon2}/>
        </Layer>
    </Map>)
  }
}

export default MapExample
