import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {environment} from 'environments/environment';
import {Institution} from 'shared/models/institution.model';

@Injectable()
export class InstitutionsHttp {
  constructor(private http: HttpClient) { }

  public list(): Observable<Institution[]> {
    return this.http
      .get(environment.api_url + '/institutions')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error));
  }
}
