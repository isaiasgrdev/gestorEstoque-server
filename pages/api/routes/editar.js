import { connect_db } from "../lib/db";
import { produto } from "../models/produtos";

export default async function editar(req, res) {
  if (req.method == 'PUT') {
    try {
      //capturando os elementos diretamente do corpo da requisição
      const { nome, novoNome, novaMarca, novoTipo, novoPreco, novoQtd } = req.body

      //Verificando se os campos estão vazios
      if (novoNome || novaMarca || novoTipo || novoPreco || novoQtd == '') {
        return res.json({
          ok: false,
          mensagem: 'Preencha todos os campos!!'
        })
      }

      //conectando ao banco de dados
      await connect_db(res)

      //ediatando os produtos
      await produto.updateOne({ nome: nome },
        {
          novoNome: novoNome,
          novaMarca: novaMarca,
          novoTipo: novoTipo,
          novoPreco: novoPreco,
          novoQtd: novoQtd
        })

      //retornando a mensagem de sucesso
      return res.json({
        ok: true,
        mensagem: 'O produto foi atualizado!'
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