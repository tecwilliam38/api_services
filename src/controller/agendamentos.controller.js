import serviceAppointment from "../services/agendamentos.services.js"

async function ListarByUser(req, res) {

    const id_user = req.id_user;
    const appointments = await serviceAppointment.Listar(id_user, 0, 0, 0);
    res.status(200).json(appointments);
}

// const appointments = await serviceAppointment.ListarAgenda(id_appointment, 0, 0, 0);
async function ListarId(req, res) {

    const id_appointment = req.params.id_appointment;
    const appointments = await serviceAppointment.ListarAgenda(id_appointment);

    res.status(200).json(appointments);
}

async function Listar(req, res) {
    const dt_start = req.query.dt_start;
    const dt_end = req.query.dt_end;
    const id_barber = req.query.id_barber;

    const appointments = await serviceAppointment.Listar(0, dt_start, dt_end, id_barber);
    res.status(200).json(appointments);
    //   const appointments = await serviceAppointment.ListarAll(); 
    //  res.status(200).json(appointments);
}

async function Inserir(req, res) {

    const id_user = req.id_user;
    const { id_barber, id_service,
        booking_date, booking_hour } = req.body;

    const appointment = await serviceAppointment.Inserir(id_user,
        id_barber, id_service, booking_date, booking_hour);

    res.status(201).json(appointment);
}

async function Excluir(req, res) {

    const id_appointment = req.params.id_appointment;

    const appointment = await serviceAppointment.Excluir(id_appointment);

    res.status(201).json(appointment);
}
async function EditarAdmin(req, res) {

    const id_appointment = req.params.id_appointment;
    const { id_user, id_barber, id_service,
        booking_date, booking_hour } = req.body;

    const appointment = await serviceAppointment.Editar(id_appointment, id_user,
        id_barber, id_service, booking_date, booking_hour);

    res.status(200).json(appointment);
}

async function InserirAgendaAdmin(req, res) {
    const { id_user, id_barber, id_service, booking_date, booking_hour } = req.body;
    const appointment = await serviceAppointment.InserirAdminAgenda(id_user,
        id_barber, id_service, booking_date, booking_hour);

    res.status(200).json(appointment);
}

async function EditarAgenda(req, res) {

    const id_appointment = req.params.id_appointment;
    const { id_user, id_barber, id_service, booking_date, booking_hour } = req.body;
    const appointment = await serviceAppointment.EditarAdminAgenda(id_appointment, id_user,
        id_barber, id_service, booking_date, booking_hour);

    res.status(200).json(appointment);
}

export default { ListarByUser, Inserir, Excluir, Listar, EditarAdmin, ListarId, InserirAgendaAdmin, EditarAgenda };