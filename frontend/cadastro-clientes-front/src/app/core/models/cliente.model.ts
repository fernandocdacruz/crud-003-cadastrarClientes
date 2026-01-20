export interface Cliente {
    id?: number;
    nomeCompleto: string;
    email: string;
    cpf: string;
    genero: string;
    observacoes?: string;
}