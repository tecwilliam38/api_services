import repoAppointment from "../repositories/agendamentos.repositories.js"

async function Listar(id_user, dt_start, dt_end, id_barber) {

    const appointments = await repoAppointment.Listar(id_user, dt_start, dt_end, id_barber);

    return appointments;
}

async function ListarAgenda(id_appointment) {

    const appointments = await repoAppointment.ListarAgendaId(id_appointment);

    return appointments;
}

async function ListarAll() {
    const appointments = await repoAppointment.ListarAll();
    return appointments;
}

async function Inserir(id_user, id_barber, id_service,
    booking_date, booking_hour) {
    const appointment = await repoAppointment.Inserir(id_user,
        id_barber, id_service, booking_date, booking_hour);
    return appointment;
}

async function Excluir(id_appointment) {

    const barber = await repoAppointment.Excluir(id_appointment);

    return barber;
}


async function Editar(id_appointment, id_user,
    id_barber, id_service, booking_date, booking_hour) {

    const appointment = await repoAppointment.Editar(id_appointment, id_user,
        id_barber, id_service, booking_date, booking_hour);

    return appointment;
}

async function InserirAdminAgenda(id_appointment, id_user,
    id_barber, id_service, booking_date, booking_hour) {

    const appointment = await repoAppointment.InserirAgenda(id_appointment, id_user,
        id_barber, id_service, booking_date, booking_hour);

    return appointment;
}

async function EditarAdminAgenda(id_appointment, id_user,
    id_barber, id_service, booking_date, booking_hour) {

    const appointment = await repoAppointment.EditarAgenda(id_appointment, id_user,
        id_barber, id_service, booking_date, booking_hour);

    return appointment;
}



export default { Listar, Inserir, Excluir, ListarAll, Editar, ListarAgenda, InserirAdminAgenda, EditarAdminAgenda }