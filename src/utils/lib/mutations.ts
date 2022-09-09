import fetcher from "./fetcher";

export const auth = (body: { publicKey: Uint8Array; signature: Buffer }) => {
  return fetcher("auth/signin", body);
};

export const getNonce = (body: { publicKey: string }) => {
  return fetcher("auth/nonce", body);
};

export const getMe = () => {
  return fetcher("user/me");
};
