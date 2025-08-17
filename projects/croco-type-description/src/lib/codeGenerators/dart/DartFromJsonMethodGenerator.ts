import { CrocoPropertyReferenceDescription, CrocoTypeDescription, CrocoTypeDescriptionResult } from "../../models";
import { DartEnumTypeDescriptor } from "./DartEnumTypeDescriptor";
import { DartTypeMapper } from "./DartTypeMapper";

export class DartFromJsonMethodGenerator {
    static generateFromJsonFactoryMethod(dartTypeName: string, propNames: string[],
        props: CrocoPropertyReferenceDescription[],
        wholeModel: CrocoTypeDescriptionResult): string {

            var result = `\tfactory ${dartTypeName}.fromJson(Map<String, dynamic> json) =>\n`;
        result += `\t ${dartTypeName}(\n`;

        for (let i = 0; i < propNames.length; i++) {

            let propTypeDescription = wholeModel.types
                .find(x => x.typeDisplayFullName === props[i].typeDisplayFullName);

            if (propTypeDescription.arrayDescription.isArray) {
                result += DartFromJsonMethodGenerator.FromArrayPropGeneration(propTypeDescription, wholeModel, propNames[i]);
            }
            else if (propTypeDescription.isClass) {
                result += `\t\t${propNames[i]}: json["${propNames[i]}"] != null? ${propTypeDescription.typeName}?.fromJson(json["${propNames[i]}"]) : null,\n`
            }
            else if(propTypeDescription.isEnumeration) {
                result += `\t\t${propNames[i]}: ` + DartEnumTypeDescriptor.getGenerateFromVariableCall(propTypeDescription, `json["${propNames[i]}"]`) + ",\n";
            }
            else if(propTypeDescription.isPrimitive){

                if(propTypeDescription.typeDisplayFullName === "System.DateTime"){
                    result += `\t\t${propNames[i]}: DateTime.parse(json["${propNames[i]}"]),\n`;
                }
                else if(propTypeDescription.typeDisplayFullName === "System.DateTime?"){
                    result += `\t\t${propNames[i]}: json["${propNames[i]}"] != null?  DateTime?.parse(json["${propNames[i]}"]) : null,\n`;
                }
                else {
                    result += `\t\t${propNames[i]}: json["${propNames[i]}"],\n`;
                }
            }
            else{
                result += `\t\tNot Supported Property ${propTypeDescription.typeDisplayFullName}\n`
            }
        }

        result += `\t);\n`;

        return result;
    }

    static FromArrayPropGeneration(propTypeDescription: CrocoTypeDescription, wholeModel: CrocoTypeDescriptionResult, propName: string) {
        var enumeratedTypeDisplayFullName = propTypeDescription.arrayDescription.elementDiplayFullTypeName;

        var enumeratedType = wholeModel.types
            .find(x => x.typeDisplayFullName === enumeratedTypeDisplayFullName);

        var typeName = DartTypeMapper.getPropertyTypeDartName(enumeratedType);

        if (enumeratedType.isClass) {
            return `\t\t${propName}: List<${typeName}>.from(json["${propName}"].map((x) => ${typeName}.fromJson(x))),\n`;
        }
        else if(enumeratedType.isEnumeration){
            return `\t\t${propName}: List<${typeName}>.from(json["${propName}"].map((x) => ${DartEnumTypeDescriptor.getGenerateFromVariableCall(enumeratedType, "x")})),\n`;
        }
        else if (enumeratedType.isPrimitive) {

            if(enumeratedType.typeDisplayFullName === "System.DateTime"){
                return `\t\t${propName}: List<${typeName}>.from(json["${propName}"].map((x) => DateTime.parse(x))),\n`;
            }
            else if(enumeratedType.typeDisplayFullName === "System.DateTime?"){
                return `\t\t${propName}: List<${typeName}>.from(json["${propName}"].map((x) => DateTime?.parse(x))),\n`;
            }

            return `\t\t${propName}: List<${typeName}>.from(json["${propName}"].map((x) => x)),\n`;
        }

        return "\t\tNotSupported\n";
    }
}
