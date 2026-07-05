import {IsEnum, IsOptional , IsString } from 'class-validator';
import { TicketStatus } from '../enums/ticket-status.enum';


export class UpdateTicketDto {
  @IsString()
  @IsOptional()
  title?: string;


  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;
}