const bcrypt = require("bcrypt");
const saltRaunds = 10;

export async function hashPassword(plainPassword) {
  bcrypt.hash(plainPassword, saltRaunds, (err, hash) => {
    if (err) {
      console.log("error hashing password:", err);
    } else {
      return hash;
    }
  });
}
