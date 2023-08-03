import { User } from '../entities/UserEntity';
import { JWTToken } from '../middleware/auth';

declare global {
    namespace Express {
        interface Request {
            user: User | null;
            token: JWTToken | null;
        }
    }
}
