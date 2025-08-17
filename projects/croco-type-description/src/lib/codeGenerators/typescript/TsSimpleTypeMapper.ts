import { CrocoTypeDescription } from "../../models";

export class TsSimpleTypeMapper {
    static typesDictionary = new Map<string, string>()
        .set("String", "string")
        .set("Int32", "number")
        .set("Int64", "number")
        .set("Decimal", "number")
        .set("Double", "number")
        .set("Boolean", "boolean")
        .set("DateTime", "string")
        .set("Guid", "string");

    static getPropertyType(typeDescription: CrocoTypeDescription): string {

        if(typeDescription.isEnumeration && typeDescription.isNullable){
            var name = TsSimpleTypeMapper.extractName(typeDescription.typeDisplayFullName.replace("?", ""));

            return `${name} | null`;
        }

        return TsSimpleTypeMapper.getPropertyTypeByTypeDisplayName(typeDescription.typeDisplayFullName);
    }

    static getPropertyTypeByTypeDisplayName(typeDisplayName: string): string {

        let name = TsSimpleTypeMapper.extractName(typeDisplayName);

        let isNullable = name.endsWith('?');

        name = name.replace('?', '');

        var result = TsSimpleTypeMapper.getJsTypeName(name);

        if(isNullable){
            result += " | null";
        }

        return result;
    }

    static getJsTypeName(cSharpName: string) : string{

        return TsSimpleTypeMapper.typesDictionary.get(cSharpName);
    }

    static extractName(name: string): string {

        const d = name.split('.');

        return d[d.length - 1];
    }
}
