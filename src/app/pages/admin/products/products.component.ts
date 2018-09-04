import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCRipple } from '@material/ripple';
import { MDCSwitch } from '@material/switch';

import { ContentService } from '../../../common/services/content.service';
import { PlatformService } from '../../../common/services/platform.service';
import { productCol } from '../../../common/classes/admin.table';

import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from '../../../common/services/snackbar.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataSource$ = new BehaviorSubject<any[]>([]);
  rawData: any[];
  columns = productCol;

  images = [];
  f_images = [];

  tempData: any;
  clicked = 0;
  sortKey: string;

  showSpinner = true;

  public editForm = this.fb.group({
    fullname: [''],
    name: [''],
    category: [''],
    blocktitle: [''],
    images: this.fb.array([]),
    image: [''],
    f_images: this.fb.array([]),
    f_image: [''],
    featured: [false],
    background: [false],
    order: [0]
  });

  public addForm = this.fb.group({
    fullname: [''],
    name: [''],
    category: [''],
    blocktitle: [''],
    images: this.fb.array([]),
    image: [''],
    f_images: this.fb.array([]),
    f_image: [''],
    featured: [false],
    background: [false],
    order: [0]
  });

  constructor(
    private content: ContentService,
    private platform: PlatformService,
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.content.fetchProds().subscribe(data => {
      this.dataSource$.next(data);
      this.rawData = data;
      this.showSpinner = false;
    });
    this.materialButtons();
  }

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

  update() {
    this.editForm.setControl('images', this.fb.array(this.images || []));
    this.editForm.setControl('f_images', this.fb.array(this.f_images || []));
    this.content.updateProduct(this.editForm.value).subscribe(
      (data) => {
        this.snackbar.trigger({
          message: `${this.editForm.value.fullname}: Edit Successful`,
          action: 'Close'
        });
      },
      (err) => {
        this.snackbar.trigger({
          message: `${this.editForm.value.fullname}: Edit Error: ${err.message}`,
          action: 'Close'
        });
      },
      () => {
        this.editForm.reset();
        this.images = [];
        this.f_images = [];
      }
    );
  }

  add() {
    this.addForm.setControl('images', this.fb.array(this.images || []));
    this.addForm.setControl('f_images', this.fb.array(this.f_images || []));
    this.content.addProduct(this.addForm.value).subscribe(
      (data) => {
        this.snackbar.trigger({
          message: `${this.addForm.value.fullname}: Add Successful`,
          action: 'Close'
        });
      },
      (err) => {
        this.snackbar.trigger({
          message: `${this.addForm.value.fullname}: Add Error: ${err.message}`,
          action: 'Close'
        });
      },
      () => {
        this.addForm.reset();
        this.images = [];
        this.f_images = [];
      }
    );
  }

  delete(info) {
    this.content.deleteProduct(info).subscribe(
      (data) => {
        this.snackbar.trigger({
          message: `${info.fullname}: Delete Successful`,
          action: 'Close'
        });
      },
      (err) => {
        this.snackbar.trigger({
          message: `${info.fullname}: Delete Error: ${err.message}`,
          action: 'Close'
        });
      },
      () => {
        console.log('Successful');
      }
    );
  }

  cancelEdit() {
    this.images = [];
    this.f_images = [];
    this.editForm.reset();
  }

  switchData(value, index) {
    this.editForm.controls.images = this.fb.array([]);
    this.editForm.controls.f_images = this.fb.array([]);
    this.editForm.setValue({
      blocktitle: value.blocktitle,
      fullname: value.fullname,
      name: value.name,
      category: value.category ? value.category : '',
      images: [],
      image: '',
      f_images: [],
      f_image: '',
      featured: value.featured ? value.featured : false,
      background: value.background ? value.background : false,
      order: value.order ? value.order : 0
    });
    this.images = value.images || [];
    this.f_images = value.f_images || [];
    this.materialise(`editForm${index}`);
  }

  get addImages(): FormArray {
    return this.addForm.get('images') as FormArray;
  }

  get editImages(): FormArray {
    return this.editForm.get('images') as FormArray;
  }

  get addfImages(): FormArray {
    return this.addForm.get('f_images') as FormArray;
  }

  get editfImages(): FormArray {
    return this.editForm.get('f_images') as FormArray;
  }

  removeFromArr(value, index) {
    const arr = <any[]>value;
    arr.splice(index, 1);
  }

  addToArr(el: any, value) {
    el.preventDefault();
    if (el.keyCode === 13) {
      value.push(el.target.value);
      console.log(value);
    }
  }

  newData() {
    this.materialise('addForm');
  }

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
