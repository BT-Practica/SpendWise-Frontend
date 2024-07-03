import { Income } from "./income.interface"

export interface Incomes {
    registrationDate: Date
    description: string,
    reccurence: boolean,
    amount: number,
    income_category: string,
    incomeCategoryId: number
}