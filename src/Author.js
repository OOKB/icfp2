import React, { Component } from 'react';

class Author extends Component {
  render() {
    const { firstname, lastname, company, presenter, SessionCodes, tagName, ...other } = this.props;
    let element = tagName;
    // If no tagName defined we base it off the presenter value.
    if (!tagName) {
      if (presenter) {
        element = 'presenter';
      } else {
        element = 'author';
      }
    }

    let fullName = `${firstname} ${lastname}`;
    if (SessionCodes) {
      fullName = `${lastname}, ${firstname};`;
    }
    const separator = ', ';
    // Define the insides of the component.
    const DetailsEl = (
      <person>
        <fullname>{fullName}</fullname>
        { company ? <company>{ company }</company> : false }
        { SessionCodes ? <code dangerouslySetInnerHTML={{__html: SessionCodes.join(', ')}}  /> : false }
      </person>
    );
    // Use function call instead of jsx to use computed tag name.
    return React.createElement(element, other, DetailsEl);
  }
}

export default Author;
