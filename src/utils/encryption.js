import { AES, enc } from "crypto-js";

const key = "reactangularview";

export const encrypt = (item) => {
  return AES.encrypt(JSON.stringify(item), key).toString();
};

export const decrypt = (item) => {
  const decyptedItem = AES.decrypt(item, key).toString(enc.Utf8);
  return decyptedItem;
};
