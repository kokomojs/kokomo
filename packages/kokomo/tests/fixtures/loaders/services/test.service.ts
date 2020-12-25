import { BaseService } from "../../../../src";
class TestService extends BaseService {
  returnFrameName(): string {
    return `Hi, TestService!`;
  }
}
export default TestService;
