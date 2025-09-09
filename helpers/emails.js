import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // console.log(datos);

  const { nombre, email, token } = datos;

  // Enviar el email
  await transport.sendMail({
    from: "Bienes Raices",
    to: email,
    subject: "Confirma tu cuenta en Bienes Raices",
    text: "Confirma tu cuenta en Bienes Raices",
    html: `<p>Hola: ${nombre}, comprueba tu cuenta en Bienes Raices</p>
      <p>Tu cuenta ya está casi lista, solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}/auth/confirmar/${token}">Confirmar Cuenta</a> 
      </p>
      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      `,
  });
};

export { emailRegistro };
