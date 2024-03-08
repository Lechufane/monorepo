import request from ".";

const BlogsService = {
  getBlogsByAuthorId: async (authorId) => {
    return await request(`/blog/author/${authorId}`);
  },
};
export default BlogsService;
