import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { BookmarkDataModel } from '../../models/BookmarkData.model';

@Directive({
  selector: '[appAddBookmark]'
})
export class AddBookmarkDirective {

  @HostListener('click') onClick() {
    this.onBookmarkAdd.emit(this.appAddBookmark);
  }

  @Input() appAddBookmark: BookmarkDataModel;
  @Output() onBookmarkAdd = new EventEmitter<BookmarkDataModel>();

  constructor() { }

}
