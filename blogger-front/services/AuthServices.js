import request from ".";

const AuthServices = {
  Login: async (payload) =>
    await request(`/author/auth/check-email?email=${payload}`),
};

export default AuthServices;
