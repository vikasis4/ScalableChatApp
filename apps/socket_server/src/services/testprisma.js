const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient({
    log: ["query"],
});

const run = async () => {
    var user = await prismaClient.message.create({
        data: {
            roomId: '2a1c19e1-3310-41a4-b891-2bc7c3a76bd4',
            messages: 'Helo vikas',
            userId: '12772efa-dbd4-46c8-b4bf-e0e4e6bbef9f',

        },
    });
    console.log(user);
}
const run3 = async () => {
    var user = await prismaClient.user.deleteMany({
        where: {
            email: 'vikasxfile'
        }
    });
    console.log(user);
}
const run2 = async () => {
    // var user = await prismaClient.message.findMany({
    //     where: {
    //         // roomId: '
    //     },
    // });
    // var user2 = await prismaClient.room.findMany({
    //     where: {
    //         // roomId: '
    //     },
    // });
    var user3 = await prismaClient.user.findMany({
        where: {}
    });
    // console.log(user);
    // console.log(user2);
    console.log(user3);
}

// run()
run2()  
// run3()  