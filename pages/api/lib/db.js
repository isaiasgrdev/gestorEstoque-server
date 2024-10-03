import mongoose from 'mongoose'

const connect_db = async (res) => {
  try {
    mongoose.connect(process.env.DB)
  } catch (erro) {
    return res.json({
      ok: false,
      mensagem: 'Verifique sua internet e tente novamente!',
    })
  }
}

export { connect_db }