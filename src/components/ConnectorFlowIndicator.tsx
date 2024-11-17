import { ArrowRight } from 'lucide-react';

const ConnectorFlowIndicator = ({ type }: { type: string }) => {
    const isSource = type.toLowerCase() === 'source';

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className={`flex items-center gap-1 ${isSource ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full 
          ${isSource ? 'bg-blue-100' : 'bg-teal-100'}`}>
                    <span className={`text-xs font-medium
            ${isSource ? 'text-blue-600' : 'text-teal-600'}`}>
                        {isSource ? 'Ex' : 'K'}
                    </span>
                </div>

                <div className={`group flex items-center w-8 ${isSource ? '' : 'rotate-180'}`}>
                    <div className="h-[2px] w-0 group-hover:w-full bg-muted-foreground transition-all duration-300" />
                    <ArrowRight
                        className={`w-4 h-4 flex-shrink-0 
              ${isSource ? 'text-blue-600' : 'text-teal-600'}
              animate-pulse`}
                    />
                </div>

                <div className={`flex items-center justify-center w-6 h-6 rounded-full 
          ${isSource ? 'bg-teal-100' : 'bg-blue-100'}`}>
                    <span className={`text-xs font-medium
            ${isSource ? 'text-teal-600' : 'text-blue-600'}`}>
                        {isSource ? 'K' : 'Ex'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConnectorFlowIndicator;