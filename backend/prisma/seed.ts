import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.payment.deleteMany();
  await prisma.maintenanceRequest.deleteMany();
  await prisma.lease.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@rentease.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create a landlord
  const landlordPassword = await bcrypt.hash('Landlord123!', 10);
  const landlord = await prisma.user.create({
    data: {
      email: 'landlord@rentease.com',
      password: landlordPassword,
      name: 'John Doe',
      role: 'LANDLORD',
    },
  });

  // Create a tenant
  const tenantPassword = await bcrypt.hash('Tenant123!', 10);
  const tenant = await prisma.user.create({
    data: {
      email: 'tenant@rentease.com',
      password: tenantPassword,
      name: 'Jane Smith',
      role: 'TENANT',
    },
  });

  // Create a property
  const property = await prisma.property.create({
    data: {
      name: 'Sunset Apartments',
      address: '123 Main St, City, State 12345',
      ownerId: landlord.id,
    },
  });

  // Create units
  const unit1 = await prisma.unit.create({
    data: {
      number: '101',
      propertyId: property.id,
      tenantId: tenant.id,
      rent: 1200,
    },
  });

  const unit2 = await prisma.unit.create({
    data: {
      number: '102',
      propertyId: property.id,
      rent: 1300,
    },
  });

  // Create a lease
  const lease = await prisma.lease.create({
    data: {
      unitId: unit1.id,
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      rentAmount: 1200,
      deposit: 1200,
      status: 'ACTIVE',
    },
  });

  // Create a maintenance request
  const maintenanceRequest = await prisma.maintenanceRequest.create({
    data: {
      title: 'Leaking Faucet',
      description: 'The kitchen faucet is leaking and needs repair',
      status: 'PENDING',
      priority: 'MEDIUM',
      unitId: unit1.id,
      creatorId: tenant.id,
    },
  });

  // Create a payment
  const payment = await prisma.payment.create({
    data: {
      amount: 1200,
      status: 'COMPLETED',
      type: 'RENT',
      unitId: unit1.id,
      creatorId: tenant.id,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 