import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FolderService {

  constructor(private http: Http) {
  }

  public create(payload: any): Promise<any[]> {
    if (!payload.name) {
      return this.handleError('Name is required');
    }
    let resourceUrl: string = 'http://localhost:8080/api/folders';
    return this.http
      .post(resourceUrl, payload)
      .toPromise()
      .then(response => {
        return response.json() as any;
      })
      .catch(err => {
        return this.handleError(err);
      })
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}