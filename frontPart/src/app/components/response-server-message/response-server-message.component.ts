import { ResponseServer } from './../../interfaces/ResponseServer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response-server-message',
  templateUrl: './response-server-message.component.html',
  styleUrls: [ './response-server-message.component.css' ]
})


export class ResponseServerMessageComponent implements OnInit {

  @Input() response: ResponseServer;

  constructor() { }

  ngOnInit() {

  }

  ngClassForMessage(status: number): string {
    return status === 200 ? 'alert-success' : 'alert-danger';
  }
}
