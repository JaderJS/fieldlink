'use client'

import { CardsProvider, ContainerCards, HeaderContainer, GroupBodyCards, GroupHeaderCards } from "@/features/card"
import { useProperties } from "../hooks/useProperties"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const ViewProperties = () => {

    const { data: properties } = useProperties()

    if (!properties) return null

    type ICardProperty = NonNullable<typeof properties>[number]

    return (
        <>

            <CardsProvider
                initialCards={properties}
            >
                <HeaderContainer />
                <ContainerCards<ICardProperty>>
                    {([group, properties]) => (
                        <div key={group}>
                            <GroupHeaderCards groupKey={group}>{group}</GroupHeaderCards>
                            <div className="grid grid-cols-3">
                                {properties.map((property) => (
                                    <GroupBodyCards key={property.id} groupKey={group} className="p-2">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>{property.title}</CardTitle>
                                                <CardDescription>{property.city}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {property.client.name}
                                                {property.stations.length}
                                            </CardContent>
                                        </Card>
                                    </GroupBodyCards>
                                ))}
                            </div>
                        </div>
                    )}
                </ContainerCards>
            </CardsProvider>

        </>
    )
}