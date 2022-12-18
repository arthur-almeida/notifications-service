import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';
import { Content } from './Content';

export type NotificationProps = {
  category: string;
  content: Content;
  canceledAt?: Date | null;
  createdAt: Date;
  readAt?: Date | null;
  recipientId: string;
};

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set category(newCategory: string) {
    this.props.category = newCategory;
  }

  public get category() {
    return this.props.category;
  }

  public set content(newContent: Content) {
    this.props.content = newContent;
  }

  public get content() {
    return this.props.content;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public set recipientId(newRecipientId: string) {
    this.props.recipientId = newRecipientId;
  }

  public get recipientId() {
    return this.props.recipientId;
  }
}
