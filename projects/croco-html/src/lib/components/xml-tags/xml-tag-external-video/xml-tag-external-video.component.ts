import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {InterfaceBlock} from "../../../extensions/InterfaceBlock";
import {ExternalVideoSupportedTypes, ExternalVideoTagData} from '../../../extensions';
@Component({
  selector: 'croco-html-xml-tag-external-video',
  templateUrl: './xml-tag-external-video.component.html',
  styleUrls: ['./xml-tag-external-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XmlTagExternalVideoComponent {
  @Input() public set data(value: InterfaceBlock) {
    this.tagData = value.data;
  };

  @Input() public set tagData(value: ExternalVideoTagData) {
    this._block = {
      type: value.type,
      link: value.link
    }
  };

  protected readonly ExternalVideoSupportedTypes = ExternalVideoSupportedTypes;

  public _block: ExternalVideoTagData = {
    type: '',
    link: ''
  }
}
