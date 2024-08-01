import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetTaskResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  status: string;
}
