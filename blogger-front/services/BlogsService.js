import request from ".";

const BlogsService = {
  getBlogs: async () => await request("/blog"),
  getBlogsByAuthorId: async (authorId) =>
    await request(`/blog/author/${authorId}`),
  getBlog: async (id) => await request(`/blog/${id}`),
};
export default BlogsService;
