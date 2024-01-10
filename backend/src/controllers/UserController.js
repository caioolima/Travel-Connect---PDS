import User from "../models/Users.js";
import bcrypt from "bcrypt";

class registroController {

    static verificaUsuario = async function (email, password) {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return { bool: false, message: "E-mail inválido!" }
          }
          const match = await bcrypt.compare(password, user.hashedPassword);
          if (!match) {
            return { bool: false, message: 'Senha incorreta!' };
          }
      
          return { bool: true, message: 'Login bem sucedido!' };
        } catch (err) {
          console.error(err);
          return { bool: false, message: 'Ocorreu um erro ao verificar o usuário.' };
        }
      }

    static cadastrarUser = function (registroObj) {
        let newUser = new User(registroObj);
        newUser.save((err) => {
            if (err) {
                return err.message;
            } else {
                return "Registro Salvo";
            }
        })
    }
}

export default registroController;
