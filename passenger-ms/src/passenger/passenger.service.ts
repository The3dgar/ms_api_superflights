import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PassengerDTO } from './dto/passenger.dto';
import { PassengerInterface } from './interfaces/passenger.interface';
import { PassengerModel } from './models/models';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PassengerModel.name)
    private readonly model: Model<PassengerInterface>,
  ) {}

  async create(passenger: PassengerDTO): Promise<PassengerInterface> {
    return await new this.model(passenger).save();
  }

  async findAll(): Promise<PassengerInterface[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<PassengerInterface> {
    return await this.model.findById(id);
  }

  async update(
    id: string,
    passenger: PassengerDTO,
  ): Promise<PassengerInterface> {
    return await this.model.findByIdAndUpdate(id, passenger, {new: true});
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
  }
}
