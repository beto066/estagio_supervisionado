import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contatoDb = {
  getByUsuario(idUsuario) {
    return prisma.contatos.findMany({
      where : {
        OR : [
          { idUser1 : idUsuario },
          { idUser2 : idUsuario },
        ],
      },
      include : {
        user1 : true,
        user2 : true,
        prioridade : true
      }
    });
  },

  pesquisaByEmailOrNomeUsuario(pesquisa, idUsuarioLogado){
    return prisma.contatos.findMany({
      where : {
        OR : [
          {
            AND : [
              {
                user1 : {
                  nome : {
                    contains: pesquisa,
                    mode: 'insensitive'
                  },
                }
              },
              {
                NOT : {
                  idUser1 : idUsuarioLogado
                } // NOT
              },
              {
                idUser2 : idUsuarioLogado
              }
            ] // AND
          },

          {
            AND : [
              {
                user2 : {
                  nome : {
                    contains: pesquisa,
                    mode: 'insensitive'
                  },
                }
              },
              {
                NOT : {
                  idUser2 : idUsuarioLogado
                } // NOT
              },
              {
                idUser2 : idUsuarioLogado
              }
            ] // AND
          }
        ], // OR
      },
      include : {
        user1 : true,
        user2 : true,
      }
    });
  }
};

export { contatoDb };