const verifyRole = (roles) => {
    return (req, res, next) => {
        const currentCompany = req.user.companies.find(({ id }) => id.equals(req.user.currentCompany))
        if (!req.user.currentCompany) {
            return res.status(400).json('No company selected')
        }
        if (!currentCompany || !roles.includes(currentCompany.role)) {
            return res.status(403).json('Unauthorized')
        }
        next()
    }
}

module.exports = verifyRole