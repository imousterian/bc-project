import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CacheService {

  // helps individual components to communicate to each other and share data

  private subject = new Subject<any>();
  cachedData: {};

  constructor() {
    this.cachedData = {};
  }

  updateCache(id, folders) {
    this.cachedData[id] = folders;
    this.subject.next(this.cachedData);
  }

  retrieveCache(): Observable<any> {
    return this.subject.asObservable();
  }
}