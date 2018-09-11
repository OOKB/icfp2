import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import data from './data'
import Session from './Session'

Font.register(
  './UnifrakturCook-Bold.ttf',
  { family: 'Blackletter' },
);

const styles = StyleSheet.create({
  page: {
    paddingTop: '36',
    paddingRight: '54',
    paddingBottom: '90',
    paddingLeft: '54',
    fontFamily: 'Blackletter'
  },
  section: {
    fontFamily: 'Helvetica',
    fontSize: '10',
    flexDirection: 'column',
    width: '100%',
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.section}>
        {data.map((item, i) => <Session key={i} {...item} />)}
      </View>
    </Page>
  </Document>
);

export default MyDocument
