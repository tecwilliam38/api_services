import bcrypt from "bcrypt";
import jwt from "../../token.js"

import repoUser from "../repositories/user.repository.js"

async function Inserir(name, email, password) {
     const hashPassword = await bcrypt.hash(password, 10);
     const user = await repoUser.Inserir(name, email, hashPassword);
 
     user.token = jwt.CreateToken(user.id_user);
 
     return user;
 }
 
 async function Login(email, password) {
 
     const user = await repoUser.ListarByEmail(email);
 
     if (user.length == 0)
         return [];
     else {
         if (await bcrypt.compare(password, user.password)) {
             delete user.password;
 
             user.token = jwt.CreateToken(user.id_user);
 
             return user;
         } else
             return [];
     }
 
     return user;
 }
async function InserirAdmin(name, email, password) {
     const hashPassword = await bcrypt.hash(password, 10);
     const user = await repoUser.InserirAdmin(name, email, hashPassword);
 
     user.token = jwt.CreateToken(user.id_user);
 
     return user;
 }
 
 async function LoginAdmin(email, password) {
 
     const user = await repoUser.ListarByEmailAdmin(email);
 
     if (user.length == 0)
         return [];
     else {
         if (await bcrypt.compare(password, user.password)) {
             delete user.password;
 
             user.token = jwt.CreateToken(user.id_user);
 
             return user;
         } else
             return [];
     }
 
     return user;
 }
 
 async function Profile(id_user) {
 
     const user = await repoUser.Profile(id_user);
 
     return user;
 }
 
 async function ProfileAdmin(id_admin) {
 
     const admin = await repoUser.ProfileAdmin(id_admin);
 
     return admin;
 }
 
 async function ListarUser() {
 
     const user = await repoUser.Listar();
 
     return user;
 }
 
 export default { Inserir, Login, Profile, InserirAdmin, LoginAdmin, ListarUser, ProfileAdmin }

