// import "dotenv/config";

export default async function UserCreated(user: any) {
    try {
        console.log(user);
    } catch (err) {
        console.log(err);
        // In case of failure here we want to send a mail or slack message to dev team for the admin user to be created in db
        // throw err;
    }
}
