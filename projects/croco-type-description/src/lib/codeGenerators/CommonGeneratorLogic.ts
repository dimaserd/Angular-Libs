import { CrocoTypeDescription, CrocoTypeDescriptionResult } from "../models";

export class CommonGeneratorLogic{
    private static simpleTypes = ["String", "Int32", "Int64", "Decimal", "Boolean", "DateTime"];

    public static GetUniqueTypes(typeDescription: CrocoTypeDescriptionResult): Array<CrocoTypeDescription> {

        const typeNamesToIgnore = ["System.Object"];

        return typeDescription.types.filter(x => !x.isPrimitive)
            .filter(x => !typeNamesToIgnore.includes(x.typeDisplayFullName));
    }

    public static isSimple(type: string):boolean{
        return this.simpleTypes.indexOf(type) >= 0;
    }
}
