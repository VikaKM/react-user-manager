import avatarPlaceholder from "../../../../assets/avatar-placeholder.png";
import type { ApiUser, User } from "../types/user.types";

export function mapUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    name: apiUser.name,
    username: apiUser.username,
    email: apiUser.email,
    city: apiUser.address.city,
    phone: apiUser.phone,
    companyName: apiUser.company.name,
    avatar: avatarPlaceholder,
  };
}