import { isMockData } from "./dataSource.js";
import { mockOrderService } from "./mockOrderService.js";
import { createApiOrderService } from "./apiOrderService.js";

export const orderService = isMockData
  ? mockOrderService
  : createApiOrderService();
