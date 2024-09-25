export const generateVerificationCode = () => {
  return Math.floor(100_000 + Math.random() * 900_000).toString();
};
