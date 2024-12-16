export class UpdatePostService {
    async put(request, url, postData) {
      let response = await request.put(url, {
        data: postData,
      });
      return response;
    }
  }