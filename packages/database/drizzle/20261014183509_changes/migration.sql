ALTER TABLE "station_to_groups" RENAME COLUMN "channel_id" TO "channel_group_id";--> statement-breakpoint
ALTER INDEX "station_channels_channel_idx" RENAME TO "station_to_groups_idx";