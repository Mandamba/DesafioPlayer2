const models = require('../../models')
 let location= models.location
function  CreateCompany(req, res) {

    if (req.body.cep === ""){
        res.status(404).json({
            message: "Cep is required to store a company, please send this data"
        })
    }
    else{
        models.Empresa.findOne({where:{cep:req.body.cep}}).then(result => {
            if(result){
                res.status(200).json({
                    message: "There is already in the database a company with cep " + result.cep +  " , enter your own cep, Please!"
                })
            }
            
            else{
                const saveLocation = {
                   type:req.body.location.type,
                   longitude:req.body.location.coordinates.longitude,
                   latitude:req.body.location.coordinates.latitude
    
                }
                const saveCompany = {
                    cep: req.body.cep,
                    state: req.body.state,
                    city: req.body.city,
                    street: req.body.street,
                    neighborhood: req.body.neighborhood,
                    service: req.body.service
                }
    
              var companyObject =  models.Empresa.create(saveCompany).then(result =>{
                    res.status(201).json({
                        message: "Company Crated Successfully",
                        companies: result
                    })
                    saveLocation["empresa_id"]=result.id
                    models.location.create(saveLocation)
                }).catch(error =>{
                    res.status(200).json({
                        message: "Sorry, Something went wrong!",
                        error: error
                    })
                })
                console.log(companyObject)
            }
        })
    }
}

async function index(req, res) {
    data=[]
     await models.location.findAll().then(result=>data=result)
     await models.Empresa.findAll({
     }).then(result=>{
        for(let i=0;i<result.length;i++)
        {
            data.map((el)=>{
                if(el.empresa_id==result[i].id)
                result[i]["location"]=el
             })
        }
        res.status(200).json({data:result})
     })
      .catch(erro =>{
        res.status(500).json({
            message: "Something went wrong",
            erro: erro
        })
     })

    
    
     
}
async function show(req, res) {
    const id = req.params.id
    await models.Empresa.findByPk(id).then(result =>{
        res.status(200).json(result)
    }).catch(erro =>{
        res.status(500).json({
            message: "Something went wrwong"
        })
    })
    
}

function update(req, res) {
    const id = req.params.id

    const empresaAtualizada = {
        cep: req.body.cep,
        state: req.body.state,
        city: req.body.city,
        street: req.body.street,
        neighborhood: req.body.neighborhood,
        service: req.body.service
    }

    models.Empresa.update(empresaAtualizada, {where : {id:id}}).then(resultado =>{
        res.status(200).json({
            message: "Data updated successfully!",
            empresa: resultado
        })
    }).catch(erro =>{
        res.status(500).json({
            message:"Something was wrong",
            erro: erro
        })
    })
}

function destroy(req, res) {
    const id = req.params.id
    models.Empresa.destroy({where: {id:id}}).then(resultado=>{
        res.status(200).json({
            message: "Register deleted successfully",
            resultado: resultado
        })
    }).catch(erro =>{
        res.status(500).json({
            message:"An error occured",
            erro: erro
        })
    })
    
}

module.exports = {
    CreateCompany: CreateCompany,
    show: show,
    index: index,
    empresaAtualizada: update,
    destroy: destroy
}