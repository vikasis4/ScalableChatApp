import prismaClient from "../services/prisma";

const createAccount = async (req: any, res: any) => {
    try {

    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })

    }
}

module.exports = { createAccount }