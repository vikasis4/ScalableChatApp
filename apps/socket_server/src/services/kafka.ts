import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";
import prismaClient from "./prisma";
require('dotenv').config()


const kafka = new Kafka({
  brokers:['localhost:9092'] 
});

let producer: null | Producer = null;

export async function createProducer() {
  if (producer) return producer;

  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export async function produceMessage(message: string) {
  const producer = await createProducer();
  await producer.send({
    messages: [{ key: `message-${Date.now()}`, value: message }],
    topic: "MESSAGE",
  });
  return true;
}

export async function startMessageConsumer() {
  console.log("Consumer is running..");
  const consumer = kafka.consumer({ groupId: "default" });
  await consumer.connect();
  await consumer.subscribe({ topic: "MESSAGE", fromBeginning: true });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {

      if (!message.value) return;
      console.log(`New Message Recv..`);
      try {
        await prismaClient.message.create({
          data: {
            message: JSON.parse(message.value?.toString()).message,
            userId: JSON.parse(message.value?.toString()).userId,
            roomId: JSON.parse(message.value?.toString()).roomId
          },
        });
      } catch (err) {
        console.log("Something is wrong");
        pause();
        setTimeout(() => {
          consumer.resume([{ topic: "MESSAGE" }]);
        }, 60 * 1000);
      }
    },
  });
}
export default kafka;
