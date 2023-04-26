import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let perfis = [
  {id : 1, descricao : "NORMAL"},
  {id : 2, descricao : "ADMIN"}
];

const db = {
  usuarios : async () => await prisma.user.findMany(),

  async findUsuario(id){
    return await prisma.user.findUnique({
      where : {
        id : id
      }
    })
  },

  async searchUsuario(nome){
    return await prisma.user.findMany({
      where : {
        nome : {
          contains: nome,
          mode: 'insensitive'
        }
      }
    });
  },

  cadastrarUsuario : async (user) => await prisma.user.create({data : user}),

  async atualizarUsuario(id, user) {
    return await prisma.user.update({
      data: user,
      where : {
        id : id
      }
    });
  },

  async deletarUsuario(id) {
    return await prisma.user.delete({
      where : {
        id : id
      }
    });
  }
};

export { db };