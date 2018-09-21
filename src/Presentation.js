import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Author from './Author'

class Presentation extends Component {
  render() {
    const {
      authors, title, panelPresentations, id,
    } = this.props

    // const [presenter, ...otherAuthors] = authors;
    // presenter prints out first, presenter with value of "1" in the json indicated they are the presenter
    let PanelPresentationsEl = false
    if (panelPresentations) {
      PanelPresentationsEl = panelPresentations.map(({ title, presenter }) => (
        <div className="panel-presenter">
          <postertitle>{title}</postertitle>
          <presenter>{presenter}</presenter>
        </div>
      ))
    }
    return (
      <poster>
        { id ? <sessionCode>{id}</sessionCode> : false }
        { title ? <postertitle>{title}</postertitle> : false }
        { PanelPresentationsEl }
        <authors>
          { authors.map(item => <Author key={item.contactID} {...item} />) }
        </authors>
      </poster>
    )
  }
}
Presentation.propTypes = {
  authors: PropTypes.array.isRequired,
  title: PropTypes.object.isRequired,
  panelPresentations: PropTypes.array,
  id: PropTypes.string,
}
export default Presentation
