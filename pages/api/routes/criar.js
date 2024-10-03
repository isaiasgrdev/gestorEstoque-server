import { Produto } from "../models/produtos";
import { connect_db } from "../lib/db";

export default async function criar(req, res) {
  if (req.method == 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.status(200).end();
  }

  // Verificando se o método é POST
  if (req.method == 'POST') {

    try {
      // Capturando os selectores diretamente do corpo da requisição
      const { nome, marca, tipoProduto, preco, qtdEstoque } = req.body;

      // Verificando se os dados estão vazios
      if (!nome || !tipoProduto || !preco || !qtdEstoque) {
        return res.status(400).json({
          ok: false,
          mensagem: 'Preencha todos os campos'
        });
      }

      // Validando se preco e qtdEstoque são números
      if (isNaN(preco) || isNaN(qtdEstoque)) {
        return res.status(400).json({
          ok: false,
          mensagem: 'Preço e quantidade em estoque devem ser números válidos'
        });
      }

      // Conectando ao banco de dados
      await connect_db(res);

      // Criando o Produto
      await Produto.create({
        nome: nome,
        marca: marca,
        tipoProduto: tipoProduto,
        preco: parseFloat(preco), // Convertendo para número
        qtdEstoque: parseInt(qtdEstoque) // Convertendo para número
      });

      console.log(Produto)


      // Passando a mensagem de sucesso
      return res.status(201).json({
        ok: true,
        mensagem: 'Produto criado com sucesso'
      });

    } catch (e) {
      console.error(e.message); // Logando o erro no console
      return res.status(500).json({
        ok: false,
        mensagem: 'Verifique sua conexão e tente novamente'
      });
    }

  }
}