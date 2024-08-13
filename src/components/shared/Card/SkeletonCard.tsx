import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCard = () => {
    return (
        <Card className="w-[700px] h-[258px] pt-5">
            <CardContent className="space-y-2">
                <Skeleton className="h-10 w-[280px] mb-4" />
                <Skeleton className="h-4 w-[360px] mb-4" />
                <Skeleton className="h-4 w-[360px] mb-4" />
                <Skeleton className="h-4 w-[360px]" />
            </CardContent>
        </Card>
    );
};
