export interface Usuario {
    id?: string;
    nombre?: string;
    email?: string;
    pwd?: string;
    avatar?: string;
}

export interface MensajePush {
    titulo: string;
    mensaje: string;
}