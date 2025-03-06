const alertModel = require('../models/alertModel')

const getAllAlerts = async (req, res) => {

    const page = req.query.page || 0
    const size = req.query.size || 2

    try {
        const Alerts = await alertModel.find({ company: req.user.currentCompany }).skip(page * size).limit(size)
        res.status(200).json(Alerts)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { getAllAlerts }