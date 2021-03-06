import { ResourceClazzStore } from "../store";
import { isString, isUndefined } from "../utils";
import debugCreater from "debug";

const debug = debugCreater("kokomo:@Inject");
/**
 * 注入依赖
 * @param resource 依赖名称或者参数
 */
export function Inject(resource: string | { new (...props: any[]): any }, ...props: any[]): any {
  return function inject(_: { new (...props: any[]): any }, property: string, desc: PropertyDescriptor): any {
    const resourceName = isString(resource) ? resource : resource.name;

    if (!isUndefined(desc)) {
      throw new Error(`Please check @Inject(${resourceName})/${property} used on Class's property.`);
    }
    debug(`[@Inject] ===> find property decorator @Inject("${resourceName}")`);
    return {
      get() {
        const [resourceClass, provideProps] = ResourceClazzStore.getResourceClazz(resourceName);
        if (!resourceClass) throw new Error(`Please check ${resource}.*.ts is exists.`);
        const instance =
          props.length > 0 ? Reflect.construct(resourceClass, props) : Reflect.construct(resourceClass, provideProps);
        return instance;
      },
    };
  };
}
