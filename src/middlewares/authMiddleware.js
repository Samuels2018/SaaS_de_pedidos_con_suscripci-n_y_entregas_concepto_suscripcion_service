'use strict'

const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' })
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Añadir el usuario al request
    req.user = {
      id: decoded.userId,
      email: decoded.email
      // ...otros datos que necesites
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
}

module.exports = {
  authMiddleware
}