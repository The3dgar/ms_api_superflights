import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
  Client
} from '@nestjs/microservices';
import { RabbitMQContanst } from '../contants';
@Injectable()
export class ClientProxySuperFlight {
  constructor(private readonly config: ConfigService) {}

  clientProxyUsers(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config.get('AMQP_URL'),
        queue: RabbitMQContanst.UserQueue,
      },
    })
  }

  clientProxyPassenger(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config.get('AMQP_URL'),
        queue: RabbitMQContanst.PassengerQueue,
      },
    });
  }

  clientProxyFlight(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config.get('AMQP_URL'),
        queue: RabbitMQContanst.FlightQueue,
      },
    });
  }
}
