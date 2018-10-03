import React from 'react'
import PropTypes from 'prop-types'

import Author from './Author'

function Presentation({
  authors, description, divId, title, panelPresentations, id,
}) {
  const onlyFrench = description && description.willAbstractPresentedFrench
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

  let DescriptionEl = false
  if (description.text) {
    DescriptionEl = <div className="secondaryDescription" dangerouslySetInnerHTML={{ __html: description.text }} />
  }

  return (
    <div className="poster" id={`p-${divId}`}>
      { id ? <div className="sessioncode">{id}</div> : false }
      { onlyFrench && <div className="francophone" /> }
      { title ? <div className="postertitle">{title}</div> : false }

      { DescriptionEl }

      { PanelPresentationsEl }
      <div className="authors">
        { authors.map(item => <Author key={item.id} {...item} />) }
      </div>
    </div>
  )
}
Presentation.defaultProps = {
  title: null,
  panelPresentations: null,
}
Presentation.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.shape({ willAbstractPresentedFrench: PropTypes.bool }).isRequired,
  divId: PropTypes.string.isRequired,
  title: PropTypes.string,
  panelPresentations: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number.isRequired,
}
export default Presentation
