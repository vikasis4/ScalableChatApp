import prismaClient from "../services/prisma";

const CreateRoom = async (req: any, res: any) => {
    try {
        var { userId1, userId2, name } = req.body;
        var room = await prismaClient.room.create({
            data: {
                name,
                users: {
                    connect: [{ id: userId1 }, { id: userId2 }]
                }
            }
        })
        res.json({ status: 'true', room })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })

    }
}

export { CreateRoom }