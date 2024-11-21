import 'dotenv/config';
export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: `${process.env.JWT_EXPIRATION_IN_SECONDS}s`,
};
