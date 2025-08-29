import { NgModule } from '@angular/core';
import { JsOpenApiMainComponent,
   JsWorkerExpansionPanelComponent, JsWorkerMethodComponent, JsOpenApiConsoleComponent, JsOpenApiRemoteDocsComponent,
    JsOpenApiRemoteExpansionPanelComponent, JsOpenApiLoggedVariableComponent, JsOpenApiExecutionLogComponent, JsOpenApiScriptResultComponent } from './components';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    [MatFormFieldModule,
      MatTableModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatSnackBarModule,
      MatTabsModule,
      MatListModule,
      MatButtonModule,
      MatInputModule],
    RouterModule.forChild([
      {
        path: '',
        component: JsOpenApiMainComponent,
      }
    ])
  ]
})
export class AngularJsOpenApiModule { }
