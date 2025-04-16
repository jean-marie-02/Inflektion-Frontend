import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { PartnerService } from './services/partner.service';
import { Partner } from './models/partner.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  // Columns to display in the table (in order)
  displayedColumns: string[] = [
    'id',
    'partnerName',
    'partnerType',
    'grossSales',
    'conversions',
    'commissions',
  ];

  title = 'Inflektion-Frontend';

  dataSource = new MatTableDataSource<Partner>([]);
  pageSize = 15; // 15 records per page
  isLoading = true;
  errorMsg = '';

  // For filtering (optional)
  // filterValue = '';

  // Using ViewChild decorators for Material paginator and sort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Date range variables (for demonstration)
  startDate!: Date;
  endDate!: Date;

  constructor(private partnerService: PartnerService) {}

  ngOnInit(): void {
    this.fetchPartnerData();
  }

  fetchPartnerData(): void {
    this.isLoading = true;
    this.errorMsg = '';

    this.partnerService.getPartners().subscribe({
      next: (partners: Partner[]) => {
        this.dataSource.data = partners;
        // Assign paginator and sort after data is set
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'An error occurred while fetching data.';
        this.isLoading = false;
      },
    });
  }

  // Optional filtering method
  // applyFilter() {
  //   this.dataSource.filter = this.filterValue.trim().toLowerCase();
  // }

  onMessagePartners(): void {
    alert('Message Partners clicked (placeholder)!');
  }

  onExportList(): void {
    alert('Export List clicked (placeholder)!');
  }

  onChooseColumns(): void {
    alert('Choose Columns clicked (placeholder)!');
  }

  onDateRangeSelected(): void {
    // Example placeholder when the date range changes
    alert(
      `Date range selected: ${this.startDate?.toLocaleDateString()} - ${this.endDate?.toLocaleDateString()}`
    );
  }
}
