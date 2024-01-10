import express from "express";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import db from "./src/config/mongoConection.js";
import registroController from "./controllers/UserControllers";

const PORT = 3000;

db.on("error", console.log.bind(console, "Erro de conexão...")); 
db.once("open", () => console.log("Conexão com o banco de dados estabelecida."));

const app = express();

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const validacao = await registroController.verificaUsuario(email, password);

    if (validacao.bool) {
        res.send('Login efetuado com sucesso!');
    } else {
        res.status(401).send(validacao.message);
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password, "confirm-password": confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send({ error: 'As senhas não conferem!' });
        }
        const hashedPassword = await  bcrypt.hash(password,10);
        registroController.cadastrarUser({ username, email, hashedPassword });
        res.send({ message: 'Usuário registrado com sucesso!' });
    } catch {
        res.status(500).send({ error: 'Algo errado não esta certo' });
    }   

});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}/`);
});
