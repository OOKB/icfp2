import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import data from './data'
import Session from './Session'

const styles = StyleSheet.create({
  page: {
    paddingTop: '36',
    paddingRight: '54',
    paddingBottom: '90',
    paddingLeft: '54',
  },
  section: {
    fontFamily: 'Helvetica',
    fontSize: '10'
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.section} wrap>
        {data.map((item, i) => <Session key={i} {...item} />)}
      </View>
    </Page>
  </Document>
);

export default MyDocument
