const models = require("../../models")
const process = require("../nodemon.json")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


function userSignUp(req, res) {

    bcryptjs.genSalt(10, function(err, salt) {

        models.User.findOne({where:{email:req.body.email}}).then(result=>{

            if(result){
                res.status(409).json({

                    message: "This email already exist, enter another email, Please!"
                })
            }
            else{
                bcryptjs.hash(req.body.password, salt, function(err, hash) {
                    const user = {

                        name: req.body.name,

                        email: req.body.email,

                        password : hash
                    }
                    models.User.create(user).then(result => {
                        res.status(200).json({
                            message:"User created Successfully",
                            result: result
                        })
                    }).catch(erro =>{
                        res.status(500).json({
                            message:"Something went wrong",
                            erro: erro
                        })
                    })
                })
            }
        }).catch(erro => {
            res.status(500).json({
                message: "Something went wrong",
                erro: erro
            })
        })
    })
}

function login(req, res) {
    models.User.findOne({where:{email: req.body.email}}).then(user =>{
        if(user === null){
            res.status(200).json({
                message: "Invalid Credentials"
            })
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result) {
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        user_id: user.id
                    }, process.env.JWT_KEY, function(err, token) {
                        res.status(200).json({
                            message: "Athentication Success",
                            token: token,
                            err: err
                        })
                    })

                }
                else{
                    res.status(401).json({
                        message: "Invalid Credentials",
                        error: err
                    })
                }
            })
        }
    }).catch(erro =>{
        res.status(500).json({
            message: "Authentication error",
            erro: erro

        })
    })
}

module.exports={
    userSignUp: userSignUp,
    login: login
}