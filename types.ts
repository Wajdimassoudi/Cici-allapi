
export interface API {
  id: string;
  name: string;
  category: string;
  endpoint: string;
  desc: string;
  method?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Stats {
  totalApis: number;
  totalCategories: number;
  activeUsers: string;
  monthlyEarnings: string;
}
