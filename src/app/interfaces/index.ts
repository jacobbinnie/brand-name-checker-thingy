export interface BulkDomainSearchResponse {
  [domain: string]: boolean;
}

export interface ConfirmedSearchQuery {
  query: string;
  selectedDomains: string[];
}

type TrademarkOwner = {
  index: number;
  owner_type: string;
  owner_label: string;
  legal_entity_type: string;
  legal_entity_type_label: string;
  name: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  country: string;
  postcode: string;
};

export type TrademarkItem = {
  keyword: string;
  registration_number: string;
  serial_number: string;
  status_label: string;
  status_code: string;
  status_date: string;
  status_definition: string;
  filing_date: string;
  registration_date: string;
  abandonment_date: string | null;
  expiration_date: string;
  description: string;
  owners: TrademarkOwner[];
};

export type TrademarkSchema = {
  count: number;
  items: TrademarkItem[];
};
