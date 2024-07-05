import { Injectable } from '@angular/core';

export interface Tip {
  id: number;
  title: string;
  summary: string;
  details: string;
}

@Injectable({
  providedIn: 'root',
})
export class TipsService {
  private tips: Tip[] = [
    {
      id: 1,
      title: 'Set a Budget',
      summary: 'Creating a budget helps you manage your money effectively.',
      details: `Setting a budget is the cornerstone of financial health. By detailing your income and expenses, you can see exactly where your money is going and where you might be able to cut back. Start by listing all sources of income, then detail every regular expense. Categorize your spending to understand your habits better. With a budget in place, you can allocate funds towards savings, investments, or paying off debt more effectively. Regularly reviewing and adjusting your budget ensures that you stay on track with your financial goals.`,
    },
    {
      id: 2,
      title: 'Track Your Spending',
      summary: 'Tracking your expenses can help you identify areas where you can save money.',
      details: `Tracking your spending is an essential habit for gaining control over your finances. By keeping a daily record of every penny spent, you can identify patterns and areas where you may be overspending. Utilize apps or spreadsheets to log your expenses and categorize them. This practice helps in creating a clear picture of your financial behavior, making it easier to adjust your spending habits. Whether it’s reducing impulse purchases or cutting back on dining out, tracking expenses provides actionable insights to improve your financial health.`,
    },
    {
      id: 3,
      title: 'Build an Emergency Fund',
      summary: 'Having an emergency fund provides financial security for unexpected expenses.',
      details: `An emergency fund is a crucial part of a sound financial plan. It acts as a safety net, covering unexpected expenses such as medical emergencies, car repairs, or job loss. Aim to save at least three to six months’ worth of living expenses in a readily accessible account. Start small by setting aside a portion of your income each month and gradually build up your fund. Having this financial cushion reduces stress and ensures that you don’t have to rely on high-interest credit cards or loans in times of need.`,
    },
    {
      id: 4,
      title: 'Reduce Debt',
      summary: 'Lowering your debt can free up more of your income for savings and investments.',
      details: `Reducing debt is a vital step towards financial freedom. Begin by listing all your debts, including the interest rates and minimum payments. Prioritize paying off high-interest debts first, such as credit card balances, to reduce the amount of interest you pay over time. Consider using strategies like the debt snowball method, where you pay off smaller debts first to build momentum, or the debt avalanche method, focusing on the highest interest rates. Consistently making more than the minimum payments accelerates debt reduction, freeing up income for savings and investments.`,
    },
    {
      id: 5,
      title: 'Save for Retirement',
      summary: 'Investing in a retirement fund ensures you have enough savings for your future.',
      details: `Saving for retirement should be a priority, no matter your age. Start by taking advantage of employer-sponsored retirement plans, such as 401(k)s, especially if your employer offers matching contributions. Additionally, consider opening an IRA (Individual Retirement Account) to maximize your retirement savings. Aim to save at least 10-15% of your income for retirement. The power of compound interest means that the sooner you start saving, the more your money will grow over time. Regularly review your retirement goals and adjust contributions as needed to ensure a comfortable future.`,
    },
    {
      id: 6,
      title: 'Cut Utility Bills',
      summary: 'Reducing utility bills can save you a significant amount of money over time.',
      details: `Cutting utility bills is a straightforward way to reduce monthly expenses. Start by implementing energy-saving practices such as turning off lights when not in use, unplugging electronics, and using energy-efficient appliances. Installing a programmable thermostat can optimize heating and cooling usage, lowering costs. Additionally, consider weatherproofing your home to prevent heat loss in winter and keep it cooler in summer. Simple habits like taking shorter showers and fixing leaks promptly also contribute to lower water bills. Over time, these small changes add up to significant savings.`,
    }
  ];  

  getTips() {
    return this.tips;
  }

  getTip(id: number) {
    return this.tips.find(tip => tip.id === id);
  }
}
