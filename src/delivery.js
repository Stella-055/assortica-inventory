import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './DeliveryNote.css'; // Include your CSS file for styling
import Companyicon from "./companyicon.png"
const Delivery= () => {
  // State for form inputs
  const [date, setDate] = useState('');
  const [deliveryNo, setDeliveryNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPO, setCustomerPO] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectNo, setProjectNo] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');

  // State for items
  const [items, setItems] = useState([{ productName: '', quantity: 1 }]);

  // State for signatures
  const [preparedBy, setPreparedBy] = useState('');
  const [deliveredBy, setDeliveredBy] = useState('');
  const [receivedBy, setReceivedBy] = useState('');

  // Add new item to the list
  const addItem = () => {
    setItems([...items, { productName: '', quantity: 1 }]);
  };

  // Update item description and quantity
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Remove an item from the list
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Generate PDF with user input
  const generatePDF = () => {
    const doc = new jsPDF();

    // Header: Assortica Enterprises Ltd.
    doc.setTextColor(0, 0, 255); // Set color to blue
    doc.setFontSize(18);
    doc.text('Assortica Enterprises Ltd.', 70, 20);
    doc.addImage(Companyicon, 'svg', 170, 10, 20, 20); 
    // Reset color to black for the rest of the document
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text('Goods Delivery Note', 105, 30, { align: 'center' });

    // Delivery Note Info
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 10, 40);
    doc.text(`Delivery No: ${deliveryNo}`, 150, 40);

    doc.text(`Customer Name: ${customerName}`, 10, 50);
    doc.text(`Customer P.O: ${customerPO}`, 150, 50);

    doc.text(`Project Name: ${projectName}`, 10, 60);
    doc.text(`Project No: ${projectNo}`, 150, 60);

    doc.text(`Invoice No: ${invoiceNo}`, 10, 70);
    doc.text(`Delivery Location: ${deliveryLocation}`, 150, 70);

    // Table for Products
    const tableColumn = ["#", "Product name", "Quantity"];
    const tableRows = [];

    items.forEach((item, index) => {
      const rowData = [index + 1, item.productName, item.quantity.toString()];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 80,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 0, 200], textColor: [255, 255, 255] }
    });
      // Table for Products
   

    // Footer: Signatures and Prepared/Delivered/Received Info
    const footerStartY = doc.lastAutoTable.finalY + 20; // Adjust Y-position after the table

    doc.setFontSize(12);
    doc.text(`Prepared By: ${preparedBy}`, 10, footerStartY);
    doc.text(`Delivered By: ${deliveredBy}`, 80, footerStartY);
    doc.text(`Received By: ${receivedBy}`, 150, footerStartY);

    // Signature lines
 
   

    // Name and Titles
    const nameY = footerStartY+10
    doc.text(`Name: ${preparedBy}`, 10, nameY);
    doc.text(`Name: ${deliveredBy}`, 80, nameY);
    doc.text('Name: ___________________', 150, nameY);
    const titleY = nameY + 10;
    doc.text(`Title/ID: Stores`, 10, titleY);
    doc.text(`Title/ID: Technician`, 80, titleY);
    doc.text('Title/ID: ___________________', 150, titleY);

    const dateY = titleY + 10;
    doc.text(`Date: ${date}`, 10, dateY);
    doc.text(`Date: ${date}`, 80, dateY);
    doc.text('Date: _______________________', 150, dateY);

    // Save PDF
    doc.save(`DeliveryNote-${deliveryNo}.pdf`);
  };

  return (
    <div className="delivery-note-container">
      <h2>Delivery Note</h2>
      <form>
        <div>
          <label>Date:</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Delivery No:</label>
          <input
            type="text"
            value={deliveryNo}
            onChange={(e) => setDeliveryNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Customer P.O:</label>
          <input
            type="text"
            value={customerPO}
            onChange={(e) => setCustomerPO(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Project No:</label>
          <input
            type="text"
            value={projectNo}
            onChange={(e) => setProjectNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Invoice No:</label>
          <input
            type="text"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
        </div>
        <div>
          <label>Delivery Location:</label>
          <input
            type="text"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            required
          />
        </div>

        {/* Items Section */}
        <h3>Items</h3>
        {items.map((item, index) => (
          <div key={index} className="item">
            <input
              type="text"
              placeholder="Product Name"
              value={item.productName}
              onChange={(e) => updateItem(index, 'productName', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', e.target.value)}
              min="1"
              required
            />
            <button type="button" onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>

        {/* Signature Fields */}
        <div>
          <label>Prepared By:</label>
          <input
            type="text"
            value={preparedBy}
            onChange={(e) => setPreparedBy(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Delivered By:</label>
          <input
            type="text"
            value={deliveredBy}
            onChange={(e) => setDeliveredBy(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Received By:</label>
          <input
            type="text"
            value={receivedBy}
            onChange={(e) => setReceivedBy(e.target.value)}
            required
          />
        </div>

        {/* Generate PDF Button */}
        <button type="button" onClick={generatePDF} className="download-button">
          Download Delivery Note
        </button>
      </form>
    </div>
  );
};

export default Delivery;
