// TODO(Leander): Figure out a way to share this file with the backend-ts
export type Organization = {
  id: number;
  name: string;
  slug: string;
  externalSlug?: string;
};

export type ExampleType = {
  textOne: string;
  accentOne: string;
  textTwo?: string;
  accentTwo?: string;
}
