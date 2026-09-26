import clientApi from "./_clientApi.js";

export async function taskUpdateApi(taskId, updates) {
    const { data } = await clientApi.put(`/me/tasks/${taskId}`, updates);

    return data;
}
