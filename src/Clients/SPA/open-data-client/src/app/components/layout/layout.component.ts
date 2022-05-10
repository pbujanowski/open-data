import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { Route } from 'src/app/shared';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnDestroy {
  @Input()
  public title?: string;

  @ViewChild('sidenav')
  public sidenav?: MatSidenav;

  public mobileQueryList: MediaQueryList;

  public get opened() {
    return this.mobileQueryList.matches ? false : true;
  }

  public get mode() {
    return this.mobileQueryList.matches ? 'over' : 'side';
  }

  public onListItemClick = () => {
    if (this.mobileQueryList.matches) {
      this.sidenav?.close();
    }
  };

  public routes: Route[] = [
    { path: '/', label: 'Home' },
    { path: '/national-bank', label: 'National Bank' },
  ];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    mediaMatcher: MediaMatcher
  ) {
    this.mobileQueryList = mediaMatcher.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryList.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQueryList.removeEventListener(
      'change',
      this._mobileQueryListener
    );
  }
}
