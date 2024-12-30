export function isInvalidEmail(email) {
    return (
      email === null ||
      typeof email !== "string" ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    );
  }
  