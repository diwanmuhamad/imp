interface User {
  id: string;
  name: string;
  email: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}
export type { User, RegisterInput, LoginInput };
