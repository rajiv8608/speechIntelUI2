import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableInfoService } from './smart-table.service';


import { Router } from '@angular/router';
import { DataService } from '../../../shared/services/data.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { DOCUMENT } from "@angular/platform-browser";
import { Inject } from "@angular/core";
import { AuthService } from '../../../shared/services/auth.service';
import * as moment from 'moment';
/* import * as momentTz from 'moment-timezone' */


import { FileInfo } from './fileInfo.interface';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    :host /deep/ ng2-smart-table tbody > tr > td {
      
     }
  `],
})
export class SmartTableComponent {
  searchText: string;
  filesInfo: FileInfo[];
  loading: boolean = true;
  fileInfoLength: number;
  isVisible: boolean = false;
  uploadedTimeArray: string[] = [];
  selectedListCount: string = 'All';
  linkToCopy: string;
  baseUrl: string;
  private dom: Document;
  txtArea: any;
  modalRef: NgbModalRef;
  curfileToDelete: string;
  curfileGuidToDelete: string;
  isEditOrDelete:boolean;
  settings = {
    actions:false,
    /* actions: {  
              add:false,edit:false,
              delete: true,
              custom: [{ name: 'Copy Link', title: `<span><i class="fas fa-link"></i></span><span>Copy Link</span>`},
                       { name: 'Download', title: `<i class="fas fa-2x fa-download"></i>` },
                       { name: 'Retry', title: `<i class="fas fa-2x fa-redo"></i>` },
                      ],
              position:'right'}, */
  
    columns: {
      FileName: {
        title: 'File Name',
        type: 'string',
      },
      Size: {
        title: 'Size',
        type: 'html',
        valuePrepareFunction: (value) => {
          return ` ${value} MB`;
        }
      },
      Duration: {
        title: 'Duration',
        type: 'number',
      },
      Status: {
        title: 'Status',
        type: 'string',
      },
      JobId: {
        title: 'JobId',
        type: 'string',
      },
      CustomerId: {
        title: 'CustomerId',
        type: 'string',
      },
      UploadedDate: {
        title: 'Uploaded Date (PST)',
        type: 'string',
        width:'12%',
      },
      Link: {
        title: 'Copy Link',
        width:'8%',
        type: 'html',
        filter:false,
        valuePrepareFunction: (cell, row) => {
          return ` <span><i class="fas fa-link"></i></span>
                   <span>Copy Link</span>`;
        }
      },
      Download: {
        title: 'Download',
        type: 'html',
        filter:false,
        valuePrepareFunction: (cell, row) => {                 
            return `<i class="fas fa-2x fa-download"></i>`;             
        }
      },
      Retry: {
        title: 'Retry',
        type: 'html',
        filter:false,
        valuePrepareFunction: (cell, row) => {
          return `<i class="fas fa-2x fa-redo"></i>`;
        }
        
      },
      Delete: {
        title: 'Delete',
        type: 'html',
        filter:false,
        valuePrepareFunction: (cell, row) => {
          return `<i class="fas fa-2x fa-times-circle"></i>`;
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private fileInfoService: SmartTableInfoService, private modalService: NgbModal, private _router: Router, public dataService: DataService, @Inject(DOCUMENT) dom: Document, public authService: AuthService ) {
   
  }

  ngOnInit() {
    this.getFileInfo();
  }

  getFileInfo() {  // To get the information of the files to display in the table in the dashboard/home page.
    this.loading = true;
    this.fileInfoService.getFileInfo().subscribe(data => {
      this.dataService.downloadLinks = [];
      this.filesInfo = data;
      console.log(this.filesInfo);
      this.filesInfo.forEach(element => {
        let filedocx = element.Guid.replace('mp3', 'docx'); // we need to call the API with the guid having docx extension
        this.dataService.downloadLinks.push(`${environment.download_Api}/${filedocx}`);
      });
      this.fileInfoLength = this.filesInfo.length;
      this.source.load(this.filesInfo);
      //this.createUploadedTimeArray(); // creating array containing time based on the time zone
    },
      error => {
        console.log(error);
      },
    () => {
      this.loading = false;
    });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
