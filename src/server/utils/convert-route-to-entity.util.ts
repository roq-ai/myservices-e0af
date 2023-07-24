const mapping: Record<string, string> = {
  addresses: 'address',
  customers: 'customer',
  equipment: 'equipment',
  procedures: 'procedure',
  users: 'user',
  visits: 'visit',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
