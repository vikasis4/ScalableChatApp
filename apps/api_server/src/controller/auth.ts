import prismaClient from "../services/prisma";
import { createJWT, verifyJWT } from "../utils/jwt";

const HandleAuth = async (req: any, res: any) => {
    try {

        const { email, key, username } = req.body;
        var user = await prismaClient.user.findUnique({
            where: {
                email
            }
        })
        var token = user ? await createJWT(email, user.id) : null;

        if (user) {
            if (user.key === key) {
                await prismaClient.user.update({
                    where: {
                        email
                    },
                    data: {
                        token
                    }
                })
                res.json({ status: 'true', data: { token, user } })
                return
            }
            res.json({ status: 'no-auth' })
            return
        }

        var new_user = await prismaClient.user.create({
            data: {
                email,
                key,
                username,
                token
            }
        })

        res.json({ status: 'true', data: { token, user: new_user } })
        return

    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })

    }
}

const verifyToken = async (req: any, res: any) => {
    try {
        const { token } = req.body;
        var user = await verifyJWT(token);
        user ? res.json({ status: 'true', user }) : res.json({ status: 'no-auth' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

export { HandleAuth, verifyToken }