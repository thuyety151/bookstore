export interface IToken {
    accessToken: {
      token: string;
      expires: string;
    };
    refreshToken: {
      token: string;
      expires: string;
    };
  }
  