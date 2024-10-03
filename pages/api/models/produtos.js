import { Schema, model, models } from 'mongoose'

const ProdutoSchema = new Schema({
  nome: String,
  marca: String,
  tipoProduto: String,
  preco: Number,
  qtdEstoque: Number
})

const Produto = models.Produto || model('Produto', ProdutoSchema)

export { Produto }