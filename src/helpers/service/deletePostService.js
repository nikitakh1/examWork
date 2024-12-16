export class DeletePostService {
    async delete(request, url) {
      let response = await request.delete(url);
      return response;
    }
  }