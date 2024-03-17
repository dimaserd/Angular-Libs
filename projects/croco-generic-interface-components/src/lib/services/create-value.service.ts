import { UntypedFormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import {UserInterfaceBlock} from "../models/UserInterfaceBlock";
import {UserInterfaceType} from "../models/UserInterfaceType";
import {SelectListItem} from "../models/SelectListItem";

@Injectable({providedIn: 'root'})
export class CreateValueService {
  createValueInterface(block: UserInterfaceBlock): any {
    switch (block.interfaceType) {
      case UserInterfaceType.MultipleDropDownList:
        return block.dropDownData.selectList.filter((x) => x.selected).map((x) => x.value);
      case UserInterfaceType.DropDownList:
        return this.GetValueFromDropdown(block.dropDownData.selectList);
      case UserInterfaceType.GenericInterfaceForClass:
        return block.innerGenericInterface.blocks.map((x) => this.createValueInterface(x));
      case UserInterfaceType.NumberBox:
        return 0;
      default:
        return null;
    }
  }

  private GetValueFromDropdown(data: SelectListItem[]) {
    const item = data.find((x) => x.selected);

    if (item === null || item === undefined) {
      return null;
    }

    return item.value;
  }

  createMainValue(formControl: UntypedFormControl, camelCase = true) {
    return this.iterateOverObject(formControl.value, camelCase);
  }

  private iterateOverObject(obj: any, camelCase = true) {
    const objClone = JSON.parse(JSON.stringify(obj));
    const workObject = {};
    for (const i in objClone) {
      if (objClone.hasOwnProperty(i)) {
        const name = this.toCase(i, camelCase);
        if (objClone[i] && objClone[i].autocompleteFlag) {
          workObject[name] = objClone[i].value;
        } else if (objClone[i] !== null && typeof objClone[i] === 'object' && !(objClone[i] instanceof Array)) {
          workObject[name] = this.iterateOverObject(objClone[i], camelCase);
        } else {
          workObject[name] = objClone[i];
        }
      }
    }
    return workObject;
  }

  private toCase(propName: string, camelCase: boolean): string {
    return camelCase ? propName[0].toLowerCase() + propName.substr(1) : propName;
  }
}
