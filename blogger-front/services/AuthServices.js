import request from ".";

const AuthServices = {
  Login: async (payload) =>
    await request(`/author/auth/check-email?email=${payload}`),

  Register: async (payload) =>
    await request("/author/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export default AuthServices;
