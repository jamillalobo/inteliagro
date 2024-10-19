# Sistema de Gerenciamento de Plantações - InteliAgro
## Descrição
O InteliAgro é um sistema completo de gerenciamento de plantações desenvolvido para agrônomos e agricultores, com foco no acompanhamento das atividades agrícolas, gestão de áreas plantadas, consumo de água e estágio de plantio. A plataforma permite uma visão integrada das plantações, conectando agricultores a agrônomos e otimizando o processo de decisão com base em dados.

## Tecnologias
O projeto foi desenvolvido utilizando as seguintes tecnologias:

- NestJS - Framework Node.js para a construção de aplicativos escaláveis.
- TypeORM - ORM para manipulação do banco de dados.
- PostgreSQL - Sistema de banco de dados relacional.
- Docker - Para a criação de containers e gerenciamento do ambiente de desenvolvimento e produção.
  
## Funcionalidades
Para Agrônomos:
- Cadastro e gerenciamento de agrônomo.
- Listagem de agrônomos.
- Listagem de agrônomo por CPF.
  
Para Agricultores:
- Cadastro de agricultores.
- Listagem de agricultores.
- Listagem de agricultor por CPF.
- Remoção de agricultor.

Para Plantaações:
- Criação de plantação.
- Listagem de plantações por agricultor.
- Atualização de plantação.
- Remoção de plantação.

## Requisitos
- Node.js (versão 18 ou superior)
- Docker Desktop
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório
```
git clone https://github.com/username/inteliagro.git
```
2. Acesse a pasta
```
cd inteliagro
```
3. Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente:
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=inteliagro
Instale as dependências:
```

4. Baixe as dependências:
```
npm install
```
5. Executando via Docker
```
docker network create inteliagro
docker run -d --name inteliagro-db --network inteliagro -p 5432:5432 -e POSTGRES_DB=postgres -e POSTGRES_PASSWORD=12345678 -e POSTGRES_USER=postgres postgres:16
```

6. Eecutando as migrations
```
npm run migration:run
```

6. Rodando a aplicação
```
npm run start:dev
```

7. A aplicação estará disponível em: http://localhost:3000
