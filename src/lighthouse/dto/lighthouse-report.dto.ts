import { IsInt, IsOptional, Min, IsNotEmpty, IsUrl } from 'class-validator';

export class LighthouseReportDto {
  @IsNotEmpty({ message: 'url不能为空' })
  @IsUrl({}, { message: 'url格式错误' })
  url: string;

  @IsNotEmpty({ message: 'times不能为空' })
  // @IsInt()
  // @Min(1, { message: 'times最小为1' })
  times: number;
}
