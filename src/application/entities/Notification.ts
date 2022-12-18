import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';
import { Content } from './Content';

export type NotificationProps = {
  category: string;
  content: Content;
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

  public get createdAt() {
    return this.props.createdAt;
  }

  public set readAt(newReadAt: Date | null | undefined) {
    this.props.readAt = newReadAt;
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
