import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCRipple } from '@material/ripple';
import { MDCSwitch } from '@material/switch';

import { SliderService } from '../../../common/services/slider.service';
import { PlatformService } from '../../../common/services/platform.service';
import { sliderCol } from '../../../common/classes/admin.table';

import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from '../../../common/services/snackbar.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {
  dataSource$ = new BehaviorSubject<any[]>([]);
  rawData: any[];
  columns = sliderCol;

  tempData: any;
  clicked = 0;
  sortKey: string;

  images = [];
  showSpinner = true;

  public addForm = this.fb.group({
    pagename: [''],
    name: [''],
    image: [''],
    slides: this.fb.array([])
  });

  public editForm = this.fb.group({
    pagename: [''],
    name: [''],
    image: [''],
    slides: this.fb.array([])
  });

  constructor(
    private slider: SliderService,
    private platform: PlatformService,
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    this.slider.fetchAllSliders().subscribe(data => {
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
    this.addForm.setControl('slides', this.fb.array(this.images || []));
    this.slider.addSlider(this.addForm.value).subscribe(
      (data) => {
        this.snackbar.trigger({
          message: `${this.addForm.value.pagename}: Add Successful`,
          action: 'Close'
        });
      },
      (err) => {
        this.snackbar.trigger({
          message: `${this.addForm.value.pagename}: Add Error: ${err.message}`,
          action: 'Close'
        });
      },
      () => {
        this.addForm.reset();
        this.images = [];
      }
    );
  }

  // Edit Content

  cancelEdit() {
    this.images = [];
    this.editForm.reset();
  }

  switchData(value, index) {
    this.editForm.controls.slides = this.fb.array([]);
    this.editForm.setValue({
      pagename: value.pagename ? value.pagename : value.id,
      name: value.id,
      image: '',
      slides: []
    });
    this.images = value.slides || [];
    this.materialise(`editForm${index}`);
  }

  update() {
    this.editForm.setControl('slides', this.fb.array(this.images || []));
    this.slider.updateSlider(this.editForm.value).subscribe(
      (data) => {
        this.snackbar.trigger({
          message: `${this.editForm.value.pagename}: Edit Successful`,
          action: 'Close'
        });
      },
      (err) => {
        this.snackbar.trigger({
          message: `${this.editForm.value.pagename}: Edit Error: ${err.message}`,
          action: 'Close'
        });
      },
      () => {
        this.editForm.reset();
        this.images = [];
      }
    );
  }

  // Delete Content

  delete(info) {
    this.slider.deleteSlider(info).subscribe(
      (data) => {
        this.snackbar.trigger({
          message: `${info.pagename}: Delete Successful`,
          action: 'Close'
        });
      },
      (err) => {
        this.snackbar.trigger({
          message: `${info.pagename}: Delete Error: ${err.message}`,
          action: 'Close'
        });
      },
      () => {
        //
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

  // Array Control

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

}
