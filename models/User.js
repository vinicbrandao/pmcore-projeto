const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    default: ""
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  senha: {
    type: String,
    required: true
  },

  plano: {
    tipo: {
      type: String,
      enum: ["basico", "pro", null],
      default: null
    },

    nome: {
      type: String,
      default: ""
    },

    periodo: {
      type: String,
      enum: ["mensal", "anual", null],
      default: null
    },

    preco: {
      type: String,
      default: ""
    },

    compradoEm: {
      type: Date,
      default: null
    }
  },

  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);