import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function consultar_produtos(req, res) {
  try {
    const { nome, marca, tipo_produto, cor } = req.query

    // criando uma variavel de filtragem
    const filtros = {}

    // verificando se os dados dos produtos estão vazios
    if (nome == '' || marca == '' || tipo_produto == '') {
      return res.status(400).send({
        ok: false,
        mensagem: 'Preencha todos os campos!'
      })
    }

    if (nome) {
      filtros.nome_produto = {
        contains: nome,
        mode: 'insensitive'
      }
    }

    if (marca) {
      filtros.marca = {
        contains: marca,
        mode: 'insensitive'
      }
    }

    if (cor) {
      filtros.cor = cor
    }

    if (tipo_produto) {
      filtros.tipo_produto = tipo_produto
    }

    const produtos = await prisma.product.findMany({
      where: filtros
    })


    // verificando se os filtros tem alguma informação
    if (produtos == '' || produtos == null) {
      return res.status(500).send({
        ok: false,
        mensagem: 'Não existe nenhum produto com essas informações.'
      })
    }

    // passando a mensagem de sucesso e os produtos encontrados
    return res.status(201).send({
      ok: true,
      mensagem: 'Produtos encontrados.',
      produtos: produtos
    })

  } catch (e) {
    console.log(e.message)
    return res.status(400).send({
      ok: false,
      mensagem: 'Erro ao consultar produtos.'
    })

  }
}

export { consultar_produtos }