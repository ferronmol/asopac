// Generar token
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      reject("La clave secreta no existe o no es válida");
      return;
    }
    jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(token);
      }
    );
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      reject("La clave secreta no existe o no es válida");
      return;
    }
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(user);
    });
  });
}

export { createAccessToken, verifyToken };
