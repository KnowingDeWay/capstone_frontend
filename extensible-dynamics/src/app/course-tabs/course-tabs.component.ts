import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ColumnDataType, ColumnType, CourseDataTable, DataColumn, ICourseDataTable, INumericDataColumn, IStringDataColumn } from './../models/data-structures';
import { ObjectResponse } from './../models/response-models';
import { Router } from '@angular/router';
import { Course } from './../models/canvas-models';
import { CanvasGradebookDataService } from './../../services/canvas-gradebook-data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewColumnRequest } from '../models/request-models';

export interface TabFeedbackDialogData {
  message: string;
  title: string;
}

export enum LoadingActionType {
  Update_Values, Add_Column, Edit_Column, Delete_Column
}

export interface TabLoadingFeedbackData {
  message: string;
  title: string;
  gradebook: CourseDataTable;
  encodedToken: string;
}

export interface AddColumnDialogData {
  encodedToken: string,
  request: NewColumnRequest,
  courseId: number
}

export interface DeleteColumnDialogData {
  relatedDataId: number,
  encodedToken: string,
  courseId: number,
  colName: string
}


@Component({
  selector: 'app-course-tabs',
  templateUrl: './course-tabs.component.html',
  styleUrls: ['./course-tabs.component.css']
})
export class CourseTabsComponent implements OnInit {

  public title: string = '';
  public course!: Course;
  private encodedToken: string = '';
  public objectResponse!: ObjectResponse<ICourseDataTable>;
  public gradebook!: CourseDataTable;
  public loadingResults: boolean = true;
  public dataSource: any[] = [];
  public displayedColumns: string[] = [];
  public submitting: boolean = false;

  constructor(private cookieService: CookieService, private gradebookService: CanvasGradebookDataService,
    private router: Router, private matDialog: MatDialog) {
    this.encodedToken = this.cookieService.get(environment.tokenCookieName);
    this.setTitle();
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loadingResults = true;
    this.dataSource = [];
    if(this.course != null && this.course !== undefined) {
      await this.gradebookService.getCourseDataTable(this.course.id, this.encodedToken).then(
        x => {
          if(x.value !== undefined) {
            this.gradebook = new CourseDataTable(x.value);
            this.dataSource = this.gradebook.toTableDataSource();
            this.displayedColumns = this.gradebook.columnNames;
          }
          this.loadingResults = false;
        }
      );
    }
  }

  getColumnByName(name: string): DataColumn | undefined {
    return this.gradebook.get(name);
  }

  setTitle() {
    this.title = '';
    let currNav = this.router.getCurrentNavigation();
    if(currNav != null) {
      if(currNav.extras.state !== undefined) {
        this.course = currNav.extras.state.data;
      }
      else {
        this.router.navigateByUrl(environment.canvasCoursesUrl);
      }
    }
    else {
      this.router.navigateByUrl(environment.canvasCoursesUrl);
    }
    if(this.course !== null) {
      this.title = `${this.course.name} - Gradebook`;
    }
  }

  async submitValueChanges() {
    this.gradebook.alterTableByDataSource(this.dataSource);
    let dialogData: TabLoadingFeedbackData = {
      message: 'Submitting Changes...',
      title: 'Course Data Table',
      gradebook: this.gradebook,
      encodedToken: this.encodedToken
    };
    this.matDialog.open(
      TabLoadingFeedbackDialog, {
        width: '35%',
        data: dialogData,
        disableClose: true
      }
    );
  }

  clearChanges() {
    this.ngOnInit();
  }

  openAddNewColumnDialog() {
    const dialogRef = this.matDialog.open(AddColumnDialog, {
      width: '35%',
      data: {
        encodedToken: this.encodedToken,
        courseId: this.course.id
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.ngOnInit();
      }
    });
  }

  openDeleteColumnDialog(column: DataColumn | undefined) {
    if(column !== undefined) {
      const dialogRef = this.matDialog.open(DeleteColumnConfirmDialog, {
        width: '35%',
        data: {
          encodedToken: this.encodedToken,
          relatedDataId: column.relatedDataId,
          courseId: this.course.id,
          colName: column.name
        },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result) {
          this.ngOnInit();
        }
      });
    }
  }

}

@Component({
  selector: 'tab-feedback-dialog',
  templateUrl: 'tab-feedback-dialog.html',
})
export class TabFeedbackDialog {

  constructor(
    public dialogRef: MatDialogRef<TabFeedbackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TabFeedbackDialogData) {}

  onConfirmClick(): void {
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'loading-dialog',
  templateUrl: 'loading-dialog.html',
})
export class TabLoadingFeedbackDialog {

  public isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<TabLoadingFeedbackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TabLoadingFeedbackData,
    private gradebookService: CanvasGradebookDataService, private feedbackDialog: MatDialog) {
      this.onLoad();
    }

  async onLoad(): Promise<void> {
    let response: string = await this.gradebookService.updateCourseDataTable(this.data.encodedToken, this.data.gradebook);
    console.log(response);
    this.isLoading = false;
    this.feedbackDialog.open(TabFeedbackDialog, {
      width: '35%',
      data: {
        title: 'Edit Gradebook',
        message: response
      }
    });
    this.dialogRef.close();
  }

  async addColumn() {

  }

  async deleteColumn() {

  }
}

@Component({
  selector: 'add-new-col-dialog',
  templateUrl: 'add-new-col-dialog.html',
})
export class AddColumnDialog {

  public nameControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  public calcRuleControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public minValControl: FormControl = new FormControl('', [
    Validators.pattern('^-?[0-9]\\d*(\\.\\d+)?$')
  ]);

  public maxValControl: FormControl = new FormControl('', [
    Validators.pattern('^-?[0-9]\\d*(\\.\\d+)?$')
  ]);

  public csvFileUploadControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public columnTypeControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public columnDataTypeControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  public addColumnForm: FormGroup = this.formBuilder.group({
    nameControl: this.nameControl,
    calcRuleControl: this.calcRuleControl,
    minValControl: this.minValControl,
    maxValControl: this.maxValControl,
    csvFileUploadControl: this.csvFileUploadControl,
    columnTypeControl: this.columnTypeControl,
    columnDataTypeControl: this.columnDataTypeControl,
  });

  public isLoading: boolean = false;
  public selectedColType: number = 0;
  public selectedDataType: number = 0;
  public selectedFile!: File;
  public columnTypes = ColumnType;
  public columnDataTypes = ColumnDataType;
  public columnTypeKeys: number[] = [];
  public columnDataTypeKeys: number[] = [];
  public validMaxNum: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AddColumnDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddColumnDialogData,
    private gradebookService: CanvasGradebookDataService, private feedbackDialog: MatDialog,
    private formBuilder: FormBuilder) {
      this.initEnums();
      this.initValidationFields();
    }

    initValidationFields() {
      this.addColumnForm.get('minValControl')?.valueChanges.subscribe(
        x => {
          let minVal: number = (!isNaN(Number.parseFloat(x))) ? Number.parseFloat(x): Number.MIN_VALUE;
          this.addColumnForm.get('maxValControl')?.setValidators([
            Validators.pattern('^-?[0-9]\\d*(\\.\\d+)?$'),
            Validators.min(minVal)
          ]);
        }
      );
    }

    initEnums() {
      Object.keys(ColumnType).filter(x => !isNaN(Number(x))).forEach(
        x => {
          if(Number(x) !== 0) {
            this.columnTypeKeys.push(Number(x));
          }
        }
      );
      Object.keys(ColumnDataType).filter(x => !isNaN(Number(x))).forEach(
        x => {
          this.columnDataTypeKeys.push(Number(x));
        }
      );
    }

    async onFormSubmit() {
      this.isLoading = true;
      this.selectedFile = this.addColumnForm.get('csvFileUploadControl')?.value as File;
      let minValue: string = this.addColumnForm.get('maxValControl')?.value;
      let maxValue: string = this.addColumnForm.get('minValControl')?.value;
      let newColReq: NewColumnRequest = {
        newColumn: {
          columnId: '00000000-0000-0000-0000-000000000000',
          name: this.addColumnForm.get('nameControl')?.value as string,
          dataType: this.addColumnForm.get('columnDataTypeControl')?.value,
          columnType: this.addColumnForm.get('columnTypeControl')?.value,
          relatedDataId: -1,
          calcRule: this.addColumnForm.get('calcRuleControl')?.value as string,
          colMaxValue: (maxValue !== '') ? Number.parseFloat(maxValue) : Number.MAX_VALUE,
          colMinValue: (minValue !== '') ? Number.parseFloat(minValue) : Number.MAX_VALUE * -1
        },
        csvFileContent: (this.addColumnForm.get('csvFileUploadControl')?.value === '')
        ? '' : await this.selectedFile.text()
      };
      let resMessage: string = await this.gradebookService.addNewCustomColumn(this.data.encodedToken,
        this.data.courseId, newColReq);
      this.isLoading = false;
      this.feedbackDialog.open(TabFeedbackDialog, {
        width: '35%',
        data: {
          title: 'Add New Custom Column',
          message: resMessage
        }
      });
      this.dialogRef.close(true);
    }

    cancelSubmit() {
      this.dialogRef.close(false);
    }
}

@Component({
  selector: 'delete-confirm-dialog',
  templateUrl: 'delete-confirm-dialog.html',
})
export class DeleteColumnConfirmDialog {

  public isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TabFeedbackDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteColumnDialogData,
    private gradebookService: CanvasGradebookDataService, private feedbackDialog: MatDialog) {

    }

  async onConfirmClick(): Promise<void> {
    this.isLoading = true;
    let resText: string = await this.gradebookService.deleteCustomColumn(this.data.encodedToken,
      this.data.courseId, this.data.relatedDataId);
    this.isLoading = false;
    this.feedbackDialog.open(TabFeedbackDialog, {
      width: '35%',
      data: {
        title: 'Delete Custom Column',
        message: resText
      }
    });
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
