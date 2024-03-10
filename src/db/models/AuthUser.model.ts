import mongoose from "mongoose";
import AuthUser from "../../types/models/AuthUser";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const AuthUser = new mongoose.Schema<AuthUser>(
    {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            index: true,
            validate: [
                function (email: string) {
                    return emailRegex.test(email);
                },
                "Invalid email address",
            ],
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Company",
        },
    },
    {
        timestamps: true,
        id: true,
    }
);

AuthUser.methods.toJSON = function (this: mongoose.Document & AuthUser) {
    const { _id, __v, ...obj } = this.toObject();

    return {
        ...obj,
        id: _id,
    };
};

const AuthUserModel = mongoose.model("AuthUser", AuthUser);

export default AuthUserModel;
