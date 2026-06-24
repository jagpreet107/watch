export interface Watch {
  id: string;
  name: string;
  price: string;
  rawPrice: number;
  image: string;
  type: string;
  collection: 'heritage' | 'curated' | 'classic' | 'modern';
  tag?: string;
  newRelease?: boolean;
  specifications: {
    caseDiameter: string;
    movement: string;
    crystal: string;
    waterResistance: string;
  };
  story: string;
  gallery: string[];
}

export interface CartItem {
  watch: Watch;
  quantity: number;
}

export interface InquiryFormState {
  fullName: string;
  email: string;
  interest: string;
  message?: string;
}
