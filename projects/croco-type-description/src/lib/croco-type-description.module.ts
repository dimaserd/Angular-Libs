import { NgModule } from '@angular/core';

import { TypeDecriptionComponent } from './components/type-decription/type-decription.component';
import { TypeDecriptionClassComponent } from './components/type-decription-class/type-decription-class.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';

const COMPONENTS = [TypeDecriptionComponent, TypeDecriptionClassComponent]

const MATERIAL_MODULES = [MatSnackBarModule, MatFormFieldModule, MatExpansionModule, MatOptionModule]

@NgModule({
  imports: [...MATERIAL_MODULES, ReactiveFormsModule,],
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class TypeDescriptionModule { }
