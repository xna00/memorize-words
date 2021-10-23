import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import type { User } from '../../types/models'

const schema = new mongoose.Schema<
    User & Document
>({
    username: { type: String, unique: true },
    email: { type: String },
    password: {
        type: String,
        select: false,
        set(val: string) {
            return bcrypt.hashSync(val, 10);
        },
    },
});

export default mongoose.model("User", schema);
