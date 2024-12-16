export class GetCommentsService {
    async get(request, url) {
      let response = await request.get(url);
      return response;
    }
  }