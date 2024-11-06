import { PrismaClient as MySQLPrismaClient } from "../../generated/mysql-client";

let mysqlPrisma: MySQLPrismaClient;

if (process.env.NODE_ENV === "production") {
  mysqlPrisma = new MySQLPrismaClient();
} else {
  if (!(global as any).mysqlPrisma) {
    (global as any).mysqlPrisma = new MySQLPrismaClient();
  }
  mysqlPrisma = (global as any).mysqlPrisma;
}

export default mysqlPrisma;
