export interface Usuario {
    id?: string;
    nombre?: string;
    email?: string;
    pwd?: string;
    avatar?: string;
    rol?: string;
}

export interface Evento {
    _id?: string;
    fecha?: Date;
    titulo?: string;
    descripcion?: string;
    tipo?: string;
    lugar?: string;
}

export interface MensajePush {
    titulo: string;
    mensaje: string;
}