export interface ITask {
  name: string;
  description?: string;
}

export interface IColumn {
  id: string;
  order: number;
  tasks: [];
  title: string;
}
