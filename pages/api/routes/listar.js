import { connect_db } from "../lib/db";
import { Produto } from "../models/produtos";

export default async function listar(req, res) {
  if (req.method == 'GET') {
    try {
      //pegando os valores diretamente do headers
      const { filtrar, marca, tipoProduto, qtdEstoque } = req.headers

      //Verificando se os campos estão vazios
      if (marca || tipoProduto || qtdEstoque == '') {
        res.json({
          ok: false,
          mensagem: 'Preencha todos os campos'
        })
      }

      //verificando se esses dados não existem
      if (!marca || !tipoProduto || !qtdEstoque) {
        res.json({
          ok: false,
          mensagem: 'Não existe nenhum Produto com essas informações'
        })
      }

      //conectando ao banco de dados
      await connect_db(res)

      if (filtrar == 'todos') {
        await Produto.find()
        //retornando a mensagem de sucesso
        return res.json({
          ok: true,
          mensagem: 'Produtos listados com sucesso'
        })

      }



      //listando o pela marca
      if (filtrar == 'marca') {
        await Produto.find({ marca: marca })
        //retornando a mensagem de sucesso
        return res.json({
          ok: true,
          mensagem: 'Produtos listados com sucesso'
        })

      }

      //listando o pelo tipo de Produto
      if (filtrar == 'tipo de Produto') {
        await Produto.find({ tipoProduto: tipoProduto })
        //retornando a mensagem de sucesso
        return res.json({
          ok: true,
          mensagem: 'Produtos listados com sucesso'
        })
      }

      //listando o pela quantidade
      if (filtrar == 'quantidade em estoque') {
        await Produto.find({ qtdEstoque: qtdEstoque })
        //retornando a mensagem de sucesso
        return res.json({
          ok: true,
          mensagem: 'Produtos listados com sucesso'
        })

      }
    } catch (e) {
      console.log(e.message)
      res.json({
        ok: false,
        mensagem: 'Verifique sua conexão e tente novamente'
      })
    }
  }
}