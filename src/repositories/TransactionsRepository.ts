import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsRepositoryDTO {
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
    const income = this.transactions
      .map(transaction =>
        transaction.type === 'income' ? transaction.value : 0,
      )
      .reduce((acc, value) => acc + value);
    const outcome = this.transactions
      .map(transaction =>
        transaction.type === 'outcome' ? transaction.value : 0,
      )
      .reduce((acc, value) => acc + value);
    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({
    title,
    value,
    type,
  }: TransactionsRepositoryDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
