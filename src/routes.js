import { Router } from "express";
import jwt from "../token.js"

import controllerBarber from "./controller/barber.controller.js";
import controllerUser from "./controller/user.controller.js"
import controllerAppointment from "./controller/agendamentos.controller.js"


const router = Router();

// Barbeiros

router.get("/barbers", jwt.ValidateToken, controllerBarber.Listar)
router.get("/barbers/:id_barber/services", jwt.ValidateToken, controllerBarber.ListarServicos)
router.post("/barbers", jwt.ValidateToken, controllerBarber.Inserir)
router.delete("/barbers/:id_barber", jwt.ValidateToken, controllerBarber.Excluir)
router.put("/barbers/:id_barber", jwt.ValidateToken, controllerBarber.Editar)

// Users...
router.post("/users/register", controllerUser.Inserir);
router.post("/users/login", controllerUser.Login);
router.get("/users/profile", jwt.ValidateToken, controllerUser.Profile);

// Reservas (appointments)...
router.get("/agenda/all", controllerAppointment.ListarAll);
router.get("/agenda", jwt.ValidateToken, controllerAppointment.ListarByUser);
router.post("/agenda", jwt.ValidateToken, controllerAppointment.Inserir);
router.delete("/agenda/:id_appointment", jwt.ValidateToken, controllerAppointment.Excluir);

// Admins
router.post("/users/register", controllerUser.InserirAdmin);

export default router;