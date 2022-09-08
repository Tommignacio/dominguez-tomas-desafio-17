import mongoose from "mongoose";

export const authorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        apellido: {
            type: String,
            required: true,
        },
        edad: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        alias: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
