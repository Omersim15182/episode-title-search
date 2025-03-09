import crypto from "crypto";

export default function createEmailCode() {
  const key = crypto
    .randomBytes(9)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 12);
  return key;
}
