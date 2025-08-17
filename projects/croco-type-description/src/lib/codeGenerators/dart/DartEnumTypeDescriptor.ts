import { CrocoTypeDescription } from "../../models";
import { DartTypeMapper } from "./DartTypeMapper";

export class DartEnumTypeDescriptor{

    public static getEnumName(typeDescription: CrocoTypeDescription):string{
        return typeDescription.typeName;
    }

    public static getEnum(typeDescription: CrocoTypeDescription): string {
        if (!typeDescription.isEnumeration) {
            throw new Error("Данный тип не является перечислением");
        }
        let enumName = DartEnumTypeDescriptor.getEnumName(typeDescription);
        let html = "";
        html += `enum ${enumName} {\n`;
        for (let i = 0; i < typeDescription.enumDescription.enumValues.length; i++) {
            const enumValue = typeDescription.enumDescription.enumValues[i];
            const comma = (i === typeDescription.enumDescription.enumValues.length - 1) ? "" : ",";
            html += `\t${enumValue.stringRepresentation}${comma}\n`;
        }
        html += `}\n`;

        html += "\n";
        html += this.GetGenerator(typeDescription);

        return html;
    }

    static GetGeneratorClassName(typeDescription: CrocoTypeDescription): string{
        return `${DartTypeMapper.getPropertyTypeDartName(typeDescription).replace("?", "")}DartJsonGenerator`;
    }

    static GetGenerator(typeDescription: CrocoTypeDescription) : string{
        const generatorName =DartEnumTypeDescriptor.GetGeneratorClassName(typeDescription);
        let enumName = DartEnumTypeDescriptor.getEnumName(typeDescription);

        let html = `class ${generatorName} {\n`; //class

        html += `\tstatic ${enumName} getFromString(String value) {\n`; //method getFromString
        html += `\t\treturn ${enumName}.values\n`;
        html += `\t\t\t.firstWhere((e) => e.toString() == '${enumName}.' + value);\n`;
        html += "\t}\n"; //method

        html += "\n";

        html += `\tstatic ${enumName}? getFromStringOrNull(String? value) {\n`; //method getFromStringOrNull
        html += "\t\treturn value == null\n";
        html += "\t\t\t? null\n";
        html += `\t\t\t: ${generatorName}.getFromString(value);\n`

        html += "\t}\n"; //method

        html += "\n";

        html += `\tstatic String enumToString(${enumName} value) {\n`;  //method enumToString
        html += `\t\treturn value.toString().replaceFirst('${enumName}.', "");\n`;
        html += "\t}\n"; //method

        html += "}\n"; //classs
        return html;
    }

    static getGenerateFromVariableCall(typeDescription: CrocoTypeDescription, variableRef: string) : string{
        const generatorName = DartEnumTypeDescriptor.GetGeneratorClassName(typeDescription);

        if(typeDescription.isEnumeration && typeDescription.isNullable){
            return `${generatorName}.getFromStringOrNull(${variableRef})`;
        }

        return `${generatorName}.getFromString(${variableRef})`;
    }
}
