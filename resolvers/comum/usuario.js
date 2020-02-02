const jwt = require("jwt-simple")
const { perfis: obterPerfis } = require("../Type/Usuario")

module.exports = {
  async getUsuarioLogado(usuario) {
    const perfis = await obterPerfis(usuario)
    const agora = Math.floor(Date.now() / 1000) //pega a data atual e segundos, e transforma em inteiro.

    const usuarioInfo = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfis: perfis.map(x => x.nome),
      iat: agora,
      exp: agora + 3 * 24 * 60 * 60 // data_atual_segundos * dias * hora * minutos * segundos
    }

    const authSecret = process.env.APP_AUTH_SECRET
    return {
      ...usuarioInfo,
      token: jwt.encode(usuarioInfo, authSecret)
    }
  }
}
