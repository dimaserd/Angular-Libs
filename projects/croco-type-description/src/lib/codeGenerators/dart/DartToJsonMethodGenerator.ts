import { CrocoPropertyReferenceDescription, CrocoTypeDescriptionResult } from "../../models";
import { DartEnumTypeDescriptor } from "./DartEnumTypeDescriptor";

export class DartToJsonMethodGenerator{
    static GenerateToJsonMethod(propNames: string[],
        props: CrocoPropertyReferenceDescription[],
        wholeModel: CrocoTypeDescriptionResult):string{

        var result = '\tMap<String, dynamic> toJson() => {\n';

        for(let i = 0; i < propNames.length; i++){

            let propTypeDescription = wholeModel.types
                .find(x => x.typeDisplayFullName === props[i].typeDisplayFullName);

            if(propTypeDescription.fullTypeName === "System.DateTime?"){
                result += `\t\t'${propNames[i]}': ${propNames[i]}?.toIso8601String(),\n`;
            }
            if(propTypeDescription.fullTypeName === "System.DateTime"){
                result += `\t\t'${propNames[i]}': ${propNames[i]}.toIso8601String(),\n`;
            }
            else if(propTypeDescription.isClass){
                result += `\t\t'${propNames[i]}': ${propNames[i]}?.toJson(),\n`
            }
            else if(propTypeDescription.arrayDescription.isArray){
                var description = wholeModel.types.find(x => x.typeDisplayFullName === propTypeDescription.arrayDescription.elementDiplayFullTypeName);
                if(description.isEnumeration){
                    var generatorName = DartEnumTypeDescriptor.GetGeneratorClassName(description);
                    result += `\t\t'${propNames[i]}': ${propNames[i]}?.map((e) => ${generatorName}.enumToString(e)).toList(),\n`;
                }
                else if(description.isClass){
                    result += `\t\t'${propNames[i]}': ${propNames[i]}?.map((e) => e.toJson()).toList(),\n`
                }
                else{
                    result += `\t\t'${propNames[i]}': ${propNames[i]}?.toJson(),\n`;
                }
            }
            else{
                result += `\t\t'${propNames[i]}': ${propNames[i]},\n`;
            }
        }

        result +='\t};';

        return result;
    }
}
