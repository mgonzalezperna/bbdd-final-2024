import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { EVSE } from "../domain/EVSE";
import { EVSEsService } from "../services/EVSE.service";
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-EVSEs-list',
  templateUrl: './evse-list.component.html',
  styleUrls: ['./evse-list.component.css']
})
export class EVSEsListComponent implements OnInit {
  EVSEs: EVSE[] = []
  loading: boolean = false
  server_error: String = ""
  displayed_columns: String[] = ['model', 'brand', 'location', 'actions']
  list_EVSEs:MatTableDataSource<EVSE> = new MatTableDataSource()

  constructor(private EVSEService: EVSEsService, private http: HttpClient, public dialog: MatDialog) {}
  
  @ViewChild(MatSort) sort: MatSort = new(MatSort);

  async ngOnInit() {
    await this.fetchlistEVSEs()
    this.list_EVSEs = new MatTableDataSource(this.EVSEs)
    this.list_EVSEs.sort = this.sort;
  }

  async fetchlistEVSEs() {
    this.server_error = ""
    this.loading = true
    try {
      this.EVSEs = await this.EVSEService.requestList()
    } catch (error) {
      this.server_error = String(error)
    }
    this.loading = false
  }

  async createEVSE() {
    this.openDialog(new EVSE(), "Create", "Create", EVSEsDetailComponent)
  }

  async editEVSE(EVSE: EVSE) {
    this.openDialog(Object.assign(EVSE, EVSE), "Edit", "Apply", EVSEsDetailComponent)
  }

  async deleteEVSE(EVSE: EVSE) {
    this.openDialog(EVSE, "Delete", "Delete", EVSEDeleteConfirmComponent)
  }

  openDialog(EVSE: EVSE, title: String, submitButtonText: String, component: any): void {
    const dialogRef = this.dialog.open(component, {
      width: '25rem',
      data: { EVSE: EVSE, title: title, submitButtonText: submitButtonText },
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result) {
        await this.ngOnInit()

      }
    });
  }
}

const MAX_LEN_MODEL_EVSE = 45
const MAX_LEN_BRAND_EVSE = 45
const MAX_LEN_LOCATION_EVSE = 125
@Component({
  selector: 'evse-detail-dialog',
  templateUrl: 'evse-detail-dialog.html',
  styleUrls: ['./evse-list.component.css']
})
export class EVSEsDetailComponent {
  modelValidator: FormControl = new FormControl('', [Validators.required, Validators.maxLength(MAX_LEN_MODEL_EVSE)]);
  brandValidator: FormControl = new FormControl('', [Validators.required, Validators.maxLength(MAX_LEN_BRAND_EVSE)]);
  locationValidator: FormControl = new FormControl('', [Validators.required, Validators.maxLength(MAX_LEN_LOCATION_EVSE)]);
  isCreate: Boolean
  server_error: String|any = ""
  loading: boolean = false
  EVSE: EVSE

  get errorMsgModel() {
    return this.modelValidator.hasError('required') ? "Must input model" : this.errorMsgModelMaxLength
  }

  get errorMsgModelMaxLength() {
    return this.modelValidator.hasError('maxlength') ? `Exceeds max length of ${MAX_LEN_MODEL_EVSE} characters` : ''
  }

  get errorMsgBrand() {
    return this.brandValidator.hasError('required') ? "Must input brand" : this.errorMsgBrandMaxLength
  }

  get errorMsgBrandMaxLength() {
    return this.brandValidator.hasError('maxlength') ? `Exceeds max length of ${MAX_LEN_BRAND_EVSE} characters` : ''
  }
 
  get errorMsgLocation() {
    return this.locationValidator.hasError('required') ? "Must input location" : this.errorMsgLocationMaxLenght
  }

  get errorMsgLocationMaxLenght() {
    return this.locationValidator.hasError('maxlength') ? `Exceeds max length of ${MAX_LEN_LOCATION_EVSE} characters` : ''
  }

  constructor(
    private EVSEService: EVSEsService,
    public dialogRef: MatDialogRef<EVSEsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.EVSE = Object.assign(new EVSE(), this.data.EVSE)
    if (!data.EVSE.model && !data.EVSE.brand && !data.EVSE.location) {
      this.isCreate = true
    } else {
      this.isCreate = false
    }
  }

  get title() {
    return this.data.title
  }

  get submitButtonText() {
    return this.data.submitButtonText
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async accept() {
    this.server_error = ""
    this.loading = true
    try {
      if (this.isCreate) {
        await this.EVSEService.create(this.EVSE)
      } else {
        await this.EVSEService.update(this.EVSE)
      }
      this.dialogRef.close("true")
    } catch (error) {
      this.server_error = error
      console.log(error) //mostrar errores
    }
    this.loading = false
  }

  get hayErrores() {
    return this.modelValidator.errors !== null || this.brandValidator.errors !== null || this.locationValidator.errors !== null
  }

  cantSubmit() {
    return this.hayErrores || (this.EVSE.model == this.data.EVSE.model && this.EVSE.brand == this.data.EVSE.brand && this.EVSE.location == this.data.EVSE.location)
  }

}
@Component({
  selector: 'evse-delete-confirm',
  templateUrl: 'evse-delete-confirm.html',
  styleUrls: ['./evse-list.component.css']
})
export class EVSEDeleteConfirmComponent {

  server_error: String|any = ""
  loading: boolean = false

  constructor(
    private EVSEService: EVSEsService,
    public dialogRef: MatDialogRef<EVSEDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get EVSE() {
    return this.data.EVSE
  }

  async delete() {
    this.server_error = ""
    this.loading = true
    try {
      await this.EVSEService.delete(this.EVSE)
      this.dialogRef.close("true")
    } catch (error) {
      this.server_error = error
      console.log(error) //mostrar errores
    }
    this.loading = false
  }

}

