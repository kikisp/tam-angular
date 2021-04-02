import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/app.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  test = 'test';
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getTest('public').subscribe(
      (data: any) => {
        this.test = data;
      },
      (error: { error: { error_description: any } }) => {
        alert(error.error.error_description);
      }
    );
  }
}
