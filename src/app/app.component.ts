import { PeopleService } from './serices/people.service';
import {} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonComponent } from './person/person.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'CRUD-app-angular';
  listPeople: any = [];
  constructor(
    private _dialog: MatDialog,
    private _peopleService: PeopleService,
    private _coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.getAllPeople();
  }

  getAllPeople() {
    this._peopleService.getAllPeople().subscribe({
      next: (listPeople: any) => {
        this.dataSource = new MatTableDataSource(listPeople);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error(err) {
        console.log(err);
      },
    });
  }
  onDeletePerson(id: number) {
    this._peopleService.deletePerson(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('person deleted successfully!', 'done');
        this.getAllPeople();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal() {
    const dialogRef = this._dialog.open(PersonComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getAllPeople();
        }
      },
    });
  }

  updatePeson(data: any) {
    const dialogRef = this._dialog.open(PersonComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getAllPeople();
        }
      },
    });
  }
}
