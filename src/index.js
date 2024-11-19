import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import resolvers from './resolvers/index.js';
import { criarBaseDados } from "./utils/criarDB.js";
import context from "./utils/context.js";
import express from 'express';
import https from 'https';
import fs from 'fs';
import os from 'os';

// Caminho do arquivo que contém o esquema GraphQL
const typeDefs = importSchema('./src/schema/index.graphql'); // Verifique o caminho correto e extensão do arquivo

// Inicializa a base de dados
criarBaseDados();

// Cria uma instância do ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

// Cria uma instância do Express
const app = express();

// Aplica o middleware do Apollo Server ao Express
await server.start();
server.applyMiddleware({ app });

// Lê os certificados SSL
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Função para obter o endereço IP da máquina
function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const networkInterface of interfaces[name]) { // Renomeie "interface" para "networkInterface"
      if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
        return networkInterface.address;
      }
    }
  }
  return 'localhost';
}

// Cria o servidor HTTPS
https.createServer(options, app).listen(4001, () => {
  const ip = getIPAddress();
  console.log(`Servidor HTTPS rodando em https://${ip}:4001${server.graphqlPath}`);
});
