# Implementação e Configuração de uma API em VPS Hostinger

## 1. Configuração Inicial da VPS
- **Acesso SSH**
  - Conecte-se à VPS usando um cliente SSH.
  - Exemplo:
    ```bash
    ssh username@IP-VPS
    ```
- **Atualização do Sistema**
  - Atualize os pacotes do sistema:
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```

## 2. Configuração do Ambiente Node.js
- **Instalação do Node.js**
  - Instale o Node.js e npm:
    ```bash
    sudo apt install nodejs npm -y
    ```
  - Verifique as versões instaladas:
    ```bash
    node -v
    npm -v
    ```

## 3. Configuração do Projeto
- **Clonar o Projeto ou Enviar Arquivos**
  - Clone seu projeto ou envie os arquivos para a VPS:
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```
- **Instalar Dependências**
  - Navegue até o diretório do projeto e instale as dependências:
    ```bash
    cd [NOME_DO_PROJETO]
    npm install
    ```

## 4. Geração de Chaves SSL Localmente (Dentro do Repositório da API)
- **Criar o Diretório para Certificados**
  - No diretório do seu projeto, crie uma pasta chamada `certificates`:
    ```bash
    mkdir certificates
    ```
- **Geração das Chaves SSL**
  - Use o OpenSSL para gerar uma chave privada e um certificado autoassinado:
    ```bash
    openssl req -newkey rsa:2048 -nodes -keyout certificates/key.pem -x509 -days 365 -out certificates/cert.pem
    ```

## 5. Configuração do Servidor Node.js para Usar SSL
- **Modificar o Código do Servidor**
  - Abra o arquivo principal do seu servidor (por exemplo, `index.js`) e configure o servidor para usar HTTPS:
    ```javascript
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

    ```

## 6. Configuração do SSL para Apache
- **Instalação do Apache2**
  - Se o Apache não estiver instalado, instale-o:
    ```bash
    sudo apt install apache2 -y
    ```
- **Ativar Módulos SSL e Rewrite**
  - Ative os módulos SSL e Rewrite:
    ```bash
    sudo a2enmod ssl
    sudo a2enmod rewrite
    ```
- **Configuração do Virtual Host com SSL**
  - Crie ou edite um arquivo de configuração para o seu domínio:
    ```bash
    sudo nano /etc/apache2/sites-available/seusite-ssl.conf
    ```
  - Adicione a seguinte configuração:
    ```apache
    <VirtualHost *:443>
        ServerAdmin admin@seusite.com
        ServerName seusite.com
        ServerAlias www.seusite.com

        DocumentRoot /var/www/seusite
        SSLEngine on
        SSLCertificateFile /caminho/para/certificates/cert.pem
        SSLCertificateKeyFile /caminho/para/certificates/key.pem

        <Directory /var/www/seusite>
            AllowOverride All
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
    </VirtualHost>
    ```
- **Habilitar o Site SSL e Reiniciar o Apache**
  - Habilite o site e reinicie o Apache:
    ```bash
    sudo a2ensite seusite-ssl.conf
    sudo systemctl restart apache2
    ```

## 7. Iniciar o Servidor Node.js
- **Iniciar o Servidor Node.js**
  - No diretório do seu projeto, inicie o servidor:
    ```bash
    npm start
    ```

## 8. Verificação
- **Verificar o Funcionamento**
  - Abra um navegador e vá para `https://IP-VPS.com` para verificar se o servidor está funcionando corretamente com HTTPS.

## 9. Configuração do MariaDB/MySQL
- **Instalação do MariaDB**
  - Instale o MariaDB:
    ```bash
    sudo apt install mariadb-server -y
    ```
- **Configuração do MariaDB**
  - Inicie o MariaDB:
    ```bash
    sudo systemctl start mariadb
    ```
  - Acesse o console do MariaDB:
    ```bash
    sudo mysql
    ```
- **Configuração de Segurança**
  - Execute o script de segurança para definir uma senha para o usuário root:
    ```bash
    sudo mysql_secure_installation
    ```
  - Defina uma senha para o usuário root (por exemplo, `12345678`).

- **Criação da Base de Dados e Usuário**
  - No console do MariaDB:
    ```sql
      CREATE DATABASE baseCliente;
      GRANT ALL PRIVILEGES ON baseCliente.* TO 'root'@'localhost' IDENTIFIED BY '12345678';
      FLUSH PRIVILEGES;
      EXIT;
    ```

## 10. Configuração do Projeto para o MariaDB
- **Instalação do MySQL2 e Knex**
  - No diretório do seu projeto, instale as dependências:
    ```bash
    npm install mysql2 knex
    ```
- **Configuração do Knex**
  - Crie um arquivo `knexfile.js`:
    ```javascript
    module.exports = {
      client: 'mysql2',
      connection: {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'baseCliente'
      }
    };
    ```
- **Exemplo de Uso do Knex no Projeto**
  - No seu arquivo de configuração, importe e configure o Knex:
    ```javascript
    import knex from 'knex';
    import knexConfig from './knexfile.js';

    const db = knex(knexConfig);

    db.select('*').from('tabela_exemplo').then(data => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    });
    ```

## 11. Arquivo `package.json`
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "Missão Prática nível 5 mundo 5",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "nodemon src/index.js",
    "client": "node client.js",
    "build": "webpack --mode production"
  },
  "babel": {
    "presets": [
      "@babel/preset-env"
    ]
  },
  "keywords": [],
  "author": "João Tavares",
  "license": "ISC",
  "dependencies": {
    "@graphql-tools/schema": "^10.0.6",
    "apollo-server": "^3.13.0",
    "apollo-server-express": "^3.13.0",
    "axios": "^1.7.7",
    "bcrypt": "^5.1.1",
    "cross-fetch": "^4.0.0",
    "date-fns": "^3.6.0",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "graphql": "^16.9.0",
    "graphql-import": "^1.0.2",
    "graphql-tag": "^2.12.6",
    "mysql2": "^3.2.0",
    "knex": "^2.4.2"
  }
}
```

---

