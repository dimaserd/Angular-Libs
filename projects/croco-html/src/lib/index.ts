import { ImageEditorComponent } from "./components/editor/image-editor/image-editor.component";
import { MainEditorBlockComponent } from "./components/editor/main-editor-block/main-editor-block.component";
import { MainEditorComponent } from "./components/editor/main-editor/main-editor.component";
import { TextEditorComponent } from "./components/editor/text-editor/text-editor.component";
import { FileIdSelectComponent } from "./components/file-id-select/file-id-select.component";
import { XmlTagHeaderInnerTextViewComponent } from "./components/xml-tags/xml-tag-header-inner-text-view/xml-tag-header-inner-text-view.component";
import { XmlTagHeaderTextViewComponent } from "./components/xml-tags/xml-tag-header-text-view/xml-tag-header-text-view.component";
import { XmlTagHtmlViewComponent } from "./components/xml-tags/xml-tag-html-view/xml-tag-html-view.component";
import { XmlTagRichTextViewComponent } from "./components/xml-tags/xml-tag-rich-text-view/xml-tag-rich-text-view.component";
import { XmlTagTableViewComponent } from "./components/xml-tags/xml-tag-table-view/xml-tag-table-view.component";
import { XmlTagTextViewComponent } from "./components/xml-tags/xml-tag-text-view/xml-tag-text-view.component";
import { XmlTagViewComponent } from "./components/xml-tags/xml-tag-view/xml-tag-view.component";
import { VisualEditorComponent } from './components/editor/visual-editor/visual-editor.component';
import { AddFilesBtnComponent } from './components/add-files-btn/add-files-btn.component';
import { ExternalVideoBlockComponent } from "./components/editor/external-video-block/external-video-block.component";
import { XmlTagExternalVideoComponent } from "./components/xml-tags/xml-tag-external-video/xml-tag-external-video.component";
import { HtmlRawEditorComponent } from "./components/editor/html-raw-editor/html-raw-editor.component";

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
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
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RichTextToHtmlPipe, TagToSpanPipe, ToHtmlBodyTagsPipe, ToPreviewHtmlPipe, ToPreviewPipe } from "./pipes";
import { UploadFilesBtnComponent } from "./components";
import { HtmlRawViewComponent } from "./components/xml-tags/html-raw-view/html-raw-view.component";
import { HtmlViewComponent } from "./components/html-view/html-view.component";

export const EditorComponents = [
    MainEditorComponent,
    FileIdSelectComponent,
    TextEditorComponent,
    ExternalVideoBlockComponent,
    ImageEditorComponent,
    MainEditorBlockComponent,
    VisualEditorComponent,
    AddFilesBtnComponent,
    HtmlRawEditorComponent,
];

export const XmlComponents = [
    XmlTagTableViewComponent,
    XmlTagViewComponent,
    XmlTagRichTextViewComponent,
    XmlTagHtmlViewComponent,
    XmlTagTextViewComponent,
    XmlTagHeaderTextViewComponent,
    XmlTagHeaderInnerTextViewComponent,
    XmlTagExternalVideoComponent,
    HtmlRawViewComponent
];

export const CrocoPipes = [
  RichTextToHtmlPipe,
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
