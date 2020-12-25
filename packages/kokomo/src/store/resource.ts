declare type ResourceClazzMapValue = [{ new (...args: any[]): any }, any[]];

const ResourceClazzMap = new Map<string, ResourceClazzMapValue>();

function setResourceClazz(resourceName: string, resource: { new (...args: any[]): any }, props: any[]): void {
  ResourceClazzMap.set(resourceName, [resource, props]);
}
function getResourceClazz(resourceName: string): ResourceClazzMapValue {
  return ResourceClazzMap.get(resourceName)!;
}

export default {
  setResourceClazz,
  getResourceClazz,
};
