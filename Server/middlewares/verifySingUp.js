const db= require("../models")
const Roles= db.ROLES
const User= db.user
console.log(Roles)



const checkDuplicatedUsernameOrEmail=(req,res,next)=>{

    //username
    
    //Email

}


const verifySignUp={
    checkDuplicatedUsernameOrEmail,
}

module.exports= verifySignUp