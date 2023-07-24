import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { visitValidationSchema } from 'validationSchema/visits';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.visit
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVisitById();
    case 'PUT':
      return updateVisitById();
    case 'DELETE':
      return deleteVisitById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVisitById() {
    const data = await prisma.visit.findFirst(convertQueryToPrismaUtil(req.query, 'visit'));
    return res.status(200).json(data);
  }

  async function updateVisitById() {
    await visitValidationSchema.validate(req.body);
    const data = await prisma.visit.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteVisitById() {
    const data = await prisma.visit.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
