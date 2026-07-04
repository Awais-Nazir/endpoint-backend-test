import { Body, Controller,Get, Post, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService){}

    @Post()
    create(@Body() createTicketDto:CreateTicketDto,
        @CurrentUser() user: { id: string; name: string; email: string },
    ){
        return this.ticketsService.createTicket(createTicketDto,user.id);
    }

    @Get()
    findAll(
        @CurrentUser() user: { id: string; name: string; email: string },
    ){
        return this.ticketsService.findAllByUser(user.id);
    }
}
 