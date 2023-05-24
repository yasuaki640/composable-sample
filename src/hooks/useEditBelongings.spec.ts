import { describe, expect, it, type SpyInstance, vi } from "vitest";
import { useEditBelongings } from "@/hooks/useEditBelongings";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe("useEditBelongings", () => {
  let mockedFetch: SpyInstance;
  beforeEach(async () => {
    mockedFetch = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(
        new Response(
          '[{"id":"408d9383-b6b6-4571-81f8-d0323b51c0f5","name":"Mac"},{"id":"10317456-5d94-41dd-adb6-8ff85d5a36fe","name":"Thinkpad (Arch Linux installed)"}]'
        )
      );
  });

  it("useEditBelongingsがcallされれば、初期値呼び出しapiがcallされる", async () => {
    const { belongings } = useEditBelongings();

    expect(mockedFetch).toBeCalledWith(import.meta.env.VITE_API_DOMAIN + "/belongings");

    // wait api call
    while (!belongings.value.length) {
      await sleep(1);
    }

    expect(belongings.value).toEqual([
      {
        id: "408d9383-b6b6-4571-81f8-d0323b51c0f5",
        name: "Mac"
      },
      {
        id: "10317456-5d94-41dd-adb6-8ff85d5a36fe",
        name: "Thinkpad (Arch Linux installed)"
      }
    ]);
  });
});
