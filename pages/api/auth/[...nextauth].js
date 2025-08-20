import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

let users = []; // Temporary in-memory store (later replace with DB)

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find((u) => u.username === credentials.username);

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        return { id: user.username, name: user.username };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);

// Helper to register new users
export async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const exists = users.find((u) => u.username === username);

  if (exists) throw new Error("User already exists");

  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  return newUser;
}
