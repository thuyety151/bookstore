function assertEnv(value: string | undefined, key: string): string {
  const variables = {
    API_HOST: process.env.REACT_APP_API_HOST,
    ...require("dotenv").config().parsed,
  };
  console.log("REACT_APP_API_HOST",variables)
    if (!value) {
      throw new Error(`Environment ${key} doesn't exist`);
    }
  
    return value;
  }
  
  const Config = {
    apiHost: assertEnv(process.env.REACT_APP_API_HOST, "REACT_APP_API_HOST"),
  };
  
  export default Config