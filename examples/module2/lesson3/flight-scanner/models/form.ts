import { z } from 'zod';

export const FormSchema = z.object({
    origin: z
        .string()
        .min(1, {
            message: 'Origin is required',
        }),
    destination: z
        .string()
        .refine((value) => Boolean(value), {
            message: 'Destination is required',
        }),
    trip: z
        .enum(['one-way', 'round-trip']),
    startDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, {
            message: 'Start date must be in DD-MM-YYYY format',
        }),
    endDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, {
            message: 'End date must be in DD-MM-YYYY format',
        }),
});

export type Form = z.infer<typeof FormSchema>;