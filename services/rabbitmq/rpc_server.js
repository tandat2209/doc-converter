const amqp = require("amqplib");
const convert = require("../convert");

async function rpcServer() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "rpc_queue";
  channel.assertQueue(queue, { durable: false });

  channel.consume(
    queue,
    msg => {
      var filePath = msg.content.toString();
      console.log("New convert request: ", filePath);
      convert(filePath).then(buffer => {
        console.log("Convert done: ", filePath);
        channel.sendToQueue(msg.properties.replyTo, buffer, {
          correlationId: msg.properties.correlationId
        });

        channel.ack(msg);
      });
    },
    { exclusive: true }
  );
}

rpcServer();
