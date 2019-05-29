const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  symbol: {
    type: String,
    required: [true, "symbol is required."]
  },
  type: String
});

const Stock = mongoose.model("Stock", StockSchema);
module.exports = Stock;
