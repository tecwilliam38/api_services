import pool from "../database/pg.pool.js";

async function Inserir(name, specialty, icon) {

    let sql = 'INSERT INTO barbers (name, specialty, icon) VALUES ($1, $2, $3) RETURNING *'
    try {
        const barber = await pool.query(sql, [name, specialty, icon]);
        return barber.rows[0];
    } catch (err) {
        console.log(err);
    }
}

async function ListarServicos(id_barber) {
    let sql = `select b.id_service, s.description, b.price
    from barbers_services b
    join services s on (s.id_service = b.id_service)
    where b.id_barber = $1
    order by s.description`;
    try {
        const serv = await pool.query(sql, [id_barber]);
        return serv.rows;
    } catch (err) {
        console.log(err);
    }
}
async function Listar(name) {
    let filtro = [];
    let sql = "select * from barbers ";
    if (name) {
        sql = sql + "where name like $1 ";
        filtro.push('%' + name + '%');
    }
    sql = sql + "order by name"
    try {
        const barbers = await pool.query(sql, filtro);

        return barbers.rows;
    } catch (err) {
        console.log(err);
    }
}

async function Editar(id_barber, name, specialty, icon) {

    let sql = `UPDATE barbers SET name = $1, specialty = $2, icon = $3
where id_barber = $4 `;
    // try {
    await pool.query(sql, [name, specialty, icon, id_barber]);
    return { id_barber };
    // } catch (err) {
    //     console.log(err);

    // }
}


async function Excluir(id_barber) {

    let sql = `delete from barbers where id_barber = $1`;

    await pool.query(sql, [id_barber]);

    return { id_barber };
}



export default { Inserir, Listar, Editar, Excluir, ListarServicos }