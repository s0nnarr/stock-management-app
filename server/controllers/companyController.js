const companyModel = require('../models/companyModel.js')
const userModel = require('../models/userModel.js')

const postCompany = async (req, res) => {


    try {
        const { id, name, address, phone, currency } = req.body;

        const company = await companyModel.create({
            id,
            name,
            address,
            phone,
            currency
        });

        res.status(200).json({ message: 'Company created successfully' });

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }


}


const getCompanyAbout = async (req, res) => {
    try {

        const { id } = req.params;

        const company = await companyModel.findOne({ id: id }, { _id: 0, name: 1, address: 1, phone: 1, currency: 1 });

        if (!company) {
            throw new Error('Company not found!');
        }
        res.status(200).json({ company: company });

    }


    catch (error) {
        res.status(400).json({ message: error.message });
    }


}



const getCompanyUsers = async (req, res) => {

    try {
        const companyID = req.query.companyID;
        const page = req.query.page || 0;
        const size = req.query.size || 5;
        const company = await companyModel.findOne({ id: companyID }, { _id: 0, users: 1 }).skip(page * size).limit(size);

        if (!company) {
            throw new Error('No users found!');
        }

        res.status(200).json({ users: company.users });

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

}






const getAuditLog = async (req, res) => {

    try {

        const companyID = req.query.companyID;

        const page = req.query.page || 0;
        const size = req.query.size || 5;


        const company = await companyModel.findOne({ id: companyID }, { _id: 0, auditLog: 1 }).skip(page * size).limit(size);

        if (!company) {
            throw new Error('No audit log found!');
        }

        res.status(200).json({ auditLog: company.auditLog });



    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const addUser = async (req, res) => {
    try {
       
        const { companyID, userID, role } = req.body;
        const company = await companyModel.findOne({ id: companyID });
        if (!company) {
            throw new Error('Company not found!');
        }
        const user = await userModel.findOne({ id: userID });
        if (!user) {
            throw new Error('User not found!');
        }

        const existingUser = company.users.find(u => u.user.toString() === user._id.toString() && u.role === role);
        if (existingUser) {
            throw new Error('User with the same role already exists!');
        }

        company.users.push({ user: user._id, role: role });
        user.companies.push({ id: company._id, role: role });
        await user.save();
        await company.save();
        res.status(200).json({ message: 'User added successfully!' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



module.exports = { getAuditLog, postCompany, getCompanyAbout, getCompanyUsers, addUser };
