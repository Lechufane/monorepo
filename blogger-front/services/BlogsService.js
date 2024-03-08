import request from ".";

const BlogsService = {
  getBlogs: async () => await request("/blog"),
  getBlogsByAuthorId: async (authorId) =>
    await request(`/blog/author/${authorId}`),
  getBlog: async (id) => await request(`/blog/${id}`),

  createBlog: async (blog) =>
    await request("/create", {
      method: "POST",
      body: JSON.stringify(blog),
    }),
};
export default BlogsService;
