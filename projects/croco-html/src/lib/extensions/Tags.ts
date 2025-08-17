import { HtmlRawTagDataConsts } from "../tag-services";
import { CustomWidgetTagDataConsts } from "../tag-services/CustomWidgetTagService";
import { FileImageTagDataConsts } from "./ImageMethods";
import { TextTags } from "./TextMethods";
import { ExternalVideoTagDataConsts } from "./VideoMethods";

export class Tags {
  public static readonly Text = TextTags.text;
  public static readonly H1 = TextTags.h1;
  public static readonly H2 = TextTags.h2;
  public static readonly H3 = TextTags.h3;
  public static readonly H4 = TextTags.h4;
  public static readonly H5 = TextTags.h5;
  public static readonly H6 = TextTags.h6;

  public static readonly HtmlRaw = HtmlRawTagDataConsts.TagName;
  public static readonly FileImage = FileImageTagDataConsts.TagName;
  public static readonly Table = 'table';
  public static readonly RichText = 'rich-text';
  public static readonly ExternalVideo = ExternalVideoTagDataConsts.TagName;
  public static readonly UnsupportedTag = 'unsupported-tag';
  public static readonly CustomWidget = CustomWidgetTagDataConsts.TagName;
}
