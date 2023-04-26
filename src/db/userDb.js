import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userDb = {
  usuarios : async () => await prisma.users.findMany(),

  async findById(id){
    return await prisma.users.findUnique({
      where : {
        id : id
      }
    });
  },

  async searchByNomeOrEmail(pesquisa){
    return await prisma.users.findMany({
      where : {
        OR : [
          {
            nome : {
              contains: pesquisa,
              mode: 'insensitive'
            }
          },
          {
            email : {
              contains: pesquisa,
              mode: 'insensitive'
            }
          },
        ]
      }
    });
  },

  async cadastrarUsuario(user){
    return await prisma.users.create({data : user});
  },

  async atualizarUsuario(id, user) {
    return await prisma.users.update({
      data: user,
      where : {
        id : id
      }
    });
  },

  async deletarUsuario(id) {
    return await prisma.users.update({
      where : {
        id : id
      },
      data : {
        ativo : false
      }
    });
  }
};

export { userDb };