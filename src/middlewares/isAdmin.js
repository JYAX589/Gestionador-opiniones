export const isAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
};