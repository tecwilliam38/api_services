// import { neon, Pool } from '@neondatabase/serverless';
// import { Pool } from 'pg';
// import pg from 'pg'
// const { Pool } = pg;

import { neon } from "@neondatabase/serverless";



// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const sqlNeon = neon(process.env.DATABASE_URL)


// const poolNeon = new Pool({
//      host: PGHOST,
//      database: PGDATABASE,
//      username: PGUSER,
//      password: PGPASSWORD,
//      port: 5432 ,
//      ssl: 'require',   
// });

// export default sqlNeon;