import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Subject } from 'rxjs';
import { BookmarkDataModel } from 'src/app/models/BookmarkData.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public countBookmarks: Subject<number> = this.dataService.countBookmarks;

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.dataService.getSessionBookmarks().subscribe(data => {
      const sessionBookmarks: BookmarkDataModel[] = <BookmarkDataModel[]>data;
      this.dataService.updateSessionCountBookmarks(sessionBookmarks.length);
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
