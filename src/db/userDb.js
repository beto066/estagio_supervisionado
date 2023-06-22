import { prisma } from './index.js';

const userDb = {
  async usuarios(){
    await prisma.users.findMany().then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async findById(id){
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

  async cadastrarUsuario(user, userName, senha){
    return await prisma.users.create({
      data : {
        nome : user.nome,
        email : user.email,
        userName : userName,
        senha : senha
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();
      return retorno;
    });
  },

  async logar(userName, senha){
    return await prisma.users.findUnique({
      where : {
        userName : userName,
      }
    }).then(async (retorno) => {
      await prisma.$disconnect();

      return retorno;
    });
  },

  async atualizarUsuario(id, user) {
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