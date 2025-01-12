// importando as bibliotecas e funções
import fastify from "fastify";
import dotenv from "dotenv";
import { criar_produtos } from "./functions/criar_produto.js";
import { consultar_produtos } from "./functions/consultar_produtos.js";
import { atualizar_produtos } from "./functions/atualizar_produtos.js";
import { deletar_produtos } from "./functions/deletar_produtos.js";
import { todos_produtos } from "./functions/todos_produtos.js";

// instanciando as funções
dotenv.config()
const app = fastify()

// criando as rotas para produtos
app.post('/produtos/criar', criar_produtos)
app.get('/produtos/filtrar', consultar_produtos)
app.get('/produtos/', todos_produtos)
app.put('/produtos/:id', atualizar_produtos)
app.delete('/produtos/:id', deletar_produtos)

// configurando o servidor
app.listen({
  port: 5454,
  host: '0.0.0.0'
}, () => {
  console.log('Servidor rodando na porta 5454')
})
