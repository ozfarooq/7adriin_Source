import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-statement',
  templateUrl: './financial-statement.component.html',
  styleUrls: ['./financial-statement.component.css']
})
export class FinancialStatementComponent implements OnInit {
  public financialTab = '0';
  constructor() { }

  ngOnInit() {
  }
  setFinancialTabs(financialType: string): void {
    this.financialTab = financialType;
}
}
