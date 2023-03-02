export interface UseCase<Dto, Res> {
    execute(dto?: Dto): Promise<Res> | Res;
}
