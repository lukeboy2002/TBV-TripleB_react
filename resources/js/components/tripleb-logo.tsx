import { cn } from '@/lib/utils';

type Props = {
    /**
     * - "auto": zwart logo in lichte modus, wit logo in donkere modus
     * - "white": altijd wit (voor op een donkere achtergrond, zoals de kopbalk)
     * - "black": altijd zwart
     */
    variant?: 'auto' | 'white' | 'black';
    className?: string;
};

/**
 * Het TBV TripleB-logo. De afbeeldingen staan in public/images.
 */
export default function TriplebLogo({ variant = 'auto', className }: Props) {
    if (variant === 'white') {
        return (
            <img
                src="/images/logo-white.png"
                alt="TBV TripleB"
                className={className}
            />
        );
    }

    if (variant === 'black') {
        return (
            <img
                src="/images/logo-black.png"
                alt="TBV TripleB"
                className={className}
            />
        );
    }

    // Allebei renderen en met Tailwind het juiste tonen:
    // "dark:hidden" verbergt het zwarte logo in donkere modus, en andersom.
    return (
        <>
            <img
                src="/images/logo-black.png"
                alt="TBV TripleB"
                className={cn(className, 'dark:hidden')}
            />
            <img
                src="/images/logo-white.png"
                alt="TBV TripleB"
                className={cn(className, 'hidden dark:block')}
            />
        </>
    );
}
