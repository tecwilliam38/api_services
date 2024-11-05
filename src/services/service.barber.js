import repoBarber from "../repositories/barber.repositoory.js"

async function Inserir(name, specialty, icon) {
     const barber = await repoBarber.Inserir(name, specialty, icon);
     return barber;
}

async function Listar(name) {
     const barber = await repoBarber.Listar(name); 
     return barber;
 }
 
 async function Editar(id_barber, name, specialty, icon) {

     const barber = await repoBarber.Editar(id_barber, name, specialty, icon);
 
     return barber;
 }

 
async function Excluir(id_barber) {

     const barber = await repoBarber.Excluir(id_barber);
 
     return barber;
 }
 
 async function ListarServicos(id_barber) {
 
     const serv = await repoBarber.ListarServicos(id_barber);
 
     return serv;
 }

export default { Inserir, Listar, Editar, Excluir, ListarServicos }