import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  constructor() { }

  logIn() {
    sessionStorage.setItem('loggedIn', 'true');
  }

  isLoggedIn() {
    return (sessionStorage.getItem('loggedIn') === 'true');
  }

  logOut() {
    sessionStorage.clear();
  }

  clearViewOptions() {
    sessionStorage.setItem('viewOptions', 'false');
  }
  
  setfileGuid(fileGuid) {
    sessionStorage.setItem('fileGuid', fileGuid);
  }

  getfileGuid() {
    let fileGuid = sessionStorage.getItem('fileGuid');
    return fileGuid;
  }
  
  setFileName(fileName){
      sessionStorage.setItem('fileName', fileName);
  }

  getFileName() {
    let fileName = sessionStorage.getItem('fileName');
    return fileName;
  }

  deleteFileName() {
    sessionStorage.removeItem('fileName');
  }

}
