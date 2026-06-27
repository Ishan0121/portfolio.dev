import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



// Animation variants — all defined in `@/lib/animations`, re-exported here for backwards compatibility
export {
  containerVariants,
  staggerContainer,
  fadeUp,
  fadeInUpVariants,
  fadeInVariant,
  childVariants,
  itemVariants,
  cardVariant,
} from '@/lib/animations';
