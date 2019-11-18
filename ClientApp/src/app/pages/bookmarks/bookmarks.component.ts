import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { DataService } from 'src/app/services/data/data.service';
import { BookmarkDataModel } from 'src/app/models/BookmarkData.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  public sessionBookmarks: BookmarkDataModel[] = [];
  public isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.sessionBookmarks = [];
    this.dataService.getSessionBookmarks().subscribe(result => {
      this.sessionBookmarks = <BookmarkDataModel[]>result;
      this.dataService.updateSessionCountBookmarks(this.sessionBookmarks.length);
    });
  }

}
