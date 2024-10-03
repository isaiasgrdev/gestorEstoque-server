import { produto } from "../models/produtos";
import { connect_db } from "../lib/db";

export default async function apagar(req, res) {
  if (req.method == 'DELETE') {
    try {
      //capturando os elementos diretamente do corpo da requisição
      const { nome } = req.body

      //verificando se o produto não existe
      if (!nome) {
        return res.json({
          ok: false,
          mensagem: 'Não existem dados para essa requisição'
        })
      }

      //conectando ao banco de dados
      await connect_db(res)

      //deletando o produto
      await produto.deleteOne({ nome: nome })

      //retornando a mensagem de sucesso
      return res.json({
        ok: true,
        mensagem: 'Produto apagado com sucesso!'
      })

    } catch (e) {
      console.log(e.message)
      return res.json({
        ok: false,
        mensagem: 'Verifique sua conexão e tente novamente'
      })
    }
  }

}