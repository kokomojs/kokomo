import { BaseService } from "kokomo";

class TestService extends BaseService {
  returnFrameName(): string {
    return "Kokomo.js";
  }
}
export default TestService;
