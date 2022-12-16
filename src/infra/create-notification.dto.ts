import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateNotification {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @Length(7, 255)
  content: string;

  @IsNotEmpty()
  @IsUUID()
  recipientId: string;
}