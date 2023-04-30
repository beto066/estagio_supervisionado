import { PrismaClient } from '@prisma/client';

const userDb = {
  async usuarios(){
    const prisma = new PrismaClient();

    await prisma.users.findMany().then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async findById(id){
    const prisma = new PrismaClient();

    return await prisma.users.findUnique({
      where : {
        id : id
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async searchByNomeOrEmail(pesquisa){
    const prisma = new PrismaClient();

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
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async cadastrarUsuario(user){
    const prisma = new PrismaClient();
    
    return await prisma.users.create({data : user}).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async atualizarUsuario(id, user) {
    const prisma = new PrismaClient();
    
    return await prisma.users.update({
      data: user,
      where : {
        id : id
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async deletarUsuario(id) {
    const prisma = new PrismaClient();
    
    return await prisma.users.update({
      where : {
        id : id
      },
      data : {
        ativo : false
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  }
};

export { userDb };