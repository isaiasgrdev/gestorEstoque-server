import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function criar_produtos(req, res) {
  try {
    const { nome, marca, tipo_produto, qtd_estoque, preco } = req.body;

    // Verificando se os dados dos produtos estão vazios
    if (!nome || !marca || !tipo_produto || !qtd_estoque || !preco) {
      return res.status(400).send('Preencha todos os campos!');
    }

    // Convertendo qtd_estoque e preco para números, se necessário
    const qtdEstoque = parseInt(qtd_estoque, 10);
    const precoProduto = parseFloat(preco);

    // Verificando se a conversão foi bem-sucedida
    if (isNaN(qtdEstoque) || isNaN(precoProduto)) {
      return res.status(400).send('Quantidade de estoque e preço devem ser números válidos!');
    }

    // variavel responsavel por verificar se ja existe um produto com o nome requerido
    const existe = await prisma.product.findMany({
      where: {
        nome_produto: nome
      }
    })

    console.log(existe)
    console.log(nome)

    // se a variavel "existe" retornar vazio, cria um novo produto
    if (existe != '') {
      return res.status(500).send({
        ok: false,
        mensagem: 'Já existe um produto com esse nome'
      })
    }

    // Criando o produto
    await prisma.product.create({
      data: {
        nome_produto: nome,
        marca: marca,
        tipo_produto: tipo_produto,
        qtd_estoque: qtdEstoque,
        preco: precoProduto,
      },
    });

    return res.status(201).send({
      ok: true,
      mensagem: 'Produto criado com sucesso!',
    });

  } catch (e) {
    console.error(e.message); // Logando o erro no console
    return res.status(500).send({
      ok: false,
      mensagem: 'Erro ao cadastrar produto',
    });
  }
}

export { criar_produtos };