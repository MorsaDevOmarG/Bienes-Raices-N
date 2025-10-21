import bcrypt from "bcrypt"

const usuarios = [
//   {
//     nombre: "admin",
//     email: "admin@gmail.com",
//     confirmado: 1,
//     password: bcrypt.hashSync("admin1234", 10)
//   }
  {
    nombre: "omar",
    email: "omar@gmail.com",
    confirmado: 1,
    password: bcrypt.hashSync("omar1234", 10)
  }
];

export default usuarios;