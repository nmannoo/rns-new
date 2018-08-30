import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCRipple } from '@material/ripple';
import { MDCSwitch } from '@material/switch';

import { ContentService } from '../../../common/services/content.service';
import { PlatformService } from '../../../common/services/platform.service';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { pageCol } from '../../../common/classes/admin.table';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  dataSource$ = new BehaviorSubject<any[]>([]);
  rawData: any[];
  columns = pageCol;

  tempData: any;
  clicked = 0;
  sortKey: string;

  showSpinner = true;

  public addForm = this.fb.group({
    id: [''],
    title: [''],
    description: [''],
    keywords: ['']
  });

  public editForm = this.fb.group({
    id: [''],
    title: [''],
    description: [''],
    keywords: ['']
  });

  constructor(
    private content: ContentService,
    private platform: PlatformService,
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.content.fetchAllContent().subscribe(data => {
      this.dataSource$.next(data);
      this.rawData = data;
      this.showSpinner = false;
    });
    this.materialButtons();
  }

  // Material Design

  materialButtons() {
    if (this.platform.platformCheck) {
      const buttons = document.querySelectorAll('.mdc-button');
      for (let i = 0; i < buttons.length; i++) {
        MDCRipple.attachTo(buttons[i]);
      }
    }
  }

  materialise(form) {
    if (this.platform.platformCheck) {
      const editForm = document.querySelector(`#${form}`);
      const editFields = editForm.getElementsByClassName('mdc-text-field');
      for (let i = 0; i < editFields.length; i++) {
          MDCTextField.attachTo(editFields[i]);
      }
      const editValidation = editForm.getElementsByClassName('mdc-text-field-helper-text');
      for (let i = 0; i < editValidation.length; i++) {
          MDCTextFieldHelperText.attachTo(editValidation[i]);
      }

      const editSwitch = editForm.getElementsByClassName('mdc-switch');
      for (let i = 0; i < editSwitch.length; i++) {
        MDCSwitch.attachTo(editSwitch[i]);
      }
    }
  }

  // Add New Content

  newData() {
    this.materialise('addForm');
  }

  add() {
    this.content.addPage(this.addForm.value).subscribe(
      (data) => {
        this.snackbar.trigger({
          message: `${this.addForm.value.title}: Add Successful`,
          action: 'Close'
        });
      },
      (err) => {
        this.snackbar.trigger({
          message: `${this.addForm.value.title}: Add Error: ${err.message}`,
          action: 'Close'
        });
      },
      () => {
        this.addForm.reset();
      }
    );
  }

  // Edit Content

  cancelEdit() {
    this.editForm.reset();
  }

  switchData(value, index) {
    this.editForm.setValue({
      id: value.id,
      title: value.title,
      description: value.description ? value.description : '',
      keywords: value.keywords ? value.keywords : ''
    });
    this.materialise(`editForm${index}`);
  }

  update() {
    this.content.updatePage(this.editForm.value).subscribe(
      (data) => {
        this.snackbar.trigger({
          message: `${this.editForm.value.title}: Edit Successful`,
          action: 'Close'
        });
      },
      (err) => {
        this.snackbar.trigger({
          message: `${this.editForm.value.title}: Edit Error: ${err.message}`,
          action: 'Close'
        });
      },
      () => {
        this.editForm.reset();
      }
    );
  }

  // Delete Content

  delete(info) {
    this.content.deletePage(info).subscribe(
      (data) => {
        this.snackbar.trigger({
          message: `${info.title}: Delete Successful`,
          action: 'Close'
        });
      },
      (err) => {
        this.snackbar.trigger({
          message: `${info.title}: Error: ${err.message}`,
          action: 'Close'
        });
      },
      () => {
        console.log('Successful');
      }
    );
  }

  // Sort

  sortData(event, sortDirection: string) {
    const sortKey = event.target.getAttribute('data-name');
    this.sortKey = sortKey;
    const arr = this.dataSource$.value.slice();
    const sortedArray = arr.sort((a, b) => {
      // tslint:disable-next-line:curly
      if (a[this.sortKey] > b[this.sortKey]) return sortDirection === 'asc' ? 1 : -1;
      // tslint:disable-next-line:curly
      if (a[this.sortKey] < b[this.sortKey]) return sortDirection === 'asc' ? -1 : 1;
      return 0;
    });

    if (this.clicked === 0) {
      this.dataSource$.next(sortedArray);
      this.clicked++;
    } else {
      this.dataSource$.next(this.rawData);
      this.clicked = 0;
      this.sortKey = '';
    }
  }

}
