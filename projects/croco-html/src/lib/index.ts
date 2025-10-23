import { CustomWidgetIconComponent, DefinedCustomEditorBlockComponent, DefinedCustomTagViewComponent, ImageEditorComponent } from "./components";
import { MainEditorBlockComponent } from "./components";
import { MainEditorComponent } from "./components";
import { TextEditorComponent } from "./components";
import { FileIdSelectComponent } from "./components";
import { XmlTagHeaderInnerTextViewComponent } from "./components";
import { XmlTagHeaderTextViewComponent } from "./components";
import { XmlTagHtmlViewComponent } from "./components";
import { XmlTagTextViewComponent } from "./components";
import { XmlTagViewComponent } from "./components";
import { CustomWidgetEditorComponent } from "./components";
import { VisualEditorComponent } from './components';
import { AddFilesBtnComponent } from './components';
import { XmlTagExternalVideoComponent } from "./components";
import { HtmlRawEditorComponent } from "./components";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TagToSpanPipe, ToHtmlBodyTagsPipe, ToPreviewHtmlPipe, ToPreviewPipe } from "./pipes";
import { FileImageTagViewComponent, FileAudioTagViewComponent, UploadFilesBtnComponent } from "./components";
import { HtmlRawViewComponent } from "./components";
import { HtmlViewComponent } from "./components";
import { XmlTagCustomWidgetComponent } from "./components";

export const EditorComponents = [
  MainEditorComponent,
  FileIdSelectComponent,
  TextEditorComponent,
  ImageEditorComponent,
  MainEditorBlockComponent,
  VisualEditorComponent,
  AddFilesBtnComponent,
  HtmlRawEditorComponent,
  CustomWidgetEditorComponent,
  DefinedCustomEditorBlockComponent,
  CustomWidgetIconComponent
];

export const XmlComponents = [
  XmlTagViewComponent,
  XmlTagHtmlViewComponent,
  XmlTagTextViewComponent,
  XmlTagHeaderTextViewComponent,
  XmlTagHeaderInnerTextViewComponent,
  XmlTagExternalVideoComponent,
  HtmlRawViewComponent,
  FileImageTagViewComponent,
  FileAudioTagViewComponent,
  XmlTagCustomWidgetComponent,
  HtmlViewComponent,
  DefinedCustomTagViewComponent
];

export const CrocoPipes = [
  TagToSpanPipe,
  ToPreviewPipe,
  ToHtmlBodyTagsPipe,
  ToPreviewHtmlPipe
]

export const CrocoHtmlDeclarations = [
  UploadFilesBtnComponent,
  HtmlViewComponent,
  ...XmlComponents,
  ...EditorComponents,
  ...CrocoPipes
]

export const MaterialModules = [
  MatBadgeModule,
  MatTableModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatMenuModule,
  MatCardModule,
  MatSelectModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatChipsModule,
  MatListModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatTreeModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatSidenavModule,
  MatIconModule,
  DragDropModule,
  MatButtonToggleModule
];
