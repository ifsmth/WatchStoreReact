import { expect, test } from "vitest";
import { selectOrders } from "./selectOrders.js";
import { testItem, savedOrder } from "../test/fixtures.js";

test("поєднує пошук і порядок без зміни джерела", () => {
  const records = Object.freeze([
    Object.freeze({
      ...savedOrder,
      id: "r-1",
      quantity: 4,
      customerName: "Олександр Шевченко",
    }),
    Object.freeze({
      ...savedOrder,
      id: "r-2",
      quantity: 1,
      customerName: "Іван Франко",
    }),
    Object.freeze({
      ...savedOrder,
      id: "r-3",
      quantity: 2,
      customerName: "Леся Українка",
    }),
  ]);

  const result = selectOrders(records, [testItem], {
    query: " франко ",
    sort: "quantity-asc",
  });

  expect(result.map((record) => record.id)).toEqual(["r-2"]);
  // Перевірка, що вихідний масив не мутовано
  expect(records.map((record) => record.id)).toEqual(["r-1", "r-2", "r-3"]);
});

test("сортує за кількістю (quantity-desc та quantity-asc)", () => {
  const records = [
    { ...savedOrder, id: "r-1", quantity: 1 },
    { ...savedOrder, id: "r-2", quantity: 5 },
    { ...savedOrder, id: "r-3", quantity: 3 },
  ];

  const asc = selectOrders(records, [testItem], { sort: "quantity-asc" });
  expect(asc.map((r) => r.quantity)).toEqual([1, 3, 5]);

  const desc = selectOrders(records, [testItem], { sort: "quantity-desc" });
  expect(desc.map((r) => r.quantity)).toEqual([5, 3, 1]);
});

test("відсутність збігів не видаляє початковий запис", () => {
  const records = [savedOrder];
  const result = selectOrders(records, [testItem], {
    query: "несумісний пошуковий текст 12345",
  });

  expect(result).toEqual([]);
  expect(records).toEqual([savedOrder]);
});
