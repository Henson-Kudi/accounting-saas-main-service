import mongoose from "mongoose";

type AuthUser = {
    email: string;
    password: string;
    company: mongoose.Types.ObjectId;
};

export default AuthUser;
