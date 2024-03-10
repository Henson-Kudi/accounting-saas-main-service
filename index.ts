import "dotenv/config";
import { connectToRedis } from "./src/config/redis";
import { runServer } from "./src/server";
import initialiseSubscriptions from "./src/services/rabbitMQ/subscriber";

// initialise rabbitMQ subscriber
(async () => {
    await connectToRedis();
    await initialiseSubscriptions();
})();
// run middleware server
export const server = runServer();
