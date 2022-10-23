import { CrocoTypeDescription } from "../../models";

export class DartTypeMapper {
    static typesDictionary = new Map<string, string>()
        .set("System.String", "String?")
        .set("System.Int32", "int")
        .set("System.Int64", "int64")
        .set("System.Decimal", "double")
        .set("System.Double", "double")
        .set("System.Boolean", "bool")
        .set("System.DateTime", "DateTime")
        .set("System.Guid", "String");

    static GetPropertyTypeDartName(typeDescription: CrocoTypeDescription): string {

        if(typeDescription.isNullable && typeDescription.isEnumeration){
            return DartTypeMapper.ExtractName(typeDescription.typeDisplayFullName);
        }

        if(typeDescription.isClass || typeDescription.isEnumeration){
            return typeDescription.typeName;
        }

        let isNullable = typeDescription.isNullable;

        let typeDisplayName = typeDescription.typeDisplayFullName.replace('?', '');

        var result = DartTypeMapper.typesDictionary.get(typeDisplayName);

        if (isNullable) {
            result += "?";
        }
        return result;
    }

    static ExtractName(name: string): string {

        const d = name.split('.');

        return d[d.length - 1];
    }
}
