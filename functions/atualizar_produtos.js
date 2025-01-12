import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function atualizar_produtos(req, res) {
  try {
    // capturando os novos dados
    const { novo_nome,
      nova_marca,
      novo_tipo_produto,
      nova_qtd_estoque,
      novo_preco,
      nova_cor } = req.body

    // capturando o id do produto
    const { id } = req.params

    // verificando se os campos estão vazios
    if (novo_nome == ''
      || nova_marca == ''
      || novo_tipo_produto == ''
      || nova_qtd_estoque == ''
      || novo_preco == ''
      || nova_cor == '') {

      // retornando a mensagem de erro 
      return res.status(400).send({
        ok: false,
        mensagem: 'Preencha os campos obrigatórios para atualizar'
      })
    }

    console.log('Dados recebidos: ', req.body)
    console.log('Dados recebidos id: ', req.params)

    // atualizando o produto
    await prisma.product.update({
      where: { id },
      data: {
        nome_produto: novo_nome,
        marca: nova_marca,
        tipo_produto: novo_tipo_produto,
        qtd_estoque: nova_qtd_estoque,
        preco: novo_preco
      }
    })



    // retornando a mensagem de sucesso
    return res.status(200).send({
      ok: true,
      mensagem: 'Produto atualizado com sucesso!'
    })

  } catch (e) {
    console.log(e.message)
    res.status(400).send({
      ok: false,
      mensagem: 'Erro ao atualizar o produto'
    })
  }
}

export { atualizar_produtos }