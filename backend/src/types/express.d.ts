declare global {
  namespace Express {
    interface User {
      user: {
        id: string;
        name: string;
        email: string;
      };
      accessToken: string;
      refreshToken: string;
    }
  }
}

export {};