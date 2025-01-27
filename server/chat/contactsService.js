import { NotFoundError, InternalServerError } from "../custom-errors/errors.js";
import UserRepository from "../users/user-repository.js";
export const getContacts = async () => {
  try {
    const users = await UserRepository.getContacts();
    if (users) {
      return users;
    }
    throw new NotFoundError("Invalid contacts ");
  } catch (error) {
    throw new InternalServerError("Failed to fetch contacts");
  }
};
