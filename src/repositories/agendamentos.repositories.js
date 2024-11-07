import pool from "../database/pg.pool.js";

async function Listar(id_user) {

     let sql = `select a.id_appointment, s.description as service, 
     b.name as barber, b.specialty,
    a.booking_date, a.booking_hour, u.name as user, bs.price
 from appointments a
 join services s on (s.id_service = a.id_service)
 join barbers b on (b.id_barber = a.id_barber)
 join users u on (u.id_user = a.id_user)
 join barbers_services bs on (bs.id_barber = a.id_barber and 
                         bs.id_service = a.id_service)
 where a.id_user = $1
 order by a.booking_date, a.booking_hour `;

     try {
          const appointments = await pool.query(sql, [id_user]);
          return appointments.rows;
     } catch (err) {
          console.log(err);
     }
}


//   let sql = `select * from appointments
//   order by booking_date, booking_hour `;


async function ListarAll() {
     let sql = `select booking_date, booking_hour from appointments
  order by booking_date, booking_hour `;

     try {
          const appointments = await pool.query(sql);
          return appointments.rows;
     } catch (err) {
          console.log(err);
     }
}

async function Inserir(id_user,
     id_barber, id_service, booking_date, booking_hour) {

     let sql = `insert into appointments(id_user,
         id_barber, id_service, booking_date, booking_hour) 
         values($1, $2, $3, $4, $5) returning id_appointment`;
     try {
          const appointment = await pool.query(sql, [id_user,
               id_barber, id_service, booking_date, booking_hour]);

          return appointment.rows[0];
     } catch (err) {
          console.log(err);

     }
}
async function Excluir(id_appointment) {

     let sql = `delete from appointments where id_appointment = $1`;

     try {
          const appointment = await pool.query(sql, [id_appointment]);

          return { id_appointment };
     } catch (err) {
          console.log(err);

     }
}

export default { Listar, ListarAll, Inserir, Excluir }

