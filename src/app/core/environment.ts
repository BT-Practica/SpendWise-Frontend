export const environment = {
    baseUrl: "https://localhost:5000",
    api_login: "/api/Auth/Login",
    api_register: "/api/Auth/Register",

    //Currency endpoints
    api_currencies_get: "/api/Currencies", // /api/Currencies/{id}
    api_currencies : "/api/Currencies", // /api/Currencies 

    //Economy endpoints
    api_economy_get: "/api/GetEconomy",
    api_economies_get: "/api/GetEconomies",
    api_economy_add: "/api/AddEconomy",
    api_economy_delete: "/api/DeleteEconomy",

    //Expenses endpoints
    api_expenses_get: "/api/Expenses/GetExpenses",
    api_expenses_getByUser: "/api/Expenses/GetExpenseByUser",
    api_expenses_put: "/api/Expenses/AddExpense",
    api_expenses_delete: "/api/Expenses/RemoveExpense",

    //Expense_Categories endpoints
    api_expensecategories_get: "/api/Expense_Categories/GetExpenses",

    //Income categories endpoints
    api_incomeCategories_getIncomeCategories: "/api/Income_Categories/GetIncomeCategories",
    api_incomeCategories_getIncomeCategory: "/api/Income_Categories/GetIncomeCategory",
    api_incomeCategories_addIncomeCategory: "/api/Income_Categories/AddIncomeCategories",
    api_incomeCategories_deleteIncomeCategory: "/api/Income_Categories/DeleteIncomeCategories",

    //Income endpoints
    api_incomes_getIncomes: "/api/Incomes/GetIncomes",
    api_incomes_getIncomesByUserId: "/api/Incomes/GetIncomesByUserId",
    api_incomes_addIncome: "/api/Incomes/AddIncomes",
    api_incomes_put: "/api/Incomes/UpdateIncomes",
    api_incomes_delete: "/api/Incomes/DeleteIncomes",

    //User endpoints
    api_getUserData: "/api/Users/GetUser",
    api_users_updatePassword: '/api/Users/UpdatePassword',
    api_users_updateEmail: '/api/Users/UpdateEmail',
    api_users_updateCurrecy: '/api/Users/UpdateCurrency',
    api_users_deleteUser: '/api/Users/RemoveUser',
    api_users_forgotPassword: '/api/Users/ForgotPassword',
}