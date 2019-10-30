export interface DB_MYSQL {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export interface DB_REDIS {
    port: number;
    host: string;
}

export interface ResultQuery {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string,
    serverStatus: number;
    warningStatus: number;
}

export interface RedisObject<T> {
    [ date: string ]: string
}

export interface DisplayRedisObject {
    date: string;
    descriptionLog: RedisObject<string>;
}
