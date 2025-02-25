import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ["query", "info", "warn", "error"],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === "production") {
      throw new Error("cleanDatabase() cannot be run in production");
    }

    // Delete records in order of dependencies
    await this.payment.deleteMany();
    await this.maintenanceRequest.deleteMany();
    await this.lease.deleteMany();
    await this.unit.deleteMany();
    await this.property.deleteMany();
    await this.user.deleteMany();
  }
}
