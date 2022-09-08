import mongoose from "mongoose";

//esquema de usuarios
const UserSchema = new mongoose.Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	birthdate: { type: String, required: true },
	age: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"],
	},
	password: { type: String, required: true },
	createdAt: { type: Date, required: true },
	updatedAt: { type: Date, required: true },
});
//ademas del indice por defecto de mongo, agrego al email como indice
UserSchema.index({ email: 1 });
export default UserSchema;
