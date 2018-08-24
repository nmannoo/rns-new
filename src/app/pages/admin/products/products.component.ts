import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCRipple } from '@material/ripple';

import { ContentService } from '../../../common/services/content.service';
import { PlatformService } from '../../../common/services/platform.service';

import { productCol } from '../../../common/classes/admin.table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataSource$: any[];
  columns = productCol;

  images = [];
  f_images = [];

  tempData: any;

  public editForm = this.fb.group({
    fullname: [''],
    name: [''],
    category: [''],
    blocktitle: [''],
    images: this.fb.array([]),
    image: [''],
    f_images: this.fb.array([]),
    f_image: ['']
  });

  public addForm = this.fb.group({
    fullname: [''],
    name: [''],
    category: [''],
    blocktitle: [''],
    images: this.fb.array([]),
    image: [''],
    f_images: this.fb.array([]),
    f_image: ['']
  });

  constructor(
    private content: ContentService,
    private platform: PlatformService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.content.fetchProds().subscribe(data => {
      this.dataSource$ = data;
    });

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

      const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));
    }
  }

  update() {
    this.editForm.setControl('images', this.fb.array(this.images || []));
    this.editForm.setControl('f_images', this.fb.array(this.f_images || []));
    this.content.updateProduct(this.editForm.value).subscribe(
      (data) => {
        console.log('Successful');
      },
      (err) => {
        console.log('Something wrong has occured: ' + err.message);
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
        console.log('Successful');
      },
      (err) => {
        console.log('Something wrong has occured: ' + err.message);
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
        //
      },
      (err) => {
        console.log('An error occured: ' + err);
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
      category: value.category,
      images: [],
      image: '',
      f_images: [],
      f_image: ''
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

}
