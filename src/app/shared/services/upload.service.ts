import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../services/data.service';
import { environment } from '../../../environments/environment';


@Injectable()
export class UploadService {

  files: string;
  url: string;
  uploadedFile: any = [];
  data: any;
  fileData: any;
  fileGuid: string;
  uploading: boolean;
  uploadingSuccess: boolean;
  uploadingFailed: boolean;
  fileDuration: number;
  constructor(private _dataService: DataService) {}
  private trackFile = new Subject();
  trackFile$ = this.trackFile.asObservable();

  sendFileStatus(status) {
    this.trackFile.next(status);
  }

  postFile(data, file) {
    this.uploading = true;
    return this._dataService.dataServicePost(`${environment.transcription_Api}/api/file/url`, data)
      .subscribe(item => {
        this.fileData = item;
        this._dataService.dataServicePut(this.fileData.Url, file).subscribe(() => {
          this._dataService.dataServicePut(`${environment.transcription_Api}/api/file/${this.fileData.Guid}/status/2`, '').subscribe(() => {
          this.uploading = false;
          this.uploadingSuccess = true;
          this.sendFileStatus(this.uploadingSuccess); // sending status to clear the form if uploading is success.
          }, err => {
            this.uploading = false;
            this.uploadingSuccess = false;
            this.uploadingFailed = true;
            console.log(err);
          })
        }, err => {
          this.uploading = false;
          this.uploadingSuccess = false;
          this.uploadingFailed = true;
          console.log(err);
        });
      },
        err => {
          if (err) {
            console.log(err);
            this.uploading = false;
            this.uploadingSuccess = false;
            this.uploadingFailed = true;
          }
        });
  }
}