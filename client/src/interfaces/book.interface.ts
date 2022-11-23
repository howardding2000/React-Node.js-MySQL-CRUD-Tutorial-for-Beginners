export interface Book {
  id: number | undefined;
  title: string;
  desc: string;
  price: number;
  cover?: string;
}
