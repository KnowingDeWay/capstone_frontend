export interface MappedArray<T> {
  [key: string]: T
}

export interface ICourseDataTable {
  assignmentGradeColumns: DataColumn[];
  customDataColumns: DataColumn[];
  students: DataTableStudent[];
  courseId: number;
}

export class CourseDataTable implements ICourseDataTable {
  assignmentGradeColumns: DataColumn[] = [];
  customDataColumns: DataColumn[] = [];
  students: DataTableStudent[] = [];
  courseId!: number;
  columnNames: string[] = [];

  constructor(private data: ICourseDataTable) {
    this.loadData();
    this.populateColumnNames();
  }

  private loadData() {
    this.data.assignmentGradeColumns.forEach(
      x => {
        let newCol: INumericDataColumn;
        newCol = x as INumericDataColumn;
        this.assignmentGradeColumns.push(new NumericDataColumn(newCol));
      }
    );
    this.data.customDataColumns.forEach(
      x => {
        if(x.dataType === ColumnDataType.Number) {
          let newCol: INumericDataColumn;
          newCol = x as INumericDataColumn;
          this.customDataColumns.push(new NumericDataColumn(newCol));
        }
        if(x.dataType === ColumnDataType.String) {
          let newCol: IStringDataColumn;
          newCol = x as IStringDataColumn;
          this.customDataColumns.push(new StringDataColumn(newCol));
        }
      }
    );
    this.students = this.data.students;
    this.courseId = this.data.courseId;
  }

  public populateColumnNames() {
    this.columnNames.push('Name');
    this.assignmentGradeColumns.forEach(
      x => {
        this.columnNames.push(x.name);
      }
    );
    this.customDataColumns.forEach(
      x => {
        this.columnNames.push(x.name);
      }
    );
  }

  public toTableDataSource(): any[] {
    let tableSource: any[] = [];
    this.students.forEach(
      x => {
        let entry: any = {};
        entry['Name'] = x.name;
        this.assignmentGradeColumns.forEach(
          y => {
            entry[y.name] = (y as NumericDataColumn).getByStudentId(x.id);
          }
        );
        this.customDataColumns.forEach(
          z => {
            if(z.dataType === ColumnDataType.Number) {
              entry[z.name] = (z as NumericDataColumn).getByStudentId(x.id);
            }
            else {
              entry[z.name] = (z as StringDataColumn).getByStudentId(x.id);
            }
          }
        );
        tableSource.push(entry);
      }
    );
    return tableSource;
  }

  public alterTableByDataSource(dataSource: any[]) {
    dataSource.forEach(
      x => {
        this.columnNames.forEach(
          name => {
            let currCol: DataColumn | undefined = this.get(name);
            if(currCol !== undefined) {
              if(currCol.dataType === ColumnDataType.Number) {
                let numCol: NumericDataColumn = currCol as NumericDataColumn;
                numCol.set(x['Name'], x[currCol.name]);
              }
              else {
                let strCol: StringDataColumn = currCol as StringDataColumn;
                strCol.set(x['Name'], x[currCol.name]);
              }
            }
          }
        );
    });
  }

  public resetTableValues() {
    this.assignmentGradeColumns.forEach(
      x => {
        let currCol: NumericDataColumn = x as NumericDataColumn;
        currCol.rows.forEach(
          y => {
            y.valueChanged = false;
            y.newValue = y.value;
          }
        );
      }
    );
    this.customDataColumns.forEach(
      x => {
        if(x.dataType === ColumnDataType.Number) {
          let currCol: NumericDataColumn = x as NumericDataColumn;
          currCol.rows.forEach(
            y => {
              y.valueChanged = false;
              y.newValue = y.value;
            }
          );
        }
        else {
          let currCol: StringDataColumn = x as StringDataColumn;
          currCol.rows.forEach(
            y => {
              y.valueChanged = false;
              y.newValue = y.value;
            }
          );
        }
      }
    );
  }

  public get(columnName: string): DataColumn | undefined {
    for(let n = 0; n < this.assignmentGradeColumns.length; n++) {
      var currCol = this.assignmentGradeColumns[n];
      if(currCol.name === columnName) {
        return currCol;
      }
    }
    for(let n = 0; n < this.customDataColumns.length; n++) {
      var currCol = this.customDataColumns[n];
      if(currCol.name === columnName) {
        return currCol;
      }
    }
    return undefined;
  }

  public getAssignmentCol(id: number): DataColumn | undefined {
    for(let n = 0; n < this.assignmentGradeColumns.length; n++) {
      if(this.assignmentGradeColumns[n].relatedDataId === id) {
        return this.assignmentGradeColumns[n];
      }
    }
    return undefined;
  }

}

export interface DataTableStudent {
  id: number,
  name: string
}

export interface DataRowBase {
  columnId: string;
  associatedUser: DataTableStudent;
  valueChanged: boolean;
}

export interface INumericDataColumn {
  columnId: string;
  name: string;
  dataType: ColumnDataType;
  columnType: ColumnType;
  calcRule: string;
  relatedDataId: number;
  colMaxValue: number;
  colMinValue: number;
  rows: NumericDataRow[];
}

export class NumericDataColumn implements DataColumn, INumericDataColumn {
  columnId!: string;
  name!: string;
  dataType!: ColumnDataType;
  columnType!: ColumnType;
  calcRule!: string;
  relatedDataId!: number;
  colMaxValue!: number;
  colMinValue!: number;
  rows: NumericDataRow[] = [];

  constructor(private data: INumericDataColumn) {
    this.columnId = data.columnId;
    this.name = data.name;
    this.dataType = data.dataType;
    this.columnType = data.columnType;
    this.calcRule = data.calcRule;
    this.relatedDataId = data.relatedDataId;
    this.rows = data.rows;
    this.colMinValue = data.colMinValue;
    this.colMaxValue = data.colMaxValue
  }

  public get(studentName: string): number {
    for(let n = 0; n < this.rows.length; n++) {
      if(this.rows[n].associatedUser.name === studentName) {
        return this.rows[n].value;
      }
    }
    return 0;
  }

  public set(studentName: string, newVal: number) {
    for(let n = 0; n < this.rows.length; n++) {
      if(this.rows[n].associatedUser.name === studentName) {
        this.rows[n].newValue = newVal;
        this.rows[n].valueChanged = true;
      }
    }
  }

  public getByStudentId(studentId: number): number {
    for(let n = 0; n < this.rows.length; n++) {
      if(this.rows[n].associatedUser.id === studentId) {
        return this.rows[n].value;
      }
    }
    return 0;
  }

}

export interface IStringDataColumn {
  columnId: string;
  name: string;
  dataType: ColumnDataType;
  columnType: ColumnType;
  calcRule: string;
  relatedDataId: number;
  colMaxValue: number;
  colMinValue: number;
  rows: StringDataRow[];
}

export class StringDataColumn implements DataColumn {
  columnId!: string;
  name!: string;
  dataType!: ColumnDataType;
  columnType!: ColumnType;
  calcRule!: string;
  relatedDataId!: number;
  colMaxValue!: number;
  colMinValue!: number;
  rows: StringDataRow[] = [];

  constructor(private data: IStringDataColumn) {
    this.columnId = data.columnId;
    this.name = data.name;
    this.dataType = data.dataType;
    this.columnType = data.columnType;
    this.calcRule = data.calcRule;
    this.relatedDataId = data.relatedDataId;
    this.rows = data.rows;
  }

  public get(studentName: string): string {
    for(let n = 0; n < this.rows.length; n++) {
      if(this.rows[n].associatedUser.name === studentName) {
        return this.rows[n].value;
      }
    }
    return '';
  }

  public set(studentName: string, newVal: string) {
    for(let n = 0; n < this.rows.length; n++) {
      if(this.rows[n].associatedUser.name === studentName) {
        this.rows[n].newValue = newVal;
        this.rows[n].valueChanged = true;
      }
    }
  }

  public getByStudentId(studentId: number): string {
    for(let n = 0; n < this.rows.length; n++) {
      if(this.rows[n].associatedUser.id === studentId) {
        return this.rows[n].value;
      }
    }
    return '';
  }

}

export interface NumericDataRow extends DataRowBase {
  value: number;
  newValue: number;
}

export interface StringDataRow extends DataRowBase {
  value: string;
  newValue: string;
}

export interface DataColumn {
  columnId: string;
  name: string;
  dataType: ColumnDataType;
  columnType: ColumnType;
  calcRule: string;
  relatedDataId: number;
  colMaxValue: number;
  colMinValue: number;
}

export enum ColumnDataType {
  // Double, String
  Number, String
}

export enum ColumnType {
  /*
   * Assignment Score: Assignment scores that Canvas uses to populate the Instructor's gradebook by default
   * Custom Canvas Column: User added columns added to the Course gradebook to hold additional data such as totals for example
   * File Import: A column added to the gradebook where the data is based off a file (a csv for example)
   * Derived Data: A column whose data is depedent on data within other columns. For example, a derived data column might
   * be a column where all the row values are equal to the sum of all the users assignments. Dervied Data columns are
   * automatically calculated by the system on the successful retreival of other data columns unlike all other column types.
   */
  Assignment_Score, Custom_Canvas_Column, File_Import, Derived_Data
}

