import { validateTokenApi } from "../api/validateTokenApi.js";

export async function checkAuthentication() {
    try {
        // Valida o token (que est├í no cookie) fazendo uma chamada simples ├á API
        // A API retorna o user com o id
        const validation = await validateTokenApi();

        if (!validation.valid) {
            // Token inv├ílido ou expirado
            return { authenticated: false };
        }

        return { authenticated: true, idUser: validation.data.id };
    } catch (error) {
        // Erro na valida├º├úo
        console.error("Erro ao validar token:", error);
        return { authenticated: false };
    }
}

export function redirectToLogin() {
    window.location.href = "/login.html";
}
