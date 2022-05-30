API node com TypeScript
Express

Para rodar no desenvolvimento
Docker:
    docker-compose up
  
    link da coneção com o banco no docker:
    mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}
    DB_HOST = mongoDB

Só o banco no docker:
    altere no arquivo docker-compose o que esta comentado.
    depois 
    banco: docker-compose up
    api: yarn dev
   
    link da coneção com o banco no docker:
    mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT_LOCAL}/${process.env.DB_NAME}
    DB_HOST = 0.0.0.0

sem docker:
    api: yarn dev
    
    link da coneção com o banco no docker:
    mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}
    DB_HOST = localhost
