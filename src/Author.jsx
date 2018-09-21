import React from 'react'

function getName(tagName, presenter) {
  if (tagName) return tagName
  // If no tagName defined we base it off the presenter value.
  return presenter ? 'presenter' : 'author'
}
function Author({
  firstname, lastname, company, presenter, sessionCodes, tagName, ...other
}) {
  const fullName = sessionCodes ? `${lastname}, ${firstname};` : `${firstname} ${lastname}`
  return (
    <div className={getName(tagName, presenter)} {...other}>
      <div className="person">
        <div className="fullname">{fullName}</div>
        { company ? <div className="company">{ company }</div> : false }
        { sessionCodes ? <code dangerouslySetInnerHTML={{ __html: sessionCodes.join(', ') }} /> : false }
      </div>
    </div>
  )
}

export default Author
