function assertEnv(value: string | undefined, key: string): string {
  if (!value) {
    throw new Error(`Environment ${key} doesn't exist`);
  }
  return value;
}

const Config = {
  apiHost: assertEnv(process.env.REACT_APP_API_HOST, "REACT_APP_API_HOST"),
  apiAddressHost: assertEnv(
    process.env.REACT_APP_API_GHN_ADDRESS,
    "REACT_APP_API_GHN_ADDRESS"
  ),
  apiAddressKey: assertEnv(
    process.env.REACT_APP_API_GHN_KEY,
    "REACT_APP_API_GHN_KEY"
  ),
};

export default Config;
