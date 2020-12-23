export declare interface ClazzInfo {
  clazz?: any;
  name: string;
  path: string;
  methodMap: Map<string, MethodInfo>;
}

export declare interface MethodInfo {
  name: string;
  paths: PathObject[];
  args: {
    argDecorator: any;
    argProps: any;
    argIndex: any;
  }[];
  inside?: any;
}

export declare interface PathObject {
  path: string;
  methodTypes?: string[];
}

export declare interface ControllerInfo {
  clazzName?: string;
  rootPath?: string;
  path?: string;
  methodTypes?: string[];
  inside?: any;
  argDecorator?: any;
  argProps?: any;
  argIndex?: any;
}
