import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import css from 'cape-style'

// Create styles
const styles = StyleSheet.create(css('bb'))

// Create Document Component
function Session({SessionName, SessionStartTime, SessionType}) {
  return (
    <View style={styles} wrap>
      <Text>{SessionStartTime}</Text>
      <Text>{SessionName}</Text>
      <Text>{SessionType}</Text>
    </View>
  )
}

export default Session
