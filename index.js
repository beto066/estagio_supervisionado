import { PrismaClient } from '@prisma/client';
import { util } from './src/util/index.js';

const prisma = new PrismaClient()

async function main() {
  // createUsers();
  // createTransacoes();
  // createNotificacoes();
  // createContatos();
  // createLembretes();
};

async function createLembretes() {
  await prisma.lembretes.create({
    data : {
      descricao : "teste1",
      idContato : 2
    }
  });
  await prisma.lembretes.create({
    data : {
      descricao : "teste3",
      idContato : 1
    }
  });
  await prisma.lembretes.create({
    data : {
      descricao : "teste2",
      idContato : 3
    }
  });
  await prisma.lembretes.create({
    data : {
      descricao : "teste5",
      prioridade : true,
      idContato : 5
    }
  });
}

async function createContatos(){
  await prisma.contatos.create({
    data : {
      idUser1 : 3,
      idUser2 : 1,
    }
  });

  await prisma.contatos.create({
    data : {
      idUser1 : 2,
      idUser2 : 1,
    }
  });

  await prisma.contatos.create({
    data : {
      idUser1 : 4,
      idUser2 : 1,
    }
  });

  await prisma.contatos.create({
    data : {
      idUser1 : 3,
      idUser2 : 2,
    }
  });

  await prisma.contatos.create({
    data : {
      idUser1 : 2,
      idUser2 : 5,
    }
  });
}

async function createNotificacoes(){
  await prisma.notificacoes.create({
    data : {
      titulo : 'Titulo',
      descricao : 'teste1',
      data : util.getDataNow(),
      visualizado : false,
      idEmissor : 4,
      idReceptor : 3
    }
  });
  await prisma.notificacoes.create({
    data : {
      titulo : 'Titulo',
      descricao : 'teste2',
      data : util.getDataNow(),
      visualizado : true,
      idEmissor : 1,
      idReceptor : 3
    }
  });
  await prisma.notificacoes.create({
    data : {
      titulo : 'Titulo',
      descricao : 'teste3',
      data : util.getDataNow(),
      visualizado : false,
      idEmissor : 2,
      idReceptor : 3
    }
  });
  await prisma.notificacoes.create({
    data : {
      titulo : 'Titulo',
      descricao : 'teste3',
      data : util.getDataNow(),
      visualizado : false,
      idEmissor : 3,
      idReceptor : 2
    }
  });
  await prisma.notificacoes.create({
    data : {
      titulo : 'Titulo',
      descricao : 'teste3',
      data : util.getDataNow(),
      visualizado : false,
      idEmissor : 4,
      idReceptor : 2
    }
  });
}

async function createTransacoes(){
  await prisma.transacoes.create({
    data : {
      descricao : "teste",
      valor : 3.99,
      data : util.getDataNow(),
      idEmissor : 3,
      idReceptor : 1,
    }
  });
  await prisma.transacoes.create({
    data : {
      descricao : "teste",
      valor : 3.99,
      data : util.getDataNow(),
      idEmissor : 3,
      idReceptor : 1,
    }
  });
  await prisma.transacoes.create({
    data : {
      descricao : "teste2",
      valor : 5.99,
      data : util.getDataNow(),
      idEmissor : 1,
      idReceptor : 2,
    }
  });
  await prisma.transacoes.create({
    data : {
      descricao : "teste3",
      valor : 9.99,
      data : util.getDataNow(),
      idEmissor : 2,
      idReceptor : 4,
    }
  });
}

async function createUsers(){
  await prisma.users.create({
    data : {
      nome: 'Aline',
      email : 'aline@mail.com',
      senha : util.getHash('1234'),
      perfil : 1
    }
  });
  await prisma.users.create({
    data : {
      nome: 'Beatriz',
      email : 'bia@mail.com',
      senha : util.getHash('1234'),
      perfil : 1
    }
  });
  await prisma.users.create({
    data : {
      nome: 'Carla',
      email : 'carla@mail.com',
      senha : util.getHash('1234'),
      perfil : 1
    }
  });
  await prisma.users.create({
    data : {
      nome: 'Daniele',
      email : 'dani@mail.com',
      senha : util.getHash('1234'),
      perfil : 2
    }
  });
  await prisma.users.create({
    data : {
      nome: 'Aline dos reis',
      email : 'carça@mail.com',
      senha : util.getHash('1234'),
      perfil : 1
    }
  });


  // await prisma.user.delete({
  //   where : {
  //     id : 9
  //   }
  // })

//   await prisma.user.update({
//     where : { id: 2 },
//     data : {
//         telefone : '1111 1111'
//     }
//   })

  const allUsers = await prisma.users.findMany();
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })