// importando as bibliotecas e funções
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import dotenv from "dotenv";
import { criar_produtos } from "./functions/criar_produto.js";
import { consultar_produtos } from "./functions/consultar_produtos.js";
import { atualizar_produtos } from "./functions/atualizar_produtos.js";
import { deletar_produtos } from "./functions/deletar_produtos.js";
import { todos_produtos } from "./functions/todos_produtos.js";

// instanciando as funções
dotenv.config()
const PORT = process.env.PORT
const app = fastify()

// registrando o plugin cors
app.register(fastifyCors, ({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

// criando as rotas para produtos
app.post('/produtos/criar', criar_produtos)
app.get('/produtos/filtrar', consultar_produtos)
app.get('/produtos/', todos_produtos)
app.put('/produtos/:id', atualizar_produtos)
app.delete('/produtos/:id', deletar_produtos)

// configurando o servidor
app.listen({
  port: PORT,
  host: '0.0.0.0'
}, () => {
  console.log('Servidor funcionando')
})
