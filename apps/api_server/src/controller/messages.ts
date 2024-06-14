import prismaClient from "../services/prisma";

const getMessages = async(req:any, res:any)=>{
    try {        
        var {roomId, num} = req.params;
        var messages = await prismaClient.message.findMany({
            where:{
                roomId
            }
        })
        res.json({status:'true', messages})
    } catch (error) {
        console.log(error);
        res.json({status:'error'})
        
    }
}

export {getMessages}