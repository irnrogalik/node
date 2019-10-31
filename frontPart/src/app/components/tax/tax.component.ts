import { ResponseServer } from './../../interfaces/ResponseServer';
import { Component, OnInit } from '@angular/core';
import { TaxService } from '../../services/tax.service';
import { Tax } from '../../interfaces/Tax';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: [ './tax.component.css' ]
})

export class TaxComponent implements OnInit {

  taxes: Tax[];
  response: ResponseServer;

  constructor(private taxService: TaxService) { }

  ngOnInit() {
    this.getTaxes();
  }

  getTaxes(): void {
    this.taxService.getTaxes().subscribe((taxes: Tax[]) => this.taxes = taxes);
  }

  deleteTax(tax: Tax): void {
    this.taxService.deleteTax(tax.id).subscribe((response: ResponseServer) => {
      this.response = response;
      if (response.status === 200) {
        this.taxes = this.taxes.filter((oneTax: Tax) => oneTax !== tax);
      }
    });
  }

}
