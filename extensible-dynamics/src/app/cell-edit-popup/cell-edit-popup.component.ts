import { Component, Host, Injectable, Input, OnInit, Optional } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { ColumnDataType, DataColumn } from '../models/data-structures';

@Injectable({ providedIn: 'platform' })
@Component({
  selector: 'app-cell-edit-popup',
  templateUrl: './cell-edit-popup.component.html',
  styleUrls: ['./cell-edit-popup.component.css']
})
export class CellEditPopupComponent implements OnInit {

  public newValue: any;
  @Input() public dataSource: any[] = [];
  @Input() public userName: string = '';
  @Input() public column!: DataColumn | undefined;
  public isDataValid: boolean = true;

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.column === undefined) {
      return;
    }
    for(let i = 0; i < this.dataSource.length; i++) {
      if(this.dataSource[i]['Name'] === this.userName) {
        if(this.column.dataType === ColumnDataType.Number) {
          if(!isNaN(Number.parseFloat(this.newValue))) {
            if(this.newValue >= this.column.colMinValue && this.newValue <= this.column.colMaxValue) {
              this.dataSource[i][this.column.name] = this.newValue as number;
              this.isDataValid = true;
              this.popover.close();
            }
            else {
              this.isDataValid = false;
            }
          }
          else {
            this.isDataValid = false;
          }
        }
        else {
          this.dataSource[i][this.column.name] = this.newValue;
        }
      }
    }
  }

  onCancel() {
    if(this.popover) {
      this.popover.close();
    }
  }

}
