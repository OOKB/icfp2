import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import css from 'cape-style'

// Create styles
const styles = StyleSheet.create(css('bgWashedBlue'))

// Create Document Component
function Session({SessionName, SessionStartTime, SessionType}) {
  return (
    <Text>{SessionStartTime}, {SessionName}, {SessionType}</Text>
  )
}

export default Session
