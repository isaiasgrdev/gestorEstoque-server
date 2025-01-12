import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function deletar_produtos(req, res) {
  try {
    // capturando o id do produto diretamente dos params
    const { id } = req.params

    if (!id) {
      return res.status(500).send({
        ok: false,
        mensagem: 'Produto não encontrado'
      })
    }

    // deletando o produto
    await prisma.product.deleteMany({
      where: { id }
    })

    // retpornando a memsagem de sucesso
    return res.status(200).send({
      ok: true,
      mensagem: 'Produto deletado!'
    })

  } catch (e) {
    console.log(e.message)
    res.status(500).send({
      ok: false,
      mensagem: 'Erro ao deletar o produto.'
    })
  }
}

export { deletar_produtos }