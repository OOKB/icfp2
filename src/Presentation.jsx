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
        <div className="postertitle">{presentation.title}</div>
        <div className="presenter">{presentation.presenter}</div>
      </div>
    ))
  }
  return (
    <div className="poster">
      {/* { id ? <div className="sessioncode">{id}</div> : false } */}
      { onlyFrench && <div className="francophone" /> }
      { title ? <div className="postertitle">{title}</div> : false }
      { PanelPresentationsEl }
      <div className="authors">
        { authors.map(item => <Author key={item.contactID} {...item} />) }
      </div>
    </div>
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
