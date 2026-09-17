'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, BoltIcon, ColumnsIcon, EllipsisIcon, EllipsisVerticalIcon, RowsIcon, TableCellsMergeIcon, TableColumnsSplitIcon, TrashIcon } from "lucide-react";
import { ReactNode, useCallback, useEffect, useState } from "react";

export type EditorTableMenuProps = {
    children: ReactNode;
};

export const EditorTableMenu = ({ children }: EditorTableMenuProps) => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    const isActive = editor.isActive('table');

    return (
        <div
            className={cn({
                hidden: !isActive,
            })}
        >
            {children}
        </div>
    );
};

export type EditorTableGlobalMenuProps = {
    children: ReactNode;
};

export const EditorTableGlobalMenu = ({
    children,
}: EditorTableGlobalMenuProps) => {
    const { editor } = useCurrentEditor();
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        if (!editor) {
            return;
        }

        editor.on('selectionUpdate', () => {
            const selection = window.getSelection();

            if (!selection) {
                return;
            }

            const range = selection.getRangeAt(0);
            let startContainer = range.startContainer as HTMLElement | string;

            if (!(startContainer instanceof HTMLElement)) {
                startContainer = range.startContainer.parentElement as HTMLElement;
            }

            const tableNode = startContainer.closest('table');

            if (!tableNode) {
                return;
            }

            const tableRect = tableNode.getBoundingClientRect();

            setTop(tableRect.top + tableRect.height);
            setLeft(tableRect.left + tableRect.width / 2);
        });

        return () => {
            editor.off('selectionUpdate');
        };
    }, [editor]);

    return (
        <div
            className={cn(
                '-translate-x-1/2 absolute flex translate-y-1/2 items-center rounded-full border bg-background shadow-xl',
                {
                    hidden: !(left || top),
                }
            )}
            style={{ top, left }}
        >
            {children}
        </div>
    );
};

export type EditorTableColumnMenuProps = {
    children: ReactNode;
};

export const EditorTableColumnMenu = ({
    children,
}: EditorTableColumnMenuProps) => {
    const { editor } = useCurrentEditor();
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        if (!editor) {
            return;
        }

        editor.on('selectionUpdate', () => {
            const selection = window.getSelection();

            if (!selection) {
                return;
            }

            const range = selection.getRangeAt(0);
            let startContainer = range.startContainer as HTMLElement | string;

            if (!(startContainer instanceof HTMLElement)) {
                startContainer = range.startContainer.parentElement as HTMLElement;
            }

            // Get the closest table cell (td or th)
            const tableCell = startContainer.closest('td, th');

            if (!tableCell) {
                return;
            }

            const cellRect = tableCell.getBoundingClientRect();

            setTop(cellRect.top);
            setLeft(cellRect.left + cellRect.width / 2);
        });

        return () => {
            editor.off('selectionUpdate');
        };
    }, [editor]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className={cn(
                    '-translate-x-1/2 -translate-y-1/2 absolute flex h-4 w-7 overflow-hidden rounded-md border bg-background shadow-xl',
                    {
                        hidden: !(left || top),
                    }
                )}
                style={{ top, left }}
            >
                <Button size="icon" variant="ghost">
                    <EllipsisIcon className="text-muted-foreground" size={16} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>{children}</DropdownMenuContent>
        </DropdownMenu>
    );
};

export type EditorTableRowMenuProps = {
    children: ReactNode;
};

export const EditorTableRowMenu = ({ children }: EditorTableRowMenuProps) => {
    const { editor } = useCurrentEditor();
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        if (!editor) {
            return;
        }

        editor.on('selectionUpdate', () => {
            const selection = window.getSelection();

            if (!selection) {
                return;
            }

            const range = selection.getRangeAt(0);
            let startContainer = range.startContainer as HTMLElement | string;

            if (!(startContainer instanceof HTMLElement)) {
                startContainer = range.startContainer.parentElement as HTMLElement;
            }

            const tableRow = startContainer.closest('tr');

            if (!tableRow) {
                return;
            }

            const rowRect = tableRow.getBoundingClientRect();

            setTop(rowRect.top + rowRect.height / 2);
            setLeft(rowRect.left);
        });

        return () => {
            editor.off('selectionUpdate');
        };
    }, [editor]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={cn(
                        '-translate-x-1/2 -translate-y-1/2 absolute flex h-7 w-4 overflow-hidden rounded-md border bg-background shadow-xl',
                        {
                            hidden: !(left || top),
                        }
                    )}
                    size="icon"
                    style={{ top, left }}
                    variant="ghost"
                >
                    <EllipsisVerticalIcon className="text-muted-foreground" size={12} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>{children}</DropdownMenuContent>
        </DropdownMenu>
    );
};

export const EditorTableColumnBefore = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().addColumnBefore().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <DropdownMenuItem className="flex items-center gap-2" onClick={handleClick}>
            <ArrowLeftIcon className="text-muted-foreground" size={16} />
            <span>Add column before</span>
        </DropdownMenuItem>
    );
};

export const EditorTableColumnAfter = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().addColumnAfter().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <DropdownMenuItem className="flex items-center gap-2" onClick={handleClick}>
            <ArrowRightIcon className="text-muted-foreground" size={16} />
            <span>Add column after</span>
        </DropdownMenuItem>
    );
};

export const EditorTableRowBefore = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().addRowBefore().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <DropdownMenuItem className="flex items-center gap-2" onClick={handleClick}>
            <ArrowUpIcon className="text-muted-foreground" size={16} />
            <span>Add row before</span>
        </DropdownMenuItem>
    );
};

export const EditorTableRowAfter = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().addRowAfter().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <DropdownMenuItem className="flex items-center gap-2" onClick={handleClick}>
            <ArrowDownIcon className="text-muted-foreground" size={16} />
            <span>Add row after</span>
        </DropdownMenuItem>
    );
};

export const EditorTableColumnDelete = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().deleteColumn().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <DropdownMenuItem className="flex items-center gap-2" onClick={handleClick}>
            <TrashIcon className="text-destructive" size={16} />
            <span>Delete column</span>
        </DropdownMenuItem>
    );
};

export const EditorTableRowDelete = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().deleteRow().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <DropdownMenuItem className="flex items-center gap-2" onClick={handleClick}>
            <TrashIcon className="text-destructive" size={16} />
            <span>Delete row</span>
        </DropdownMenuItem>
    );
};

export const EditorTableHeaderColumnToggle = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().toggleHeaderColumn().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="flex items-center gap-2 rounded-full"
                    onClick={handleClick}
                    size="icon"
                    variant="ghost"
                >
                    <ColumnsIcon className="text-muted-foreground" size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span>Toggle header column</span>
            </TooltipContent>
        </Tooltip>
    );
};

export const EditorTableHeaderRowToggle = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().toggleHeaderRow().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="flex items-center gap-2 rounded-full"
                    onClick={handleClick}
                    size="icon"
                    variant="ghost"
                >
                    <RowsIcon className="text-muted-foreground" size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span>Toggle header row</span>
            </TooltipContent>
        </Tooltip>
    );
};

export const EditorTableDelete = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().deleteTable().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="flex items-center gap-2 rounded-full"
                    onClick={handleClick}
                    size="icon"
                    variant="ghost"
                >
                    <TrashIcon className="text-destructive" size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span>Delete table</span>
            </TooltipContent>
        </Tooltip>
    );
};

export const EditorTableMergeCells = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().mergeCells().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="flex items-center gap-2 rounded-full"
                    onClick={handleClick}
                    size="icon"
                    variant="ghost"
                >
                    <TableCellsMergeIcon className="text-muted-foreground" size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span>Merge cells</span>
            </TooltipContent>
        </Tooltip>
    );
};

export const EditorTableSplitCell = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().splitCell().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="flex items-center gap-2 rounded-full"
                    onClick={handleClick}
                    size="icon"
                    variant="ghost"
                >
                    <TableColumnsSplitIcon className="text-muted-foreground" size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span>Split cell</span>
            </TooltipContent>
        </Tooltip>
    );
};

export const EditorTableFix = () => {
    const { editor } = useCurrentEditor();

    const handleClick = useCallback(() => {
        if (editor) {
            editor.chain().focus().fixTables().run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="flex items-center gap-2 rounded-full"
                    onClick={handleClick}
                    size="icon"
                    variant="ghost"
                >
                    <BoltIcon className="text-muted-foreground" size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span>Fix table</span>
            </TooltipContent>
        </Tooltip>
    );
};