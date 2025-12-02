import { UserModel } from "../../core/database/models/user.model";

export function findUserByUsername(username: string) {
  return UserModel.findOne({ username });
}
