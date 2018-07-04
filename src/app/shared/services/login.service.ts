import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private _dataService: DataService) { }

  logIn(url, credentials): Observable<string> {
    return this._dataService.dataServicePost(url, credentials).map(res => <string>res);
  }

}
