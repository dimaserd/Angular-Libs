import { CrocoTypeDescription } from "../../models";

export class TsEnumTypeDescriptor {
    public static getEnum(typeDescription: CrocoTypeDescription): string {
        if (!typeDescription.isEnumeration) {
            throw new Error("Данный тип не является перечислением");
        }
        let html = "";
        html += `enum ${typeDescription.typeName} {\n`;
        for (let i = 0; i < typeDescription.enumDescription.enumValues.length; i++) {
            const enumValue = typeDescription.enumDescription.enumValues[i];
            const comma = (i === typeDescription.enumDescription.enumValues.length - 1) ? "" : ",";
            html += `\t${enumValue.stringRepresentation} = '${enumValue.stringRepresentation}'${comma}\n`;
        }
        html += `}\n`;
        return html;
    }
}
