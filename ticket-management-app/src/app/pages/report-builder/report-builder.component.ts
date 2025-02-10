import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

//placeholder
interface ReportData {
  employee: string;
  year2011: string;
  year2012: string;
  year2013: string;
  year2014: string;
  year2015: string;
  total: string;
}

@Component({
  selector: 'app-report-builder',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule],
  templateUrl: './report-builder.component.html',
  styleUrls: ['./report-builder.component.scss']
})
export class ReportBuilderComponent {
  //placeholders
  displayedColumns: string[] = ['employee', 'year2011', 'year2012', 'year2013', 'year2014', 'year2015', 'total'];
  dataSource: ReportData[] = [
    { employee: 'Andrew Fuller', year2011: '3,900.00 Р', year2012: '2,100.00 Р', year2013: '-', year2014: '-', year2015: '1,800.00 Р', total: '7,800.00 Р' },
    { employee: 'Janet Leverling', year2011: '6,100.00 Р', year2012: '3,200.00 Р', year2013: '-', year2014: '-', year2015: '-', total: '9,300.00 Р' },
    { employee: 'Nancy Davolio', year2011: '3,300.00 Р', year2012: '2,700.00 Р', year2013: '3,100.00 Р', year2014: '-', year2015: '1,700.00 Р', total: '10,800.00 Р' },
    { employee: 'Steven Buchanan', year2011: '-', year2012: '-', year2013: '3,999.00 Р', year2014: '8,100.00 Р', year2015: '-', total: '12,099.00 Р' },
    { employee: 'Total', year2011: '13,300.00 Р', year2012: '8,000.00 Р', year2013: '7,099.00 Р', year2014: '8,100.00 Р', year2015: '3,500.00 Р', total: '39,999.00 Р' },
  ];


}

