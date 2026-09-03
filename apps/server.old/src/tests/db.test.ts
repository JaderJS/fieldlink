import { db } from "@/plugins/prisma.plugins";
import { expect, it, describe } from "bun:test";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

describe("Bank services", () => {
    it("Sum amount bank of periods", async () => {

        const filename = `./assets/bank-total-${new Date().toISOString()}.json`;


        const total = await db.installment.aggregate({
            where: {
                billed: true,
                transaction: {
                    bankId: 4,
                },
                period: {
                    startTime: {
                        gte: new Date("2026-01-01"),
                        lt: new Date("2027-01-01"),
                    },
                },
            },
            _sum: {
                value: true,
            },
        });

        await writeFile(
            filename,
            JSON.stringify(total, null, 2),
            "utf-8",
        );

        expect((total._sum.value ?? 0) / 100).toEqual(0)
    })
})