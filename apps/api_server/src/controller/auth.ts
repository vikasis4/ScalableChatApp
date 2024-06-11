import prismaClient from "../services/prisma";
import { createJWT, verifyJWT } from "../utils/jwt";

const HandleAuth = async (req: any, res: any) => {
    try {

        const { email, key, username } = req.body;
        var user = await prismaClient.user.findUnique({
            where: {
                email
            },
            include: {
                room: true
            }
        })
        var token = user ? await createJWT(email, user.id, username) : null;

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
            },
            include: {
                room: true
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
        const { token } = req.params;

        if (token === 'null') {
            res.json({ status: 'no-auth' })
            return
        }

        var user = await verifyJWT(token);

        if (user) {
            var new_user = await prismaClient.user.findUnique({
                where: {
                    id: user.id
                },
                include: {
                    room: true
                }
            })
            res.json({ status: 'true', user: new_user });
            return
        }
        res.json({ status: 'no-auth' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error' })
    }
}

export { HandleAuth, verifyToken }