type PeriodItem = { month: string, in: number, out: number, acc: number }


export function averageNetLastMonths(periods: PeriodItem[], lastN = 3) {
    if (!periods || periods.length === 0) return 0;
    const tail = periods.slice(-lastN);
    const nets = tail.map((p) => p.in - p.out);
    const avg = nets.reduce((s, x) => s + x, 0) / (tail.length || 1);
    // use absolute value for monthly net (if negative means burn)
    return Math.abs(avg);
}