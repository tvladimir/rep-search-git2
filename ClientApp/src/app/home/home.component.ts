import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkDataModel } from '../models/BookmarkData.model';
import { LoaderService } from '../services/loader/loader.service';
import { DataService } from '../services/data/data.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // public searchList$: Observable<Array<BookmarkDataModel>>;
  public searchList: BookmarkDataModel[] = [];
  public searchInput: string;
  public isLoading: Subject<boolean> = this.loaderService.isLoading;
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient, 
    @Inject('BASE_URL') baseUrl: string,
    private loaderService: LoaderService,
    private dataService: DataService
  ) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {

  }

  addNewBookmark(bookmark: BookmarkDataModel) {
    this.httpClient.post(this.baseUrl  + 'bookmark',bookmark).subscribe(result => {
      console.log(result)
    }, error => console.error(error));
    console.log(bookmark);
  }

  searchFromGit() {
    this.searchList = [];
    this.dataService.serachFromGit(this.searchInput).subscribe(data => {
      this.searchList = data.items.map((item: any) => {
          return  {
            Name : `${item.name} : ${item.full_name}`,
            AvatarUrl : item.owner.avatar_url,
            Url : item.html_url
          } as BookmarkDataModel;
    });
  });
}
}