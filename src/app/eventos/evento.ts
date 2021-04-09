import { Time } from '@angular/common';

export interface Evento {
    id: number;
    nomeevento: string;
    data: Date;
    hora: Time;
    local: string;
}
