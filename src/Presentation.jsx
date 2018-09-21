import React from 'react'
import PropTypes from 'prop-types'

import Author from './Author'

function Presentation({
  authors, description, title, panelPresentations, id,
}) {
  const onlyFrench = description && description.willThisAbstractBePresentedOnlyInFrench
  // const [presenter, ...otherAuthors] = authors;
  // presenter prints out first, presenter with value "1" in the json indicateds presenter
  let PanelPresentationsEl = false
  if (panelPresentations) {
    PanelPresentationsEl = panelPresentations.map(presentation => (
      <div className="panel-presenter">
        <postertitle>{presentation.title}</postertitle>
        <presenter>{presentation.presenter}</presenter>
      </div>
    ))
  }
  return (
    <poster>
      { id ? <sessioncode>{id}</sessioncode> : false }
      { onlyFrench && <div className="francophone" /> }
      { title ? <postertitle>{title}</postertitle> : false }
      { PanelPresentationsEl }
      <authors>
        { authors.map(item => <Author key={item.contactID} {...item} />) }
      </authors>
    </poster>
  )
}

Presentation.propTypes = {
  authors: PropTypes.array.isRequired,
  description: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  panelPresentations: PropTypes.array,
  id: PropTypes.string,
}
export default Presentation
