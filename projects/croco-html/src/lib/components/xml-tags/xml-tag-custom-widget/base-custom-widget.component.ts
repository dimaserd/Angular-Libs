import {Component, Input} from "@angular/core";

@Component({
  template: ''
})
export abstract class BaseCustomWidgetComponent<T> {
  @Input()
  public set tagData(value: T) {
    this._tagData = value;
  };

  public get tagData(): any {
    return this._tagData;
  }

  public _tagData: T;
}
