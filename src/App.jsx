import React from 'react'
import Apps from './Apps'
import json from './data'

// Create Document Component
const App = () => (
  // <Apps items={json.opening} type="opening" />
  // <Apps items={json.workshop} type="workshop" />
  // <Apps items={json.sessions} type="sessions" />
  <Apps items={json.posters} type="posters" />
)

export default App
