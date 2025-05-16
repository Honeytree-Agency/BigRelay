const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
};

const forwardAuthentication = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect('/dash');
};

module.exports = {
    ensureAuthenticated,
    forwardAuthentication,
};
