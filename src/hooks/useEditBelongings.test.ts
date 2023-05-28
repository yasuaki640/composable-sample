import { describe, expect, it, vi } from "vitest";
import { useEditBelongings } from "@/hooks/useEditBelongings";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe("useEditBelongings", () => {
  beforeEach(async () => {
    vi.resetAllMocks();
  });

  it("useEditBelongingsがcallされれば、初期値呼び出しapiがcallされる", async () => {
    const mockedFetch = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(
        new Response(
          '[{"id":"408d9383-b6b6-4571-81f8-d0323b51c0f5","name":"Mac"},{"id":"10317456-5d94-41dd-adb6-8ff85d5a36fe","name":"Thinkpad (Arch Linux installed)"}]'
        )
      );

    const { belongings, loading } = useEditBelongings();

    expect(mockedFetch).toBeCalledWith(import.meta.env.VITE_API_DOMAIN + "/belongings");

    while (loading.value) {
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

  it("callされれば、初期値呼び出し中はloadingがtrueとなる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        '[{"id":"408d9383-b6b6-4571-81f8-d0323b51c0f5","name":"Mac"},{"id":"10317456-5d94-41dd-adb6-8ff85d5a36fe","name":"Thinkpad (Arch Linux installed)"}]'
      )
    );

    const { loading } = useEditBelongings();

    expect(loading.value).toBe(true);

    while (loading.value) {
      await sleep(1);
    }

    expect(loading.value).toBe(false);
  });

  it("初期値呼び出し中にエラーが発生した場合、alertが表示される", async () => {
    const mockedFetch = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(
        new Response(
          '[{"id":"408d9383-b6b6-4571-81f8-d0323b51c0f5","name":"Mac"},{"id":"10317456-5d94-41dd-adb6-8ff85d5a36fe","name":"Thinkpad (Arch Linux installed)"}]'
        )
      );

    const mockedAlert = vi.spyOn(global, "alert");
    mockedFetch.mockRejectedValue(new Error("mocked error"));

    const { loading } = useEditBelongings();
    while (loading.value) {
      await sleep(1);
    }

    expect(mockedAlert).toBeCalledWith(new Error("mocked error"));

    mockedAlert.mockRestore();
  });

  it("指定したidのbelongingが削除できる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        '[{"id":"408d9383-b6b6-4571-81f8-d0323b51c0f5","name":"Mac"},{"id":"10317456-5d94-41dd-adb6-8ff85d5a36fe","name":"Thinkpad (Arch Linux installed)"}]'
      )
    );

    const { belongings, loading, removeBelonging } = useEditBelongings();
    while (loading.value) {
      await sleep(1);
    }

    removeBelonging("408d9383-b6b6-4571-81f8-d0323b51c0f5");

    expect(belongings.value).toEqual([
      {
        id: "10317456-5d94-41dd-adb6-8ff85d5a36fe",
        name: "Thinkpad (Arch Linux installed)"
      }
    ]);
  });

  it("nameInputに入力した値をappendBelongingで追加できる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        '[{"id":"408d9383-b6b6-4571-81f8-d0323b51c0f5","name":"Mac"},{"id":"10317456-5d94-41dd-adb6-8ff85d5a36fe","name":"Thinkpad (Arch Linux installed)"}]'
      )
    );

    const { belongings, loading, nameInput, appendBelonging } = useEditBelongings();

    while (loading.value) {
      await sleep(1);
    }

    nameInput.value = "iPhone";
    appendBelonging();

    expect(belongings.value).toContainEqual({
      id: expect.any(String),
      name: "iPhone"
    });

    expect(nameInput.value).toBe("");
  });

  it("nameInputに何も入力されていない場合、appendBelongingで追加できない", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        '[{"id":"408d9383-b6b6-4571-81f8-d0323b51c0f5","name":"Mac"},{"id":"10317456-5d94-41dd-adb6-8ff85d5a36fe","name":"Thinkpad (Arch Linux installed)"}]'
      )
    );

    const { belongings, loading, nameInput, appendBelonging } = useEditBelongings();

    while (loading.value) {
      await sleep(1);
    }

    nameInput.value = "";
    appendBelonging();

    expect(belongings.value).toStrictEqual([
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

  it("submitEditが呼ばれたらloadingがfalseになる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        '[{"id":"408d9383-b6b6-4571-81f8-d0323b51c0f5","name":"Mac"},{"id":"10317456-5d94-41dd-adb6-8ff85d5a36fe","name":"Thinkpad (Arch Linux installed)"}]'
      )
    );
    vi.spyOn(global, "alert").mockReturnValue();

    const { loading, submitEdit } = useEditBelongings();

    while (loading.value) {
      await sleep(1);
    }

    submitEdit();
    expect(loading.value).toBe(false);
  });

  it("submitEditが呼ばれたらbelongingsが空になる", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        '[{"id":"408d9383-b6b6-4571-81f8-d0323b51c0f5","name":"Mac"},{"id":"10317456-5d94-41dd-adb6-8ff85d5a36fe","name":"Thinkpad (Arch Linux installed)"}]'
      )
    );
    vi.spyOn(global, "alert").mockReturnValue();

    const { belongings, loading, submitEdit } = useEditBelongings();

    while (loading.value) {
      await sleep(1);
    }
    submitEdit();

    expect(belongings.value).toStrictEqual([]);
  });
});
