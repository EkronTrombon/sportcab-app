export interface Usuario {
    id?: string;
    nombre?: string;
    email?: string;
    pwd?: string;
    avatar?: string;
    rol?: string;
}

export interface MensajePush {
    titulo: string;
    mensaje: string;
}