import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: '127.0.0.1', // ou 'localhost'
  user: 'root',
  password: '123',
  database: 'baseCliente',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão:', err);
    return;
  }
  console.log('Conectado com sucesso!');
});
