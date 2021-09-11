import { Subscription } from 'rxjs';
import { CourseDataTable, DataColumn, ICourseDataTable } from './../models/data-structures';
import { ObjectResponse } from './../models/response-models';
import { Router } from '@angular/router';
import { Course } from './../models/canvas-models';
import { CanvasGradebookDataService } from './../../services/canvas-gradebook-data.service';
import { Component, Inject, Injectable, NgModule, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TabFeedbackDialogData {
  message: string;
  title: string;
}

export interface TabLoadingFeedbackData {
  message: string;
  title: string;
  gradebook: CourseDataTable;
  token: string;
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
    private router: Router, private feedbackDialog: MatDialog) {
    this.encodedToken = this.cookieService.get(environment.tokenCookieName);
    this.setTitle();
    this.loadData();
  }

  async loadData() {
    this.loadingResults = true;
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
    this.feedbackDialog.open(
      TabLoadingFeedbackDialog, {
        width: '35%',
        data: {
          message: 'Submitting Changes...',
          title: 'Course Data Table',
          gradebook: this.gradebook,
          token: this.encodedToken
        },
        disableClose: true
      }
    );
  }

  clearChanges() {
    this.gradebook.resetTableValues();
    this.loadData();
    //this.dataSource = this.gradebook.toTableDataSource();
  }

  ngOnInit() {

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
    let response: string = await this.gradebookService.updateCourseDataTable(this.data.token, this.data.gradebook);
    this.isLoading = false;
    console.log(response);
    console.log(this.data.gradebook);
    this.feedbackDialog.open(TabFeedbackDialog, {
      width: '35%',
      data: {
        title: 'Edit Gradebook',
        message: response
      }
    });
    this.dialogRef.close();
  }
}
