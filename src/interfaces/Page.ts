// src/interfaces/Page.ts

export interface SubPage {
  name: string;
  icon: string;
  path: string;
}

export interface Page {
  name: string;
  icon: string;
  path: string;
  subPages?: SubPage[];
}
