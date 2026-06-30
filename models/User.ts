import mongoose, { Schema, models, model } from "mongoose";

export type UserRole = "student" | "teacher" | "admin";
export type UserStatus = "active" | "pending" | "suspended";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  school?: string;
  classCode?: string;
  grade?: string;
  avatar?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  // Siswa langsung "active" setelah register.
  // Guru "pending" sampai disetujui admin. Admin dibuat lewat seed/manual.
  status: { type: String, enum: ["active", "pending", "suspended"], default: "active" },
  school: { type: String },
  classCode: { type: String },
  grade: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model<IUser>("User", UserSchema);
