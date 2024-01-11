const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  dob: Date,
  gender: String,
});


exports.checkFieldAvailability = async (req, res) => {
  try {
    const { fieldName, value } = req.body;

    // Define os campos que requerem verificação de disponibilidade
    const fieldsToCheck = ['username', 'email', 'phone'];

    // Verifica se o campo fornecido requer verificação
    if (!fieldsToCheck.includes(fieldName)) {
      return res.status(400).json({ error: 'Campo não suportado para verificação de disponibilidade.' });
    }

    // Verifica se já existe um usuário com o valor fornecido no campo específico
    const existingUser = await User.findOne({ [fieldName]: value });

    // Retorna se o campo está disponível ou não
    res.json({ available: !existingUser });
  } catch (error) {
    console.error(`Erro ao verificar a disponibilidade de ${fieldName}:`, error);
    res.status(500).json({ available: false }); // Em caso de erro, considerar como não disponível
  }
}; 