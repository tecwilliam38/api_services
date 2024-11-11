import pool from "../database/pg.pool.js";

async function Listar(id_user) {

     let filtro = [];

     let sql = `select a.id_appointment, s.description as service, 
     b.name as barber, b.specialty,
     a.booking_date, a.booking_hour, u.name as user, bs.price, a.id_barber,
     a.id_service, a.id_user
     from appointments a
     join services s on (s.id_service = a.id_service)
     join barbers b on (b.id_barber = a.id_barber)
     join users u on (u.id_user = a.id_user)
     join barbers_services bs on (bs.id_barber = a.id_barber and 
     bs.id_service = a.id_service)
     where a.id_appointment > 0`;
     // where a.id_user = $1
     // order by a.booking_date, a.booking_hour 
     
     if (id_user) {
          filtro.push(id_user);
          sql = sql + "and a.id_user = ? "
     }

     try {
          const appointments = await query(sql, filtro);
          return appointments.rows;
     } catch (err) {
          console.log(err);
     }
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

export default { Listar, Inserir, Excluir }

