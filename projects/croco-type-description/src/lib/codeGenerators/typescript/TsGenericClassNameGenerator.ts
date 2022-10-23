import { CrocoGenericTypeDescription } from "../../models";

export class TsGenericClassNameGenerator {
    public static generateName(model: CrocoGenericTypeDescription): string {
        let nameResult = model.typeNameWithoutGenericArgs;

        for (let index = 0; index < model.genericArgumentTypeNames.length; index++) {
            const element = model.genericArgumentTypeNames;

            nameResult += element;
        }

        return nameResult;
    }
}
