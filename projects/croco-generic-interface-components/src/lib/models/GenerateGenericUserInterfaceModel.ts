import { GenericInterfaceModel } from './GenericInterfaceModel';
import {CrocoTypeDescriptionResult} from "croco-type-description";

export interface GenerateGenericUserInterfaceModel {
  interface: GenericInterfaceModel;
  customDataJson: string;
  valueJson: string;
  typeDescription: CrocoTypeDescriptionResult;
}
