import {
  signInRepo,
  signUpRepo,
  updatePasswordRepo,
  profileRepo,
} from "./auth.repository";

const signUp = signUpRepo;
const signIn = signInRepo;
const updatePassword = updatePasswordRepo;
const userProfile = profileRepo;

export { signUp, signIn, updatePassword, userProfile };
