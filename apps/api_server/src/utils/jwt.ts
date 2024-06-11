var jwt = require('jsonwebtoken');
require('dotenv').config()

const createJWT = async (email: string, id: string, name:string) => {
    return await jwt.sign({ email, id, name }, process.env.JWT_SECRET, { algorithm: 'RS256' });
}
const verifyJWT = async (token: string) => {
    try {
        var decoded = await jwt.verify(token, process.env.JWT_SECRET);        
        return decoded
    } catch (error) {
        console.log(error);
        return null
    }
}

export { createJWT, verifyJWT }