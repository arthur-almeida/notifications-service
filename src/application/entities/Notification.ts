export type NotificationProps = {
  category: string;
  content: string;
  createdAt: Date;
  readAt?: Date | null;
  recipientId: string;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: NotificationProps) {
    this.props = props;
  }

  public set category(newCategory: string) {
    this.props.category = newCategory;
  }

  public get category() {
    return this.props.category;
  }

  public set content(newContent: string) {
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