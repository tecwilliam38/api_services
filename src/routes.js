import { Router } from "express";
import jwt from "../token.js"

import controllerBarber from "./controller/barber.controller.js";
import controllerUser from "./controller/user.controller.js"
import controllerAppointment from "./controller/agendamentos.controller.js"


const router = Router();

// Barbeiros

router.get("/barbers", jwt.ValidateToken, controllerBarber.Listar)
router.get("/barbers/:id_barber/services", jwt.ValidateToken, controllerBarber.ListarServicos)
router.post("/barbers",  controllerBarber.Inserir)
router.delete("/barbers/:id_barber", jwt.ValidateToken, controllerBarber.Excluir)
router.put("/barbers/:id_barber", jwt.ValidateToken, controllerBarber.Editar)

// Users...
router.post("/users/register", controllerUser.Inserir);
router.post("/users/login", controllerUser.Login);
router.get("/users/profile", jwt.ValidateToken, controllerUser.Profile);

// Reservas (appointments)...
router.get("/agenda", jwt.ValidateToken, controllerAppointment.ListarByUser);
router.post("/agenda", jwt.ValidateToken, controllerAppointment.Inserir);
router.delete("/agenda/:id_appointment", jwt.ValidateToken, controllerAppointment.Excluir);

// Admins
router.post("/admin/register", controllerUser.InserirAdmin);
router.post("/admin/login", controllerUser.LoginAdmin);
router.get("/admin/agenda",jwt.ValidateToken, controllerAppointment.Listar);
router.put("/admin/agenta/:id_appointment", jwt.ValidateToken, controllerAppointment.EditarAdmin);
router.get("/admin/users", jwt.ValidateToken, controllerUser.Listar);
router.get("/admin/agenda/:id_appointment", jwt.ValidateToken, controllerAppointment.ListarId);
router.post("/admin/agenda", jwt.ValidateToken, controllerAppointment.InserirAgendaAdmin);
router.put("/admin/agenda/:id_appointment", jwt.ValidateToken, controllerAppointment.EditarAgenda);


// router.get("/admin/users", jwt.ValidateToken, controllerUser.Listar);
// router.post("/admin/appointments", jwt.ValidateToken, controllerAppointment.InserirAdmin);
// router.post("/admin/appointments", jwt.ValidateToken, controllerAppointment.InserirAdmin);



// router.get("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.ListarId);
// router.put("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.EditarAdmin);



export default router;