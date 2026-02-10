import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Score {
    principal: Principal;
    score: bigint;
}
export interface backendInterface {
    getBestScore(): Promise<bigint>;
    getLeaderboard(): Promise<Array<Score>>;
    registerScore(newScore: bigint): Promise<void>;
}
