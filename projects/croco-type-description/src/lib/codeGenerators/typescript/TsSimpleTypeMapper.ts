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

    static GetPropertyType(typeDescription: CrocoTypeDescription): string {

        if(typeDescription.isEnumeration && typeDescription.isNullable){
            var name = TsSimpleTypeMapper.ExtractName(typeDescription.typeDisplayFullName.replace("?", ""));

            return `${name} | null`;
        }

        return TsSimpleTypeMapper.GetPropertyTypeByTypeDisplayName(typeDescription.typeDisplayFullName);
    }
    static GetPropertyTypeByTypeDisplayName(typeDisplayName: string): string {

        let name = TsSimpleTypeMapper.ExtractName(typeDisplayName);

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

    static ExtractName(name: string): string {

        const d = name.split('.');

        return d[d.length - 1];
    }
}
