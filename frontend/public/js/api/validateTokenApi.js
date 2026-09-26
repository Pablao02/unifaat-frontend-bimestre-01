import clientApi from "./_clientApi.js";

// Precisamos de um usu├írio dummy para validar, vamos usar o id do JWT decodificado
// Ou podemos criar um endpoint espec├¡fico de valida├º├úo
// Por enquanto vamos usar um valor gen├®rico j├í que o middleware valida pelo cookie

export async function validateTokenApi() {
    try {
        // Faz uma requisi├º├úo simples para validar o token (que est├í no cookie)
        // Se o token for inv├ílido/expirado, vai retornar 401
        // Precisamos saber o id do usu├írio, mas ele t├í no cookie...
        // Solu├º├úo: criar um endpoint que retorna o usu├írio autenticado atual
        const { data } = await clientApi.get(`/users/me`);

        return { valid: true, data };
    } catch (error) {
        // Se der erro 401, token ├® inv├ílido
        if (error.response?.status === 401) {
            return { valid: false };
        }
        throw error;
    }
}
