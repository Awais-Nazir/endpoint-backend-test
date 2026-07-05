import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { timeLog } from 'console';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

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

    async findOneById(id: string, userId:string): Promise<Ticket> {
        const ticket = await this.ticketRepository.findOne({
            where:
            {
                id:id,
                userId:userId,
            },
        });
        if (!ticket){
            throw new NotFoundException('Ticket Not Found')
        }
        return ticket
    }
    
    async updateByUser(id:string, userId: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
        const ticket = await this.findOneById(id, userId);
        Object.assign(ticket, updateTicketDto);
        return this.ticketRepository.save(ticket)
    }


    async deleteById(id:string, userId):Promise<{message: string}> {
        const ticket = await this.findOneById(id, userId);
        await this.ticketRepository.remove(ticket)

        return {
            message: 'ticket deleted sucessfully'
        }
    }
}
