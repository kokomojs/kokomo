export declare interface KokomoAspect {
  before?(point: KokomoAspectPoint): void;
  after?(point: KokomoAspectPoint): void;
  around?(point: KokomoAspectAroundPoint): Promise<any>;
}

export declare interface KokomoAspectPoint<T = any> {
  args: any[];
  context: T;
}
export declare interface KokomoAspectAroundPoint extends KokomoAspectPoint {
  proceed(...props: any[]): Promise<any>;
}
