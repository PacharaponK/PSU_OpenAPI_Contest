import { User } from "src/users/entities/user.entity";

export class CreateFeedbackDto {
    name: string;
    user: User
}
