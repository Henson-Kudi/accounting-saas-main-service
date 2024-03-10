import RabbitMQInstance from "../../config/amqp";

export default async function publishMessage(queue: any, task: any) {
    const channel = await RabbitMQInstance.createChannel();

    await channel.assertQueue(queue, {
        durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(task), {
        persistent: true,
    });

    console.log(`message published to queue: ${queue}`);
}
