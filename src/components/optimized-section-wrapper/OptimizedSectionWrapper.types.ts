import { ReactNode } from "react";

export interface OptimizedSectionWrapperProps<T> {
    /**
     * Data to check for existence before rendering children.
     */
    data: T | null | undefined;

    /**
     * Loading state of the section.
     */
    isLoading: boolean;

    /**
     * Fallback component to show while loading or in Suspense.
     * Usually a SectionSkeleton.
     */
    fallback: ReactNode;

    /**
     * Children to render. Can be JSX or a render prop function.
     */
    children: ReactNode | ((data: T) => ReactNode);

    /**
     * Height for the LazyWrapper placeholder.
     * @default 300
     */
    height?: string | number;

    /**
     * Optional fallback for when data is empty/null and not loading.
     */
    isEmptyFallback?: ReactNode;

    /**
     * Threshold for the intersection observer in LazyWrapper.
     * @default 0
     */
    threshold?: number;

    /**
     * Optional delay before rendering the content once visible.
     * Useful for heavy components.
     * @default 0
     */
    delayRender?: number;

    /**
     * Optional title for accessibility/debugging.
     */
    title?: string;
}
