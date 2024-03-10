import { rabbitMQSubscriptions } from "../../../utils/constants/rabbitMQSubscriptions";
import subScribeToChannels from "./subscriber";
import messageProcessors from "./messageProcessors";

export default async function initialiseSubscriptions() {
    try {
        Object.values(rabbitMQSubscriptions).map(async (queue) => {
            await subScribeToChannels(queue, messageProcessors[queue]);
        });
    } catch (error) {
        console.error(error);
    }
}
