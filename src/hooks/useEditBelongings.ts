import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { type Belonging } from "@/types/belonging";

export const useEditBelongings = () => {
  const belongings = ref<Belonging[]>([]);
  const loading = ref(false);

  loading.value = true;
  fetch(import.meta.env.VITE_API_DOMAIN + "/belongings")
    .then((res) => res.json())
    .then((json) => {
      belongings.value = json;
    })
    .catch((e) => {
      alert(e);
    })
    .finally(() => {
      loading.value = false;
    });

  const removeBelonging = (id: string) => {
    belongings.value = belongings.value.filter((t) => t.id !== id);
  };

  const nameInput = ref("");
  const appendBelonging = () => {
    if (!nameInput.value) {
      return;
    }

    belongings.value.push({
      id: uuidv4(),
      name: nameInput.value
    });
    nameInput.value = "";
  };

  const submitEdit = () => {
    const json = JSON.stringify(belongings.value, null, 2);
    alert("Submitted belonging list is below : \n" + json);
    location.reload();
  };

  return {
    belongings,
    loading,
    removeBelonging,
    nameInput,
    appendBelonging,
    submitEdit
  };
};
