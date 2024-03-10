export default async function test_queue(message: any) {
    try {
        console.log(message);
    } catch (err) {
        console.error(err);
    }
}
