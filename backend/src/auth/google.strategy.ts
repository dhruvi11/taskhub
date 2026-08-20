import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

import { findOrCreateGoogleUser } from "./auth.service";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

if (!googleClientId) {
  throw new Error("GOOGLE_CLIENT_ID is not configured");
}

if (!googleClientSecret) {
  throw new Error("GOOGLE_CLIENT_SECRET is not configured");
}

if (!googleCallbackUrl) {
  throw new Error("GOOGLE_CALLBACK_URL is not configured");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackUrl,
    },

    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error("Google account does not provide an email"),
            undefined,
          );
        }

     const user = await findOrCreateGoogleUser({
  googleId: profile.id,
  email: email.toLowerCase(),
  name: profile.displayName || "TaskHub User",
});

const accessToken = generateAccessToken(user.id);
const refreshToken = generateRefreshToken(user.id);

return done(null, {
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  accessToken,
  refreshToken,
});
     
      } catch (error) {
        return done(error as Error, undefined);
      }
    },
  ),
);