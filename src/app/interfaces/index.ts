export interface BulkDomainSearchResponse {
  [domain: string]: boolean;
}

export interface ConfirmedSearchQuery {
  query: string;
  selectedDomains: string[];
}
