import { GenericInterfaceModel } from './GenericInterfaceModel';
// TODO: Добавить в peerDeps croco-type-description после обновления ангуляра
import {CrocoTypeDescriptionResult} from "croco-type-description";

export interface GenerateGenericUserInterfaceModel {
  interface: GenericInterfaceModel;
  customDataJson: string;
  valueJson: string;
  typeDescription: CrocoTypeDescriptionResult;
}
