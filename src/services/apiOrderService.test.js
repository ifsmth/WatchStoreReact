import { afterEach, expect, test, vi } from "vitest";
import { createApiOrderService } from "./apiOrderService.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("відхиляє HTTP 404 замість удаваного успіху", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValue(new Response(null, { status: 404 }));
  vi.stubGlobal("fetch", fetchMock);
  const service = createApiOrderService();

  await expect(service.getById("missing")).rejects.toMatchObject({
    code: "NOT_FOUND",
    status: 404,
  });
});

test("після DELETE 204 не намагається читати JSON", async () => {
  const response = new Response(null, { status: 204 });
  const readJson = vi.spyOn(response, "json");
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal("fetch", fetchMock);
  const service = createApiOrderService();

  await expect(service.delete("ord-test-001")).resolves.toBeUndefined();
  expect(readJson).not.toHaveBeenCalled();
});

test.each([
  {
    label: "неправильна оболонка (об'єкт замість масиву)",
    body: { items: [] },
  },
  { label: "рядок замість масиву", body: "invalid-payload" },
])("відхиляє несумісну структуру: $label", async ({ body }) => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
  const service = createApiOrderService();

  await expect(service.getAll()).rejects.toMatchObject({ code: "BAD_DATA" });
});
