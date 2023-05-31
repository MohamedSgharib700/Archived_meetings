import User from "../../features/users/models/user.model";
//TODO: refactor this leater to it's scope
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
