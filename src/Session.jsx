import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import css from 'cape-style'

// Create styles
const styles = StyleSheet.create(css('bt'))

// Create Document Component
function Session({SessionID, SessionName, SessionStartTime, SessionType}) {
  return (
    <View style={styles} wrap>
      <Text style={{marginTop: 10}}>ID: {SessionID}</Text>
      <Text>Date: {SessionStartTime}</Text>
      <Text>Session Title: {SessionName}</Text>
      <Text style={{marginBottom: 10}}>Type: {SessionType}</Text>
    </View>
  )
}

export default Session
