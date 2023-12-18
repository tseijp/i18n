export interface I18NConfig<
  Lng extends string = string,
  Ids extends string = string,
> extends Partial<I18N<Lng, Ids>> {
  resources?: {
    [key in Lng]: {
      translation: { [key in Ids]: string; };
    };
  };
}

export interface I18N<
  Lng extends string = string,
  Ids extends string = string,
> {
  get lng(): Lng;
  t(id: Ids): string | undefined;
  init(options: I18NConfig<Lng, Ids>): void;
  change(lng: Lng): void;
}