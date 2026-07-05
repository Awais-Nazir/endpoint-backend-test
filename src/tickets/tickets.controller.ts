import { Body, Delete,Patch, Param, Controller,Get, Post, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateTicketDto } from './dto/update-ticket.dto';

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

    @Get(':id')
    findOneById(
        @Param('id') id: string,
        @CurrentUser() user: {id: string; name:string; email: string},
    )
    {
        return this.ticketsService.findOneById(id, user.id)
    }

    @Patch(':id')
    updateOneById(
        @Param('id') id:string,
        @Body() updateTicketDto: UpdateTicketDto,
        @CurrentUser() user: {id: string; name: String; email: string},
    ){
        return this.ticketsService.updateByUser(id, user.id, updateTicketDto)
    }

    @Delete(':id')
    deleteById(
       @Param('id') id:string, 
       @CurrentUser() user: {id: string; name: String; email: string},
    ){
        return this.ticketsService.deleteById(id, user.id)
    }
}
 