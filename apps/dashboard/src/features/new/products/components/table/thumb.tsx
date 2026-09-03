import Image from "next/image";

type ProductThumbnailCellProps = {
    src?: string;
    alt: string;
};

export function ProductThumbnailCell({
    src,
    alt,
}: ProductThumbnailCellProps) {
    return (
        <div className="flex items-center justify-center">
            <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="48px"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        N/A
                    </div>
                )}
            </div>
        </div>
    );
}
