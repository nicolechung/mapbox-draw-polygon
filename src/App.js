import React, { Component } from 'react'
import Map from 'components/map'
import style from 'components/style.css'

class App extends Component {
  render () {
    return (
      <div>
        <header>
          <h1>A map</h1>
          <Map className={style.container} />
        </header>
      </div>
    )
  }
}

export default App
