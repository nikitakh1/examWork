export class CreatePostService {
    async post(request, url, postData) {
      let response = await request.post(url, {
        data: postData,
      });
      return response;
    }
  }