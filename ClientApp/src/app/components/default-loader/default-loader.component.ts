import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-default-loader',
  templateUrl: './default-loader.component.html',
  styleUrls: ['./default-loader.component.scss']
})
export class DefaultLoaderComponent implements OnInit {

  public isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

}
