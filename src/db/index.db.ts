import mongoose from "mongoose";

export default async function connectToDb(callback: Function) {
    try {
        const dbUrl = process.env.DB_URL;
        if (dbUrl) {
            throw new Error("Invalid db url");
        }

        const connection = await mongoose.connect(dbUrl!);
        // initialize models
        console.log("Database connected");

        return connection;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
