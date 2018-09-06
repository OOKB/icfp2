import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
})

// Create Document Component
function Session({SessionName}) {
  return (
    <Text>{SessionName}</Text>
  )
}

export default Session
