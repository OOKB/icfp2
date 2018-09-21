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
      <p className="person">
        <span className="fullname">{fullName}</span>
        { company ? <span className="company">{ company }</span> : false }
        { sessionCodes ? <code dangerouslySetInnerHTML={{ __html: sessionCodes.join(', ') }} /> : false }
      </p>
    </div>
  )
}

export default Author
