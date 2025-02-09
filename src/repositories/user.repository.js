
import pool from "../database/pg.pool.js";


async function Inserir(name, email, password) {
    async function verificaEmailExistente(email) {
        try {
            const query = 'SELECT count(*) FROM users WHERE email = $1';
            const result = await pool.query(query, [email]);

            return result.rows[0].count > 0; // Retorna true se o email já existe
        } catch (error) {
            console.error('Erro ao verificar email:', error);
            return false;
        }
    }
    const emailJaExiste = await verificaEmailExistente(email);
    if (emailJaExiste) {
        console.log('Email já cadastrado.');
        return [];
    } else {
        // console.log('Email disponível para cadastro.');
        let sql = `insert into users(name, email, password) values($1, $2, $3)
      returning id_user`;

        const user = await pool.query(sql, [name, email, password]);
        return user.rows[0];

    }
}

// Administrador
async function InserirAdmin(name, email, password) {
    let sql = `insert into admins(name, email, password) values($1, $2, $3)
     returning id_admin`;

    const user = await pool.query(sql, [name, email, password]);

    return user.rows[0];
}

async function ListarByEmailAdmin(email) {
    let sql = `select * from admins where email = $1`;
    try {
        const user = await pool.query(sql, [email]);

        if (user.length == 0)
            return [];
        else
            return user.rows[0];
    } catch (err) {
        console.log(err);
    }
}
// Listar usuário
async function ListarByEmail(email) {
    let sql = `select * from users where email = $1`;
    try {
        const user = await pool.query(sql, [email]);

        if (user.length == 0)
            return [];
        else
            return user.rows[0];
    } catch (err) {
        console.log(err);
    }
}

async function Profile(id_user) {

    let sql = `select id_user, name, email from users where id_user = $1`;

    const user = await pool.query(sql, [id_user]);

    return user.rows[0];
}

async function ProfileAdmin(id_admin) {

    let sql = `select id_admin, name, email from admins where id_admin = $1`;

    const admin = await pool.query(sql, [id_admin]);

    return admin.rows[0];
}

async function Listar() {
    let sql = `select id_user, name, email from users order by name`;
    const users = await pool.query(sql, []);
    return users;
}
export default { Inserir, ListarByEmail, Profile, InserirAdmin, ListarByEmailAdmin, Listar, ProfileAdmin }

