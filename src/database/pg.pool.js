import pg from 'pg'
const { Pool } = pg
// import "dotenv/config.js"

// import 'dotenv/config'
// console.log(process.env) // remova após confirmar que está funcionando

// const PGUSER = process.env.PGUSER;
// const PGHOST = process.env.PGHOST;
// const PGDATABASE = process.env.PGDATABASE;
// const PGPASSWORD = process.env.PGPASSWORD;

const pool = new Pool({
     user: 'postgres.ffmdyodydnwimwrrjobg',
     host: 'aws-0-sa-east-1.pooler.supabase.com',
     database: 'postgres',
     password: 'XQIv1RBbzXV2QIbq',
     port: 6543,
});


export default pool;


// user: process.env.PGUSER,
// host: process.env.PGHOST,
// database: process.env.PGDATABASE,
// password: process.env.PGPASSWORD,

// user: 'postgres.ffmdyodydnwimwrrjobg',
//      host: 'aws-0-sa-east-1.pooler.supabase.com',
//      database: 'postgres',
//      password: 'XQIv1RBbzXV2QIbq',
//      port: 6543,