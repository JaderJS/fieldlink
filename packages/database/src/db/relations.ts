import { defineRelationsPart } from "drizzle-orm";
import { authRelations } from "./auth/relations";
import * as schema from "./index";

const mainRelations = defineRelationsPart(schema);

export const relations = {
	...mainRelations,
	...authRelations,
};
