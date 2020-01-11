const user = require('./../Schema/indexSchema')


function findUserByEmail(argu) {
    var query = { email: argu.email } || { phone: argu.phone }
    query.role = argu.role
    return user.memberModel.findOne(query)
}

function UserRegister(data) {
    let member = new user.memberModel(data);
    return member.save();
}

function updateuserDetails(_id, data) {
    return user.memberModel.findByIdAndUpdate(_id, data, { new: true })
}

function LoginLogSave(data) {
    let log = new user.LoginLogModel(data);
    return log.save();
}

function findVerificationCode(argu) {
    var query = { email: argu.email } || { phone: argu.phone }
    query.role = argu.role
    return user.memberModel.findOne(query).select({ verification_code: 1, _id: 1, username: 1, email: 1, type: 1 })
}

function findUserWithArgu(argu) {
    var query = { email: argu.email } || { phone: argu.phone }

    return user.memberModel.findOne(query)
}
function findUserDetails(id) {
    return user.memberModel.findById(id)
}


module.exports = {
    findUserByEmail, UserRegister, updateuserDetails, LoginLogSave, findVerificationCode, findUserWithArgu, findUserDetails
}

// export {
//     findUserByUsername,
    // findUserById,
    // getUserTasks,
    // getUserProjects,
    // isUserProjectAdmin,
    // changePassword
// };
