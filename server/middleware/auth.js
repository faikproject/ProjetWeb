const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        //UN TOKEN DEVRA ETRE GENERE ET ENREGISTRER DANS UN VARIABLE D ENVIRONNEMENT
        const decoded = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decoded.userId;
        req.auth = { userId };

        if (req.body.userId && req.body.userId !== userId) {
            throw String('Utilisateur invalidé');
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            message: 'Accès non autorisé',
        });
    }
};
