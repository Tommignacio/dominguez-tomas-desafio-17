import mongoose from "mongoose";

export const messagesSchema = new mongoose.Schema(
	{
		autor: {
			type: mongoose.Schema.Types.ObjectId, //id del usuario
			ref: "author", //esquema author
		},
		mensaje: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
