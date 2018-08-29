import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import data from './data'

// Create styles
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" wrap>
      <View style={styles.section}>
        {data.map((item, i) => <Text key={i}>{item.SessionName}</Text>)}
      </View>
    </Page>
  </Document>
);

export default MyDocument
