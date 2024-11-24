import pool from "../database/pg.pool.js";

//  where a.id_appointment > 0
// where a.id_user = $1
// order by a.booking_date, a.booking_hour 
//      let sql1 = `select a.id_appointment, s.description as service, 
//      d.name as doctor, d.specialty,
//     a.booking_date, a.booking_hour, u.name as user, ds.price, a.id_doctor, 
//     a.id_service, a.id_user
//  from appointments a
//  join services s on (s.id_service = a.id_service)
//  join doctors d on (d.id_doctor = a.id_doctor)
//  join users u on (u.id_user = a.id_user)
//  join doctors_services ds on (ds.id_doctor = a.id_doctor and 
//                          ds.id_service = a.id_service)
//  where a.id_appointment > 0 `;

async function ListarAll() {
     let sql = `select * from appointments
  order by booking_date, booking_hour `; 
try {
     const appointments = await pool.query(sql);
     return appointments.rows; 
     
} catch (error) {
     console.log(err);          
}
}

async function Listar(id_user, dt_start, dt_end, id_barber) {
     let filtro = [];
     let sql = `
         SELECT a.id_appointment, s.description AS service,
                b.name AS barber, b.specialty,
                a.booking_date, a.booking_hour, u.name AS user, bs.price, a.id_barber,
                a.id_service, a.id_user
         FROM appointments a
         JOIN services s ON (s.id_service = a.id_service)
         JOIN barbers b ON (b.id_barber = a.id_barber)
         JOIN users u ON (u.id_user = a.id_user)
         JOIN barbers_services bs ON (bs.id_barber = a.id_barber AND bs.id_service = a.id_service)
         WHERE a.id_appointment > 0`;
 
     if (id_user) {
         filtro.push(id_user);
         sql += " AND a.id_user = $" + filtro.length;
     }
 
     if (dt_start) {
         filtro.push(dt_start);
         sql += " AND a.booking_date >= $" + filtro.length;
     }
 
     if (dt_end) {
         filtro.push(dt_end);
         sql += " AND a.booking_date <= $" + filtro.length;
     }
 
     if (id_barber) {
         filtro.push(id_barber);
         sql += " AND a.id_barber = $" + filtro.length;
     }
 
     sql += " ORDER BY a.booking_date, a.booking_hour";
 
     const appointments = await pool.query(sql, filtro);
     return appointments.rows;
 }
 


async function Inserir(id_user, id_barber, id_service, booking_date, booking_hour) {
     async function verificaBooking_date(booking_date) {
          try {
               const query = 'SELECT count(*) FROM appointments WHERE booking_date = $1';
               const result = await pool.query(query, [booking_date]);
               return result.rows[0].count > 0; // Retorna true se o booking_date já existe
          } catch (error) {
               // console.error('Erro ao verificar booking:', error);
               return false;
          }
     }
     async function verificaBooking_hour(booking_hour) {
          try {
               const query = 'SELECT count(*) FROM appointments WHERE booking_hour = $1';
               const result = await pool.query(query, [booking_hour]);

               return result.rows[0].count > 0; // Retorna true se o booking_hour já existe
          } catch (error) {
               // console.error('Erro ao verificar booking:', error);
               return false;
          }
     }
     const booking_dateExiste = await verificaBooking_date(booking_date);
     const booking_hourExiste = await verificaBooking_hour(booking_hour);

     if (booking_dateExiste && booking_hourExiste) {
          // console.log('Booking já cadastrado.');
          return [];
     } else {
          // console.log('booking disponível para cadastro.');

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

export default { Listar, Inserir, Excluir , ListarAll}

