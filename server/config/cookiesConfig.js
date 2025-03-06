const refreshOptions = {
    httpOnly: true,
    maxAge: 60000 * parseInt(process.env.JWT_REFRESH_TIME),
    sameSite: "strict",
    secure: process.env.NODE_ENV === 'production'
};
const accessOptions = {
    httpOnly: true,
    maxAge: 60000 * parseInt(process.env.JWT_ACCESS_TIME),
    sameSite: "strict",
    secure: process.env.NODE_ENV === 'production'
};

module.exports = { refreshOptions, accessOptions }