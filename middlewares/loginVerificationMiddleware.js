function verifyEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) throw new Error('O campo "email" é obrigatório');
  if (!emailRegex.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
}

function verifyPassword(password) {
  if (!password) throw new Error('O campo "password" é obrigatório');
  if (password.length < 6) {
    throw new Error('O "password" deve ter pelo menos 6 caracteres');
  }
}

function loginVerify(req, res, next) {
  const { email, password } = req.body;
  try {
    verifyEmail(email);
    verifyPassword(password);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = loginVerify;
