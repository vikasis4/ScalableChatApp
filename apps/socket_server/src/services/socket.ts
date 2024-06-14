import { Server } from "socket.io";
import Redis from "ioredis";
import { produceMessage } from "./kafka";
require('dotenv').config();

var RedisConfig: any =
{
  host: process.env.RHOST,
  port: process.env.RPORT,
  username: process.env.RUSER,
  password: process.env.RPASSWORD,
}
const pub = new Redis(RedisConfig);
const sub = new Redis(RedisConfig);
  
class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;

    io.on("connect", (socket) => {
      socket.on("event:joinRoom", async ({ roomIds }: { roomIds: string[] }) => {
        console.log(roomIds);

        socket.join(roomIds)
      });
      socket.on("event:message", async ({ message, userId, roomId }: { message: string, userId: string, roomId: string }) => {
        await pub.publish("MESSAGES", JSON.stringify({ message, userId, roomId }));
      });
    });

    sub.on("message", async (channel, message) => {
      
      if (channel === "MESSAGES") {
        var roomId = await JSON.parse(message).roomId;
        io.to(roomId).emit('message', message);
        await produceMessage(message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
