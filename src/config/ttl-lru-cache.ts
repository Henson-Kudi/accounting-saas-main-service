import TTLCache from "@isaacs/ttlcache";
import mongoose from "mongoose";

const LRUCache = new TTLCache<string, any>({
    max: 100, // a maximum of 100 connections can be saved to the cache. If we have 100 connections in cache that are yet to get expired and we try to add a new connection to the cache, the connection that is closest to being expired will be removed from the cache in order to make space for the new connection to be  added. Read more here: https://github.com/isaacs/ttlcache#readme
    ttl: 1000 * 60 * 60 * 24, // each cached connection would live for 1day (24hrs) and gets deleted
    dispose: async (connection) => {
        if (connection && connection instanceof mongoose.Connection) {
            await connection.close();
        }
    },
});

export default LRUCache;
