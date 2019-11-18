import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkDataModel } from '../../models/BookmarkData.model';
import { LoaderService } from '../../services/loader/loader.service';
import { DataService } from '../../services/data/data.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//// Home (Search page)
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public searchList: BookmarkDataModel[] = [];
  public searchInput: string;
  public isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService,
    private dataService: DataService
  ) {
  }

  ngOnInit() {

  }

  // Add new Bookmark to Session -> $event from Directive (appAddBookmark)
  onAddNewBookmark(bookmark: BookmarkDataModel = null) {
    this.dataService.addNewBookmark(bookmark).subscribe(result => {

      // Update Count Bookmarks (UI only)
      this.dataService.updateSessionCountBookmarks(<number>result);
    }, error => console.error(error));
  }

  // Search Bookmarks -> $event from Input or Button
  searchFromGit() {
    this.searchList = [];
    this.dataService.searchFromGit(this.searchInput).subscribe(data => {
      this.searchList = data.items.map((item: any) => {
          return  {
            name : `${item.name} : ${item.full_name}`,
            avatarurl : item.owner.avatar_url,
            url : item.html_url
          } as BookmarkDataModel;
    });
  });
}
}
