import React from 'react';
import ReactPDF from '@react-pdf/node';
import MyDocument from './App';

ReactPDF.render(<MyDocument />, `example.pdf`);
