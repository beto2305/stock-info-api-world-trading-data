const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let StockSchema = new Schema({
  symbol: {
    type: String,
    required: [true, "symbol is required."]
  },
  type: String
});

module.exports = mongoose.model("Stock", StockSchema);

