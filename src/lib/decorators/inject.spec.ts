import { ReflectInjectionError } from "../errors";
import { Inject } from "./inject";

describe("@Inject", () => {
  it("should throw notToken when token is not a NodeToken", () => {
    expect(() => {
      class _TestClass {
        constructor(@Inject("not-a-token" as any) public dep: any) {}
      }
    }).toThrow(ReflectInjectionError);
  });
});
