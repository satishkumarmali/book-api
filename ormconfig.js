require('dotenv').config();
const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
console.log('SOURCE_PATH >> ', SOURCE_PATH);
module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${SOURCE_PATH}/**/*.entity.{ts,js}`],
  synchronize: false,
};