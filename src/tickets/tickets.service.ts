import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { timeLog } from 'console';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
    ){}

    async createTicket(createTicketDto:CreateTicketDto, userId:string): Promise<Ticket>{
        const ticket = this.ticketRepository.create({
            ...createTicketDto,
            userId: userId
        });

        return this.ticketRepository.save(ticket);
    }

    async findAllByUser(userId: string): Promise<Ticket[]> {
        return this.ticketRepository.find({
            where: 
                {userId: userId},
                order: {
                    createdAt: 'DESC',
                },
        });
    }
}
