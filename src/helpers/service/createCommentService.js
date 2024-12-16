export class CreateCommentService {
    async post(request, url, commentData) {
      let response = await request.post(url, {
        data: commentData,
      });
      return response;
    }
  }