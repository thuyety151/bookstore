export interface Token {
    accessToken: {
      token: string;
      expires: string;
    };
    refreshToken: {
      token: string;
      expires: string;
    };
  }
  