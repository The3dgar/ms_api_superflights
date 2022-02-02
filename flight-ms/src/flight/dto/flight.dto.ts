import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class FlightDTO {
  @IsString()
  readonly pilot: string;

  @IsString()
  readonly airplane: string;

  @IsString()
  readonly destinationCity: string;

  @Type(() => Date)
  @IsDate()
  readonly flightDate: Date;
}
