import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === 'income')
        return accumulator + currentValue.value;
      return accumulator;
    }, 0);

    const outcomeSum = this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === 'outcome')
        return accumulator + currentValue.value;
      return accumulator;
    }, 0);

    const total = incomeSum - outcomeSum;

    return { income: incomeSum, outcome: outcomeSum, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
