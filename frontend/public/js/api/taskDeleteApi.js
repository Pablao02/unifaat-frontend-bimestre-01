import clientApi from "./_clientApi.js";

export async function taskDeleteApi(taskId) {
    const { data } = await clientApi.delete(`/me/tasks/${taskId}`);

    return data;
}