import crypto from "crypto";
import { userDb } from '../db/userDb.js';

const usuarioLogadoTest = await userDb.findById(2);

const util = {
  getHash : (message) => crypto.createHash('sha512').update(message).digest('hex'),
  getDataNow : () => new Date(Date.now()).toISOString(),
  setUsuarioLogadoTest(usuario){
    console.log(usuario)
    usuarioLogadoTest = userDb.findById(usuario);
    console.log(usuarioLogadoTest);
  },
  getUsuarioLogadoTest : () => usuarioLogadoTest,
  gambira : async (variavel) =>{} 
};

export { util }