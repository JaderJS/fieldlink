'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { deleteDatabase, getDatabases } from "@/functions/kanban"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Edit, Trash, View } from "lucide-react"
import Link from "next/link"

const ViewDatabases = () => {

    return(
        <>NOT IMPLEMENTED</>
    )

    // const { data } = useQuery({ queryKey: [QUERY_KEY.getDatabases], queryFn: getDatabases })
    // const { mutateAsync: deleteDatabaseFn } = useMutation({ mutationFn: deleteDatabase })
    
    // return (
    //     <div className="flex flex-col p-12 gap-y-12">
    //         {data?.databases.map((database) => (
    //             <Card key={database._id}>
    //                 <CardHeader>
    //                     <CardTitle>{database.name}</CardTitle>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <Button size={"icon"} asChild>
    //                         <Link href={`/board/${database._id}/builder`}>
    //                             <Edit />
    //                         </Link>
    //                     </Button>
    //                     <Button size={"icon"} asChild>
    //                         <Link href={`/board/${database._id}`}>
    //                             <View />
    //                         </Link>
    //                     </Button>
    //                     <Button size={"icon"} variant={"destructive"} onClick={() => deleteDatabaseFn(database._id)}>
    //                         <Trash />
    //                     </Button>
    //                 </CardContent>
    //             </Card>
    //         ))}
    //     </div>
    // )
}

export { ViewDatabases }