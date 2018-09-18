import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import css from 'cape-style'

// Create styles
const styles = StyleSheet.create(css('bt'))

// Create Document Component
function Session({SessionID, SessionName, SessionStartTime, SessionType}) {
  return (
    <View style={styles}>
      <Text style={{fontSize: 15, marginTop: 10}}>SessionID: {SessionID}</Text>
      <Text style={{fontSize: 12}}>SessionName: {SessionName}</Text>
      <Text style={{fontSize: 9, marginBottom: 10}}>SessionStartTime: {SessionStartTime} // SessionType: {SessionType}</Text>
    </View>
  )
}

export default Session
