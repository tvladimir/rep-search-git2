import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookmarkDataModel } from 'src/app/models/BookmarkData.model';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})

// BookmarksList component - just list of Bookmarks
// Used on Home & bookmarks pages
export class BookmarksListComponent implements OnInit {

  @Input() bookmarkList: BookmarkDataModel[];

  @Input() isShowBookmarkButton: boolean;
  @Input() isShowRemoveButton: boolean;
  @Output() onBookmarkAdd = new EventEmitter<BookmarkDataModel>();

  public isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService,
  ) {

  }

  ngOnInit() {
  }

  addNewBookmark($event){
    this.onBookmarkAdd.emit($event);
  }

}
