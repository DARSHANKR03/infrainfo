import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Export data to PDF format
 * @param {Array} columns - Array of column objects with key and label
 * @param {Array} rows - Array of data rows
 * @param {string} title - Report title
 * @param {string} fileName - Output file name (without extension)
 */
export function exportToPDF(columns, rows, title = 'Report', fileName = 'report') {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.setTextColor(40, 60, 100);
  doc.text(title, 14, 20);
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
  
  // Prepare table headers
  const headers = columns.map(col => col.label);
  
  // Prepare table data - extract raw values from rows
  const data = rows.map(row => {
    return columns.map(col => {
      const value = row[col.key];
      // Handle nested objects (like assetName from asset key)
      if (col.key === 'asset' && row.assetName) {
        return row.assetName;
      }
      // Convert objects and arrays to strings
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
      }
      return value || '-';
    });
  });
  
  // Generate table
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 35,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: { top: 35 },
  });
  
  // Save the PDF
  doc.save(`${fileName}.pdf`);
}

/**
 * Export data to CSV format
 * @param {Array} columns - Array of column objects with key and label
 * @param {Array} rows - Array of data rows
 * @param {string} fileName - Output file name (without extension)
 */
export function exportToCSV(columns, rows, fileName = 'report') {
  // Create CSV header
  const headers = columns.map(col => col.label).join(',');
  
  // Create CSV rows
  const csvRows = rows.map(row => {
    return columns.map(col => {
      let value = row[col.key];
      
      // Handle nested objects
      if (col.key === 'asset' && row.assetName) {
        value = row.assetName;
      }
      
      // Handle special characters and quotes
      if (typeof value === 'string') {
        value = value.replace(/"/g, '""'); // Escape quotes
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
          value = `"${value}"`;
        }
      } else if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value).replace(/"/g, '""');
        value = `"${value}"`;
      } else if (value === null || value === undefined) {
        value = '';
      }
      
      return value;
    }).join(',');
  });
  
  // Combine header and rows
  const csvContent = [headers, ...csvRows].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export data to XLSX format
 * @param {Array} columns - Array of column objects with key and label
 * @param {Array} rows - Array of data rows
 * @param {string} fileName - Output file name (without extension)
 * @param {string} sheetName - Excel sheet name
 */
export function exportToXLSX(columns, rows, fileName = 'report', sheetName = 'Report') {
  // Prepare data for Excel
  const excelData = rows.map(row => {
    const rowData = {};
    columns.forEach(col => {
      let value = row[col.key];
      
      // Handle nested objects
      if (col.key === 'asset' && row.assetName) {
        value = row.assetName;
      }
      
      // Convert complex objects to strings
      if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value);
      }
      
      rowData[col.label] = value || '';
    });
    return rowData;
  });
  
  // Create workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  
  // Set column widths
  const maxWidths = columns.map(col => {
    const headerLength = col.label.length;
    const maxContentLength = Math.max(
      ...rows.map(row => {
        const value = row[col.key];
        if (col.key === 'asset' && row.assetName) {
          return String(row.assetName).length;
        }
        return String(value || '').length;
      }),
      0
    );
    return Math.max(headerLength, maxContentLength);
  });
  
  worksheet['!cols'] = maxWidths.map(width => ({ wch: Math.min(width + 2, 50) }));
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Generate and download file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

/**
 * Get sanitized filename from title
 * @param {string} title - Report title
 * @returns {string} Sanitized filename
 */
export function sanitizeFileName(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
