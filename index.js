import { PrismaClient } from '@prisma/client';
import { util } from './src/util/index.js';
import { connect } from 'http2';

const prisma = new PrismaClient()

async function main() {
  await createUsers();
  createTransacoes();
  await createContatos();
  createLembretes();
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
      notificacao : {
        create : {
          titulo : 'Carla deseja se tornar um de seus contatos',
          descricao : 'teste1',
          data : util.getDataNow(),
          idEmissor : 4,
          idReceptor : 3
        }
      },
      user1 : {
        connect : {
          id : 3
        }
      },
      user2 : {
        connect : {
          id : 4
        }
      },
      confirmado : true,
    }
  });

  await prisma.contatos.create({
    data : {
      user1 : {
        connect : {
          id : 2
        }
      },
      user2 : {
        connect : {
          id : 1
        }
      },
      confirmado : true,
      notificacao : {
        create : {
          titulo : 'Beatriz deseja se tornar um de seus contatos',
          descricao : 'teste1',
          data : util.getDataNow(),
          visualizado : false,
          idEmissor : 2,
          idReceptor : 1
        }
      }
    }
  });

  await prisma.contatos.create({
    data : {
      user1 : {
        connect : {
          id : 4
        }
      },
      user2 : {
        connect : {
          id : 1
        }
      },
      confirmado : true,
      notificacao : {
        create : {
          titulo : 'Daniele deseja se tornar um de seus contatos',
          descricao : 'teste1',
          data : util.getDataNow(),
          visualizado : false,
          idEmissor : 4,
          idReceptor : 1
        }
      }
    }
  });

  await prisma.contatos.create({
    data : {
      user1 : {
        connect : {
          id : 3
        }
      },
      user2 : {
        connect : {
          id : 2
        }
      },
      confirmado : true,
      notificacao : {
        create : {
          titulo : 'Carla deseja se tornar um de seus contatos',
          descricao : 'teste1',
          data : util.getDataNow(),
          visualizado : false,
          idEmissor : 3,
          idReceptor : 2
        }
      }
    }
  });

  await prisma.contatos.create({
    data : {
      user1 : {
        connect : {
          id : 2
        }
      },
      user2 : {
        connect : {
          id : 5
        }
      },
      confirmado : true,
      notificacao : {
        create : {
          titulo : 'Beatriz deseja se tornar um de seus contatos',
          descricao : 'teste1',
          data : util.getDataNow(),
          visualizado : false,
          idEmissor : 2,
          idReceptor : 5
        }
      }
    }
  });
}

async function createTransacoes(){
  await prisma.transacoes.create({
    data : {
      descricao : "teste",
      valor : 3.99,
      data : util.getDataNow(),
      confirmado : true,
      emissor : {
        connect : {
          id : 4
        }
      },
      receptor : {
        connect : {
          id : 1
        }
      },
      notificacao : {
        create : {
          titulo : 'Carla solicitou uma transacao',
          descricao : 'teste1',
          data : util.getDataNow(),
          visualizado : false,
          idEmissor : 4,
          idReceptor : 1
        }
      }
    }
  });
  await prisma.transacoes.create({
    data : {
      descricao : "teste",
      valor : 3.99,
      data : util.getDataNow(),
      confirmado : true,
      emissor : {
        connect : {
          id : 5
        }
      },
      receptor : {
        connect : {
          id : 2
        }
      },
      notificacao : {
        create : {
          titulo : 'Carla solicitou uma transacao',
          descricao : 'teste1',
          data : util.getDataNow(),
          visualizado : false,
          idEmissor : 4,
          idReceptor : 3
        }
      }
    }
  });
  await prisma.transacoes.create({
    data : {
      descricao : "teste2",
      valor : 5.99,
      data : util.getDataNow(),
      confirmado : true,
      emissor : {
        connect : {
          id : 1
        }
      },
      receptor : {
        connect : {
          id : 2
        }
      },
      notificacao : {
        create : {
          titulo : 'Alice solicitou uma transacao',
          descricao : 'teste1',
          data : util.getDataNow(),
          visualizado : false,
          idEmissor : 1,
          idReceptor : 2
        }
      }
    }
  });
  await prisma.transacoes.create({
    data : {
      descricao : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      valor : 39.99,
      data : util.getDataNow(),
      confirmado : true,
      emissor : {
        connect : {
          id : 1
        }
      },
      receptor : {
        connect : {
          id : 2
        }
      },
      notificacao : {
        create : {
          titulo : 'Beatriz solicitou uma transacao',
          descricao : 'teste1',
          data : util.getDataNow(),
          visualizado : false,
          idEmissor : 2,
          idReceptor : 4
        }
      }
    }
  });
}

async function createUsers(){
  await prisma.users.create({
    data : {
      nome: 'Aline',
      userName : 'Aline',
      email : 'aline@mail.com',
      senha : util.getHash('1234'),
      perfil : 1
    }
  });
  await prisma.users.create({
    data : {
      nome: 'Beatriz',
      userName : 'Biazinha',
      email : 'bia@mail.com',
      senha : util.getHash('1234'),
      perfil : 1
    }
  });
  await prisma.users.create({
    data : {
      nome: 'Carla',
      userName : 'Carlota',
      email : 'carla@mail.com',
      senha : util.getHash('1234'),
      perfil : 1
    }
  });
  await prisma.users.create({
    data : {
      nome: 'Daniele',
      userName : 'DaniLoka',
      email : 'dani@mail.com',
      senha : util.getHash('1234'),
      perfil : 2
    }
  });
  await prisma.users.create({
    data : {
      nome: 'Aline dos reis',
      userName : 'Aline_Oficial',
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