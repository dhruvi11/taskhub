import {
  createUser,
  findUserByEmail,
} from './auth.repository';

import {
  hashPassword,
  comparePassword,
} from '../utils/password';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/jwt';

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};