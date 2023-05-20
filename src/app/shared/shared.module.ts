import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TableViewComponent, NavbarComponent],
  imports: [CommonModule, MatIconModule, RouterModule],
  exports: [TableViewComponent, NavbarComponent, MatIconModule],
})
export class SharedModule {}
