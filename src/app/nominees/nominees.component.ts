import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nominee, NomineesService } from '../nominees.service';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-nominees',
  standalone: true, // Indicates this is a standalone component
  templateUrl: './nominees.component.html',
  styleUrls: ['./nominees.component.css'],
  imports: [CommonModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule] // Import common Angular features like ngFor, ngIf
})
export class NomineesComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private nomineesService: NomineesService) {}

  ngOnInit() {
    // Fetch the nominees from the service
    this.nomineesService.getNominees().subscribe(nominees => {
      this.dataSource.data = nominees;
    });
  }

  filterText: string = '';

  displayedColumns: string[] = ['name', 'position', 'votes', 'actions'];

  dataSource = new MatTableDataSource<Nominee>();

  @ViewChild(MatSort) sort!: MatSort;

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.filterText = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterText.trim().toLowerCase();
  }

  filteredNominees() {
    this.dataSource.filter = this.filterText.trim().toLowerCase();
    return this.dataSource;
  }

  increaseVote(index: number): void {
    this.nomineesService.increaseVote(index);
  }

  decreaseVote(index: number): void {
    this.nomineesService.decreaseVote(index);
  }

  exportResults(): void {
    this.nomineesService.exportResults();
  }
}
