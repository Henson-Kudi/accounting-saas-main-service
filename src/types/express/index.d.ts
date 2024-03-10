import {
    Response as ExpressResponse,
    Request as ExpressRequest,
} from "express";
import { User } from "../models";

declare module "express" {
    export interface Request extends ExpressRequest {
        user?: User; // Define the type for your authenticated user
        dbConn?: mongoose.Connection;
    }

    export interface Response extends ExpressResponse {
        success?(data: { code?: number; message?: string; data?: any }): this;
        internalServerError?(data: {
            code?: number;
            message?: string;
            data?: any;
        }): this;
        badRequest?(data: {
            code?: number;
            message?: string;
            data?: any;
        }): this;
        unAuthorised?(data: {
            code?: number;
            message?: string;
            data?: any;
        }): this;
        pageNotFound?(data: {
            code?: number;
            message?: string;
            data?: any;
        }): this;
    }
}
