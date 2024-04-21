import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit, signal,
  ViewChild
} from '@angular/core';
import {InterfaceBlock} from "../../../extensions/InterfaceBlock";
import {ExternalVideoTagData} from '../../../extensions';
import {resizeObservable} from "./resize-observable";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {distinctUntilChanged, map} from "rxjs";

@Component({
  selector: 'croco-html-xml-tag-external-video',
  templateUrl: './xml-tag-external-video.component.html',
  styleUrls: ['./xml-tag-external-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XmlTagExternalVideoComponent implements OnInit {
  @Input() public set data(value: InterfaceBlock) {
    this.tagData = value.data;
  };

  @Input() public set tagData(value: ExternalVideoTagData) {
    this.videoId = this.getYouTubeId(value.link);
  };
  @ViewChild('playerContainer', {static: true}) public playerContainerRef?: ElementRef<HTMLElement>;

  public videoId?: string;

  public playerWidth = signal(NaN);
  public playerHeight = signal(NaN);


  constructor(private destroyRef :DestroyRef) { }

  ngOnInit(): void {
    const youtubeIframeApiUrl = 'https://www.youtube.com/iframe_api';
    if (!document.querySelector(`script[src="${youtubeIframeApiUrl}"]`)) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.setAttribute('src', youtubeIframeApiUrl);
      document.body.appendChild(tag);
    }

    if (this.playerContainerRef) {
      resizeObservable(this.playerContainerRef.nativeElement)
        .pipe(
          map(({ contentRect: { height, width } }) => ({ height, width })),
          distinctUntilChanged((a, b) => a.height === b.height && a.width === b.width),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe(({height,width}) => {
          this.playerHeight.set(height);
          this.playerWidth.set(width);
        });
    }
  }

  private getYouTubeId(youtubeLink:string): string {

    //https://www.youtube.com/watch?v=l3KfbfkxJOU
    const url = new URL(youtubeLink);
    if(url.pathname.endsWith('watch')){
      return url.searchParams.get("v");
    }

    //https://youtu.be/jzBneaWSswY
    const bits = url.pathname.split('/')
    return bits[bits.length - 1];
  }
}
