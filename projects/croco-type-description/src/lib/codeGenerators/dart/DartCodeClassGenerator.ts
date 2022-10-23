import { CrocoTypeDescription, CrocoTypeDescriptionResult } from "../../models";
import { CommonGeneratorLogic } from "../CommonGeneratorLogic";
import { GeneratedData } from "../GeneratedData";
import { TSClassGenerator } from "../typescript/TSClassGenerator";
import { DartEnumTypeDescriptor } from "./DartEnumTypeDescriptor";
import { DartFromJsonMethodGenerator } from "./DartFromJsonMethodGenerator";
import { DartTypeMapper } from "./DartTypeMapper";
import { DartToJsonMethodGenerator } from "./DartToJsonMethodGenerator";

export class DartCodeClassGenerator{

    public GenerateClassesForType(typeDescriptionResult: CrocoTypeDescriptionResult): string {

        return CommonGeneratorLogic.GetUniqueTypes(typeDescriptionResult)
            .map(x => this.GenerateTypeInterface(x, typeDescriptionResult))
            .filter(x => x.IsGenerated)
            .map(x => x.GeneratedText)
            .join("\n\n\n");
    }

    GenerateTypeInterface(typeDescription: CrocoTypeDescription, wholeModel: CrocoTypeDescriptionResult): GeneratedData {

        if(typeDescription.isEnumeration && typeDescription.isNullable){
            return {
                IsGenerated: false,
                GeneratedText: ""
            };
        }
        if (typeDescription.isEnumeration) {
            return {
                IsGenerated: true,
                GeneratedText: DartEnumTypeDescriptor.GetEnum(typeDescription)
            }
        }

        if (typeDescription.isClass) {

            let result: string = "";

            var dartTypeName = TSClassGenerator.GetDeclarationDisplayName(typeDescription);

            result += `class ${dartTypeName}\n`;
            result += '{\n'

            var propNames:string[] = []

            for (let i = 0; i < typeDescription.properties.length; i++) {

                const prop = typeDescription.properties[i];

                result += '\tlate '
                var propName = this.GetPropName(prop.propertyDescription.propertyName);
                propNames.push(propName);

                var propTypeDescription = wholeModel.types.find(x => x.typeDisplayFullName === prop.typeDisplayFullName);
                if (propTypeDescription.arrayDescription.isArray) {

                    var enumeratedType = wholeModel.types.find(x => x.typeDisplayFullName === propTypeDescription.arrayDescription.elementDiplayFullTypeName)
                    result += `List<${DartCodeClassGenerator.GetTypeDisplayName(enumeratedType)}>? ${propName};\n`;

                    continue;
                }

                if (propTypeDescription.isClass) {
                    result += `${DartCodeClassGenerator.GetTypeDisplayName(propTypeDescription)}? ${propName};\n`;

                    continue;
                }

                if( propTypeDescription.isEnumeration){
                    result += `${DartCodeClassGenerator.GetTypeDisplayName(propTypeDescription)} ${propName};\n`;

                    continue;
                }

                result += `${DartCodeClassGenerator.GetTypeDisplayName(propTypeDescription)} ${propName}; \n`;
            }

            result+= "\n";
            result += this.GenerateConstructor(dartTypeName, propNames);
            result+= "\n";
            result += DartFromJsonMethodGenerator.GenerateFromJsonFactoryMethod(dartTypeName, propNames, typeDescription.properties, wholeModel);
            result += "\n";
            result += DartToJsonMethodGenerator.GenerateToJsonMethod(propNames, typeDescription.properties, wholeModel);
            result += "\n";
            result += "}";

            return { IsGenerated: true, GeneratedText: result };
        }

        return { IsGenerated: false, GeneratedText: null};
    }

    GenerateConstructor(dartTypeName: string, propNames: string[]):string{
        var result = `\t${dartTypeName}({\n`;

        for(let i = 0; i < propNames.length; i++){
            result += `\t\trequired this.${propNames[i]},\n`
        }
        result += `\t});\n`;

        return result;
    }

    GetPropName(propName: string): string{
        return propName[0].toLowerCase() + propName.substr(1);
    }

    static GetTypeDisplayName(data:CrocoTypeDescription){
        return DartTypeMapper.GetPropertyTypeDartName(data);
    }


}
