const verifyRole = (roles) => {
    return (req, res, next) => {
        console.log(roles)
        console.log(req.user.currentCompany)
        console.log(req.user.companies)
        const currentCompany = req.user.companies.find(({ id }) => id.equals(req.user.currentCompany))
        console.log(currentCompany)
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