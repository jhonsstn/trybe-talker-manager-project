function authorizationVerification(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Token não encontrado');
    if (authorization.length !== 16) throw new Error('Token inválido');
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = authorizationVerification;
