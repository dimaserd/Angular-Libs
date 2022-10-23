import { CrocoTypeDescriptionResult, CrocoTypeDescription, CrocoPropertyReferenceDescription } from "../../models";
import {TsSimpleTypeMapper} from "./TsSimpleTypeMapper"
import { TsEnumTypeDescriptor } from "./TsEnumTypeDescriptor";
import { GeneratedData } from "../GeneratedData";
import { CommonGeneratorLogic } from "../CommonGeneratorLogic";
import { TsGenericClassNameGenerator } from "./TsGenericClassNameGenerator";

export class TSClassGenerator {

    _useJsNamingStyle: boolean
    _useGenerics: boolean;

    constructor(useJsNamingStyle: boolean, useGenerics: boolean){
        this._useJsNamingStyle = useJsNamingStyle;
        this._useGenerics = useGenerics;
    }

    public static GetDescription(propReference: CrocoPropertyReferenceDescription): string {

        if (propReference.propertyDescription.descriptions.length > 0) {
            return `\t/* ${propReference.propertyDescription.descriptions[0]} */\n`;
        }

        return "";
    }

    static GetDeclarationDisplayName(typeDescription: CrocoTypeDescription){
        if (typeDescription.isGeneric) {
            return TsGenericClassNameGenerator.generateName(typeDescription.genericDescription);
        }

        return TsSimpleTypeMapper.ExtractName(typeDescription.typeDisplayFullName);
    }

    static GetTypeDisplayName(typeDescription: CrocoTypeDescription): string {

        if(typeDescription.isGeneric && typeDescription.isEnumeration){
            return TsSimpleTypeMapper.GetPropertyType(typeDescription);
        }

        if (typeDescription.isGeneric) {

            let genDescr = typeDescription.genericDescription;

            let genTypeTsNames = genDescr.genericArgumentTypeNames.map(x => {
                if (CommonGeneratorLogic.isSimple(x)) {
                    return TsSimpleTypeMapper.GetPropertyTypeByTypeDisplayName(x);
                }

                return x;
            });

            return `${genDescr.typeNameWithoutGenericArgs}<${genTypeTsNames.join(',')}>`;
        }

        return TsSimpleTypeMapper.ExtractName(typeDescription.typeDisplayFullName);
    }

    GetPropName(propName: string): string{
        if(this._useJsNamingStyle){
            return propName[0].toLowerCase() + propName.substr(1);
        }

        return propName;
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
                GeneratedText: TsEnumTypeDescriptor.GetEnum(typeDescription)
            }
        }

        if (typeDescription.isClass) {

            let result: string = "";

            result += `interface ${TSClassGenerator.GetDeclarationDisplayName(typeDescription)} {\n`;

            for (let i = 0; i < typeDescription.properties.length; i++) {

                const prop = typeDescription.properties[i];

                var propTypeDescription = wholeModel.types.find(x => x.typeDisplayFullName === prop.typeDisplayFullName);
                if (propTypeDescription.arrayDescription.isArray) {

                    var enumeratedType = wholeModel.types.find(x => x.typeDisplayFullName === propTypeDescription.arrayDescription.elementDiplayFullTypeName)
                    result += `${TSClassGenerator.GetDescription(prop)}\t ${this.GetPropName(prop.propertyDescription.propertyName)}: Array<${TSClassGenerator.GetEnumeratedDisplayTypeName(enumeratedType)}>; \n`;

                    continue;
                }

                if(propTypeDescription.isEnumeration && propTypeDescription.isNullable){
                    result += `${TSClassGenerator.GetDescription(prop)}\t ${this.GetPropName(prop.propertyDescription.propertyName)}: ${TSClassGenerator.GetTypeDisplayName(propTypeDescription)}; \n`;

                    continue;
                }

                if(propTypeDescription.isEnumeration){
                    result += `${TSClassGenerator.GetDescription(prop)}\t ${this.GetPropName(prop.propertyDescription.propertyName)}: ${TSClassGenerator.GetTypeDisplayName(propTypeDescription)}; \n`;

                    continue;
                }

                if (propTypeDescription.isClass) {
                    result += `${TSClassGenerator.GetDescription(prop)}\t ${this.GetPropName(prop.propertyDescription.propertyName)}: ${TSClassGenerator.GetTypeDisplayName(propTypeDescription)}; \n`;

                    continue;
                }

                result += `${TSClassGenerator.GetDescription(prop)}\t ${this.GetPropName(prop.propertyDescription.propertyName)}: ${TsSimpleTypeMapper.GetPropertyType(propTypeDescription)}; \n`;
            }

            result += "}";

            return { IsGenerated: true, GeneratedText: result };
        }

        return { IsGenerated: false, GeneratedText: null};
    }

    public static GetEnumeratedDisplayTypeName(typeDescription: CrocoTypeDescription) : string {
        if (typeDescription.isClass || typeDescription.isEnumeration) {
            return TsSimpleTypeMapper.ExtractName(typeDescription.typeDisplayFullName);
        }

        return TsSimpleTypeMapper.ExtractName(TsSimpleTypeMapper.GetPropertyType(typeDescription));
    }

    public GenerateClassesForType(typeDescriptionResult: CrocoTypeDescriptionResult): string {

        return CommonGeneratorLogic.GetUniqueTypes(typeDescriptionResult)
            .map(x => this.GenerateTypeInterface(x, typeDescriptionResult))
            .filter(x => x.IsGenerated)
            .map(x => x.GeneratedText)
            .join("\n\n\n");
    }
}
