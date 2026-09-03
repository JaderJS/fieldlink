import { db } from "@/plugins/prisma.plugins"

export const PrismaUploadAdapter = {
    async create(dto: any): Promise<void> {
        await db.archives.create({
            data: {
                path: "",
                pathUrl: "",
                size: "",
                title: "",
                type: "",
                createdCuid: "",
                updatedCuid: "",
                ownerCuid: ""
            }
        })
    },
    
    async createMany(dto: any): Promise<void> { },

    async delete({ cuid }: { cuid: string }): Promise<void> {
        db.archives.delete({ where: { cuid: cuid } })
    }
}