import { Income } from "./income.interface"

export interface Incomes {
    registrationDate: Date
    description: string,
    reccurence: boolean,
    income_category: Income,
    incomeCategoryId: number
}