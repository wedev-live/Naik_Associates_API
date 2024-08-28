const clientModel = require('../models/client.model.js');

const clientupsert = async function (request, response) {
    
    const data = request.body;
    // data.urlCode = Math.random().toString(36).substr(2, 5);
    // data.newabc = "new Data"
    // data.baseurl = `/${data.urlCode}` 
    
    // console.log(data)
    const FinalData = await clientModel.create(data)
    console.log(FinalData) 
    response.status(201).send({ status: "Client Created Successfully", data: FinalData })
} 

const getAllClient = async function (request, response) {
    
    // const urlCode = request.params.urlCode // get data using params (path param)
    
    const FinalData = await clientModel.find();
    response.status(200).send({status: "Client Get Successfully", data: FinalData})
}





module.exports = { clientupsert, getAllClient } 

