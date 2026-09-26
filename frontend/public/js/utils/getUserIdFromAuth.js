// Guarda o userId em mem├│ria durante a sess├úo
let currentUserId = null;

export function setUserId(userId) {
    currentUserId = userId;
}

export function getUserId() {
    return currentUserId;
}

export function clearUserId() {
    currentUserId = null;
}
