import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NationalBankComponent } from './national-bank.component';
import { UiLibraryModule } from 'src/app/shared';

const routes: Routes = [{ path: '', component: NationalBankComponent }];

@NgModule({
  declarations: [NationalBankComponent],
  imports: [CommonModule, RouterModule.forChild(routes), UiLibraryModule],
  exports: [RouterModule],
})
export class NationalBankModule {}
