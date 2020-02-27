const amqp = require("amqplib");
const convert = require("./convert");

async function rpcServer() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "rpc_queue";
  channel.assertQueue(queue, { durable: false });
  channel.prefetch(1);

  channel.consume(
    queue,
    msg => {
      var filePath = msg.content.toString();
      console.info("New convert request: ", filePath);
      convert(filePath)
        .then(buffer => {
          console.info("Convert done: ", filePath);
          channel.sendToQueue(msg.properties.replyTo, buffer, {
            correlationId: msg.properties.correlationId
          });

          channel.ack(msg);
        })
        .catch(err => {
          console.error(err.message);
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(err.message),
            {
              correlationId: msg.properties.correlationId
            }
          );
          channel.ack(msg);
        });
    },
    { exclusive: true }
  );
}

rpcServer();
