const Role = {
  USER: 'user',
  ADMIN: 'admin'
} as const;
type Role = (typeof Role)[keyof typeof Role];

export type User = {
  id: number,
  username: string,
  email: string,
  password: string,
  role: Role,
  created_at: Date
}
