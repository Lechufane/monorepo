import request from ".";

const AuthorsService = {
  getAuthor: async (id) => await request(`/author/${id}`),
};

export default AuthorsService;
