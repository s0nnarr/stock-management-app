const verifyRole = (roles) => {
    return (req, res, next) => {

        if (!req.user.currentCompany) {
            return res.status(400).json({ error: 'No company selected' })
        }

        const currentCompany = req.user.companies.find(({ id }) => id.equals(req.user.currentCompany))
        if (!currentCompany || !roles.includes(currentCompany.role)) {
            return res.status(403).json({ error: 'Unauthorized' })
        }
        next()
    }
}

module.exports = verifyRole