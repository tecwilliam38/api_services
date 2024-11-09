import repoAppointment from "../repositories/agendamentos.repositories.js"

async function Listar(id_user) {
    const appointments = await repoAppointment.Listar(id_user);
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


export default { Listar, ListarAll, Inserir, Excluir,  }