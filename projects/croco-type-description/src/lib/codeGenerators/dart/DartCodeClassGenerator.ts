import { CrocoTypeDescription, CrocoTypeDescriptionResult } from "../../models";
import { CommonGeneratorLogic } from "../CommonGeneratorLogic";
import { GeneratedData } from "../GeneratedData";
import { TSClassGenerator } from "../typescript/TSClassGenerator";
import { DartEnumTypeDescriptor } from "./DartEnumTypeDescriptor";
import { DartFromJsonMethodGenerator } from "./DartFromJsonMethodGenerator";
import { DartTypeMapper } from "./DartTypeMapper";
import { DartToJsonMethodGenerator } from "./DartToJsonMethodGenerator";

export class DartCodeClassGenerator {

    public generateClassesForType(typeDescriptionResult: CrocoTypeDescriptionResult): string {

        return CommonGeneratorLogic.GetUniqueTypes(typeDescriptionResult)
            .map(x => this.generateTypeInterface(x, typeDescriptionResult))
            .filter(x => x.IsGenerated)
            .map(x => x.GeneratedText)
            .join("\n\n\n");
    }

    generateTypeInterface(typeDescription: CrocoTypeDescription, wholeModel: CrocoTypeDescriptionResult): GeneratedData {

        if (typeDescription.isEnumeration && typeDescription.isNullable) {
            return {
                IsGenerated: false,
                GeneratedText: ""
            };
        }
        if (typeDescription.isEnumeration) {
            return {
                IsGenerated: true,
                GeneratedText: DartEnumTypeDescriptor.getEnum(typeDescription)
            }
        }

        if (typeDescription.isClass) {

            let result: string = "";

            var dartTypeName = TSClassGenerator.getDeclarationDisplayName(typeDescription);

            result += `class ${dartTypeName}\n`;
            result += '{\n'

            var propNames: string[] = []

            for (let i = 0; i < typeDescription.properties.length; i++) {

                const prop = typeDescription.properties[i];

                result += '\tlate '
                var propName = this.getPropName(prop.propertyDescription.propertyName);
                propNames.push(propName);

                var propTypeDescription = wholeModel.types.find(x => x.typeDisplayFullName === prop.typeDisplayFullName);
                if (propTypeDescription.arrayDescription.isArray) {

                    var enumeratedType = wholeModel.types.find(x => x.typeDisplayFullName === propTypeDescription.arrayDescription.elementDiplayFullTypeName)
                    result += `List<${DartCodeClassGenerator.getTypeDisplayName(enumeratedType)}>? ${propName};\n`;

                    continue;
                }

                if (propTypeDescription.isClass) {
                    result += `${DartCodeClassGenerator.getTypeDisplayName(propTypeDescription)}? ${propName};\n`;

                    continue;
                }

                if (propTypeDescription.isEnumeration) {
                    result += `${DartCodeClassGenerator.getTypeDisplayName(propTypeDescription)} ${propName};\n`;

                    continue;
                }

                result += `${DartCodeClassGenerator.getTypeDisplayName(propTypeDescription)} ${propName}; \n`;
            }

            result += "\n";
            result += this.generateConstructor(dartTypeName, propNames);
            result += "\n";
            result += DartFromJsonMethodGenerator.generateFromJsonFactoryMethod(dartTypeName, propNames, typeDescription.properties, wholeModel);
            result += "\n";
            result += DartToJsonMethodGenerator.generateToJsonMethod(propNames, typeDescription.properties, wholeModel);
            result += "\n";
            result += "}";

            return { IsGenerated: true, GeneratedText: result };
        }

        return { IsGenerated: false, GeneratedText: null };
    }

    generateConstructor(dartTypeName: string, propNames: string[]): string {
        var result = `\t${dartTypeName}({\n`;

        for (let i = 0; i < propNames.length; i++) {
            result += `\t\trequired this.${propNames[i]},\n`
        }
        result += `\t});\n`;

        return result;
    }

    getPropName(propName: string): string {
        return propName[0].toLowerCase() + propName.substr(1);
    }

    static getTypeDisplayName(data: CrocoTypeDescription) {
        return DartTypeMapper.getPropertyTypeDartName(data);
    }
}
