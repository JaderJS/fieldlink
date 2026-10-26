import { describe, expect, test } from "bun:test";
import { loadStorageConfig } from "../src";

describe("Load storage config", () => {
	test("Load config", () => {
		const config = loadStorageConfig({
			S3_ENDPOINT: "https://minio.fieldlink.net.br",
			S3_BUCKET: "fieldlink",
			S3_ACCESS_KEY_ID: "DuYhoWugpSplrLDKF3qU",
			S3_SECRET_ACCESS_KEY: "Z7hcoTWGayybYjQTOvq8EH6OmJVdiIKkj2poDp2V",
		});

		expect(config.S3_BUCKET).toBe("fieldlink");
		expect(config.S3_ACCESS_KEY_ID).toBe("DuYhoWugpSplrLDKF3qU");
		expect(config.S3_SECRET_ACCESS_KEY).toBe(
			"Z7hcoTWGayybYjQTOvq8EH6OmJVdiIKkj2poDp2V",
		);
	});
});
