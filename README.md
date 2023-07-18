# Sistema Lancheria - API Node com TypeScript e Express

Esta é uma API desenvolvida em Node.js com TypeScript e Express para um sistema de lancheria. Ela permite gerenciar os pedidos, produtos e outras funcionalidades relacionadas à lancheria.

## Tecnologias Utilizadas

Mongo, Express, Node, Docker

## Como Baixar

Para baixar o projeto, siga as etapas abaixo:

1. Clone este repositório em seu ambiente de desenvolvimento:

   ```
   git clone git@github.com:GUIHUFF/projetoLPW-backend.git
   ```

2. Altere para a branch "developer":

   ```
   git checkout -b developer origin/developer
   ```

## Rodando o Projeto em Desenvolvimento

### Docker

Para executar o projeto utilizando Docker, siga os passos abaixo:

1. Execute o comando a seguir para iniciar os containers do Docker:

   ```
   docker-compose up
   ```

2. A conexão com o banco de dados MongoDB estará disponível em:

   ```
   mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}
   DB_HOST = mongoDB
   ```

### Somente o Banco no Docker

Se você deseja executar apenas o banco de dados no Docker, siga os passos abaixo:

1. Comente as seções relacionadas à API no arquivo `docker-compose.yml`.

2. Execute o seguinte comando para iniciar apenas o container do banco de dados:

   ```
   docker-compose up
   ```

3. A conexão com o banco de dados MongoDB estará disponível em:

   ```
   mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT_LOCAL}/${process.env.DB_NAME}
   DB_HOST = 0.0.0.0
   ```

### Sem Docker

Se você preferir executar o projeto sem o Docker, siga as etapas abaixo:

1. Execute o seguinte comando para iniciar a API:

   ```
   yarn dev
   ```

2. A conexão com o banco de dados MongoDB estará disponível em:

   ```
   mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}
   DB_HOST = localhost
   ```

## Contribuição

Fique à vontade para contribuir com melhorias para este projeto. Se você encontrar algum bug, tiver sugestões de funcionalidades ou quiser adicionar uma nova feature, abra uma [issue](https://github.com/GUIHUFF/projetoLPW-backend/issues) ou envie um pull request com suas alterações.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
