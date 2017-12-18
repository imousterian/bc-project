import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FileService {

  constructor(private http: Http) {
  }

  public getAllFiles(): Promise<any[]> {
    let resourceUrl: string = 'http://localhost:8080/api/files';
    return this.http
      .get(resourceUrl)
      .toPromise()
      .then(response => {
        return response.json() as any[];
      })
      .catch(err => {
        return this.handleError(err);
      })
  }

  public uploadFile(payload: any): Promise<any[]> {
    let resourceUrl: string = 'http://localhost:8080/api/files';
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