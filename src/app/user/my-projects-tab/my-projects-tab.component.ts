import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-projects-tab',
  templateUrl: './my-projects-tab.component.html',
  styleUrls: ['./my-projects-tab.component.css']
})
export class MyProjectsTabComponent implements OnInit {
public myProjectTab = '0';
  constructor() { }

  ngOnInit() {
  }
  setmyProjectTabs(tabIndex: string) {
    this.myProjectTab = tabIndex;
   }
}
