import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import css from 'cape-style'

// Create styles
const styles = StyleSheet.create({
  row: {
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: 'gray',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  column: {
    flexDirection: 'column',
    width: '50%'
  }
});

// Create Document Component
function Session({SessionID, SessionName, SessionStartTime, SessionType}) {
  return (
    <View style={styles.row} >
      <View style={styles.column} >
        <Text>ID: {SessionID}</Text>
        <Text>Date: {SessionStartTime}</Text>
        <Text>Type: {SessionType}</Text>
      </View>
      <View style={styles.column} >
        <Text>Session Title: {SessionName}</Text>
      </View>
    </View>
  )
}

export default Session
