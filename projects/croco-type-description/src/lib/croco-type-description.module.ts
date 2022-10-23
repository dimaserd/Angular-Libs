import { NgModule } from '@angular/core';

import { TypeDecriptionComponent } from './components/type-decription/type-decription.component';
import { TypeDecriptionClassComponent } from './components/type-decription-class/type-decription-class.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import {RouterModule} from '@angular/router'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

const COMPONENTS = [TypeDecriptionComponent, TypeDecriptionClassComponent]

const MATERIAL_MODULES = [MatSnackBarModule, MatFormFieldModule, MatExpansionModule, MatOptionModule, MatButtonModule, MatInputModule, MatListModule, MatSelectModule, ]

@NgModule({
  imports: [...MATERIAL_MODULES, CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild([{
    path: '',
    component: TypeDecriptionComponent
  }])],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class TypeDescriptionModule { }
