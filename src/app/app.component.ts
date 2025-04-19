import { Component, OnInit, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

import { PartnerService } from './services/partner.service';
import { Partner } from './models/partner.model';
import { StylePaginatorDirective } from './directives/paginator.directive';

@Component({
  imports: [ 
    NgIf,
    CurrencyPipe, 
    MatPaginator, 
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatPaginatorModule,
    StylePaginatorDirective,
    MatSortModule,
    MatIconModule
  ],
  providers: [ MatDatepickerModule, MatNativeDateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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
    'contract',
    'grossSales',
    'commissions',
    'conversions',
    'details',
  ];

  isLoading = true;
  errorMsg = '';
  title = 'Inflektion-Frontend';

  dataSource = new MatTableDataSource<Partner>([]);
  pageSize = 15; // 15 records per page

  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // if (this.paginator && this.sort) {
    //   this.applyFilter('');
    // }
  }
 
  // Date range variables (for demonstration)
  startDate!: Date;
  endDate!: Date;


  constructor(private partnerService: PartnerService) 
  {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIcon('approvals', sanitizer.bypassSecurityTrustResourceUrl('approvals.svg'));
    iconRegistry.addSvgIcon('calendar', sanitizer.bypassSecurityTrustResourceUrl('calendar.svg'));
    iconRegistry.addSvgIcon('details', sanitizer.bypassSecurityTrustResourceUrl('details.svg'));
    iconRegistry.addSvgIcon('down-arrow', sanitizer.bypassSecurityTrustResourceUrl('down-arrow.svg'));
    iconRegistry.addSvgIcon('download', sanitizer.bypassSecurityTrustResourceUrl('download.svg'));
    iconRegistry.addSvgIcon('home', sanitizer.bypassSecurityTrustResourceUrl('home.svg'));
    iconRegistry.addSvgIcon('lists', sanitizer.bypassSecurityTrustResourceUrl('lists.svg'));
    iconRegistry.addSvgIcon('mail', sanitizer.bypassSecurityTrustResourceUrl('mail.svg'));
    iconRegistry.addSvgIcon('partners', sanitizer.bypassSecurityTrustResourceUrl('partners.svg'));
    iconRegistry.addSvgIcon('up-arrow', sanitizer.bypassSecurityTrustResourceUrl('up-arrow.svg'));
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMsg = '';

    this.partnerService.getPartners().subscribe({
      next: (partners: Partner[]) => {
        this.dataSource.data = partners;
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
