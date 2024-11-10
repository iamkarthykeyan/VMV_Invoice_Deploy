const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  buyerCompanyName: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  date: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
}, { timestamps: true });

// Collection name explicitly set
const History = mongoose.model('History', HistorySchema, 'History_Details');

module.exports = History;
