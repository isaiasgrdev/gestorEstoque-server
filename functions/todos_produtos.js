import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function todos_produtos(req, res) {
  try {
    // carregando todos os produtos
    const produtos = await prisma.product.findMany()

    return res.status(200).send({
      ok: true,
      mensagem: 'Produtos listados',
      produtos: produtos
    })
  } catch (e) {
    // passando o erro caso aconteça falha de conexão com o servidor
    console.log(e.message)
    res.status().send({
      ok: false,
      mensagem: 'Falha ao carregar os produtos'
    })
  }
}

export { todos_produtos }