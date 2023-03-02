import {Request, Response} from 'express';

export abstract class BaseController {
    protected abstract executeImpl(req: Request, res: Response): Promise<any>;

    public async execute(req: Request, res: Response): Promise<any> {
        try {
            await this.executeImpl(req, res);
        } catch (e: any) {
            return this.fail(res, e.message);
        }
    }

    protected ok<T>(res: Response, dto?: T) {
        if (dto) return res.status(200).json(dto);
        return res.sendStatus(200);
    }

    protected created(res: Response) {
        return res.sendStatus(201);
    }

    protected fail(res: Response, message?: string) {
        return res.status(500).json({message: message ?? 'Something went wrong'});
    }
}
