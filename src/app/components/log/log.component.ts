import { LogService } from './../../services/log.service';
import { Component, OnInit } from '@angular/core';
import { Log } from '../../interfaces/Log';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: [ './log.component.css' ]
})

export class LogComponent implements OnInit {

  logs: Log[];
  resultFlush: string;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.getLog();
  }

  getLog(): void {
    this.logService.getLog().subscribe(logs => {
      this.logs = logs;
    });
  }

  deleteLog(): void {
    this.logService.deleteLog().subscribe(logs => {
      if (logs && logs.resultFlush) {
        this.resultFlush = logs.resultFlush;
        this.getLog();
      }
    });
  }

}
