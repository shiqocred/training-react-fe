export type Role = "admin" | "staff" | "customer";

export type TransactionType = "deposit" | "withdraw" | "transfer";

export type TransactionDirection = "in" | "out";

export type CustomerStatus = "active" | "inactive" | "blocked";

export type ApiSuccessResponse<T> = {
  data: T;
  status: boolean;
  message: string;
};

export type Pagination = {
  current_page: number;
  per_page: number;
  from: number;
  total: number;
  last_page: number;
};

export type ApiListResponse<T> = {
  data: {
    items: T[];
    pagination: Pagination;
  };
  status: boolean;
  message: string;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type AccountData = {
  account_number: string;
  balance: number;
};

export type MeData = UserData & {
  account: AccountData | null;
};

export type CustomerItem = {
  id: string;
  name: string;
  email: string;
  account_number: string;
  balance: number;
  status: CustomerStatus;
  created_at: string;
  updated_at: string;
};

export type StaffItem = {
  id: string;
  name: string;
  email: string;
  role: "staff";
  created_at: string;
};

export type MutationItem = {
  id: string;
  type: TransactionType;
  direction: TransactionDirection;
  amount: number;
  balance_before: number;
  balance_after: number;
  reference_id: string | null;
  note: string | null;
  actor_name: string;
  actor_role: Role;
  created_at: string;
};

export type AllMutationItem = MutationItem & {
  customer_id: string;
  customer_name: string;
};

export type CustomerDetailData = CustomerItem & {
  mutations: AllMutationItem[];
};

export type DashboardPoint = {
  date: string;
  income: number;
  outcome: number;
};

export type DashboardData = {
  total_customers: number;
  total_balance: number;
  total_income: number;
  total_outcome: number;
  chart: DashboardPoint[];
};

export type OperationData = {
  transaction_id?: string | null;
  reference_id: string | null;
  amount: number;
  balance: number;
};
