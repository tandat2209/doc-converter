const amqp = require("amqplib");

async function sendRequestToQueue(file) {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const q = await channel.assertQueue("", { exclusive: true });
  const correlationId = file.filename;
  return new Promise((resolve, reject) => {
    channel.consume(
      q.queue,
      msg => {
        if (msg.properties.correlationId === correlationId) {
          resolve(msg);
        }
      },
      { noAck: true }
    );

    channel.sendToQueue("rpc_queue", Buffer.from(file.path), {
      correlationId: correlationId,
      replyTo: q.queue
    });
  });
}

module.exports = sendRequestToQueue;
