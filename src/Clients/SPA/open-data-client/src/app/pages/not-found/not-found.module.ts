import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found.component';
import { UiLibraryModule } from 'src/app/shared';

const routes: Routes = [{ path: '', component: NotFoundComponent }];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, RouterModule.forChild(routes), UiLibraryModule],
  exports: [RouterModule],
})
export class NotFoundModule {}
