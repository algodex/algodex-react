---
to: components/<%= name %>/index.js
---
<% const comp = h.inflection.undasherize(name) -%>
import React from 'react'
import PropTypes from 'prop-types'

function <%= comp %> (props){
  <>
    
  </>
}  

export default <%= comp %>

<%= comp %>.propTypes = {};
<%= comp %>.defaultProps = {};