import React, {useEffect, useState, useMemo} from 'react';

// TypeScript interfaces for props
interface ReactEqualizerColors {
    primary?: string[];
    secondary?: string[];
    accent?: string[];
}

interface ReactAnimationConfig {
    duration: {
        min: number;
        max: number;
    };
    easing?: string;
    scaleRange: {
        min: number;
        max: number;
    };
}

interface ReactEqualizerProps {
    /** Number of bars in the equalizer */
    barCount?: number;
    /** Height of the equalizer container */
    height?: string | number;
    /** Width of the equalizer container */
    width?: string | number;
    /** Minimum width of each bar */
    minBarWidth?: string | number;
    /** Gap between bars */
    gap?: string | number;
    /** Color configuration */
    colors?: string[] | ReactEqualizerColors;
    /** Number of blocks per bar range */
    blocksPerBar?: {
        min?: number;
        max?: number;
    };
    /** Animation configuration */
    animation?: ReactAnimationConfig;
    /** Custom CSS class for the container */
    className?: string;
    /** Custom styles for the container */
    style?: React.CSSProperties;
    /** Whether to pause animations */
    paused?: boolean;
    /** Whether to show equalizer (for conditional rendering) */
    visible?: boolean;
    /** Custom block height multiplier */
    blockHeightMultiplier?: number;
    /** Whether to randomize colors or use them in sequence */
    randomizeColors?: boolean;
    /** Border radius for blocks */
    borderRadius?: string | number;
    /** Direction of animation */
    direction?: 'up' | 'down';
}

const DEFAULT_COLORS = [
    '#636363',
    '#3d3d3d',
    '#0d736f',
    '#fbfbfb',
    '#414141',
    '#282828',
    '#084a47',
    '#616161'
];

const DEFAULT_ANIMATION: Required<ReactAnimationConfig> = {
    duration: {min: 0.4, max: 1.2},
    easing: 'ease-in-out',
    scaleRange: {min: 0.2, max: 1}
};

const DEFAULT_BLOCKS_PER_BAR = {min: 3, max: 9};

export const ReactDynamicEqualizer: React.FC<ReactEqualizerProps> = ({
                                                                         barCount = 60,
                                                                         height = '100%',
                                                                         width = '100%',
                                                                         minBarWidth = '24px',
                                                                         gap = '10px',
                                                                         colors = DEFAULT_COLORS,
                                                                         blocksPerBar = DEFAULT_BLOCKS_PER_BAR,
                                                                         animation = DEFAULT_ANIMATION,
                                                                         className = '',
                                                                         style = {},
                                                                         paused = false,
                                                                         visible = true,
                                                                         blockHeightMultiplier = 1,
                                                                         randomizeColors = true,
                                                                         borderRadius = '0px',
                                                                         direction = 'up'
                                                                     }) => {
    const [bars, setBars] = useState<{ blocks: string[]; animationDelay: number }[]>([]);

    // Merge animation config with defaults
    const animConfig = useMemo(() => ({
        ...DEFAULT_ANIMATION,
        ...animation,
        duration: {...DEFAULT_ANIMATION.duration, ...animation.duration},
        scaleRange: {...DEFAULT_ANIMATION.scaleRange, ...animation.scaleRange}
    }), [animation]);

    // Process colors based on type
    const processedColors = useMemo(() => {
        if (Array.isArray(colors)) {
            return colors;
        }

        // If colors is an object with color categories
        const colorObj = colors as ReactEqualizerColors;
        const allColors = [
            ...(colorObj.primary || []),
            ...(colorObj.secondary || []),
            ...(colorObj.accent || [])
        ];

        return allColors.length > 0 ? allColors : DEFAULT_COLORS;
    }, [colors]);

    // Generate bars with blocks
    useEffect(() => {
        const generatedBars = [];

        for (let i = 0; i < barCount; i++) {
            const blockCount = Math.floor(Math.random() * (blocksPerBar.max! - blocksPerBar.min! + 1)) + blocksPerBar.min!;
            const blocks = [];

            for (let j = 0; j < blockCount; j++) {
                let color: string;

                if (randomizeColors) {
                    color = processedColors[Math.floor(Math.random() * processedColors.length)];
                } else {
                    color = processedColors[j % processedColors.length];
                }

                blocks.push(color);
            }

            // Generate random animation delay for more natural feel
            const animationDelay = Math.random() * 0.5;

            generatedBars.push({blocks, animationDelay});
        }

        setBars(generatedBars);
    }, [barCount, blocksPerBar, processedColors, randomizeColors]);

    // Generate dynamic styles
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: direction === 'up' ? 'flex-end' : 'flex-start',
        gap: gap,
        height: height,
        width: width,
        ...style
    };

    const barStyle: React.CSSProperties = {
        flex: 1,
        display: 'flex',
        flexDirection: direction === 'up' ? 'column' : 'column-reverse',
        alignItems: 'center',
        gap: '2px',
        transformOrigin: direction === 'up' ? 'bottom' : 'top',
        minWidth: minBarWidth
    };

    // Generate keyframes for animation
    const generateKeyframes = (index: number): React.CSSProperties => {
        const duration = animConfig.duration.min + Math.random() * (animConfig.duration.max - animConfig.duration.min);
        const scaleStart = animConfig.scaleRange.min + Math.random() * (animConfig.scaleRange.max - animConfig.scaleRange.min);

        return {
            animation: paused ? 'none' : `equalizer-bounce-${index} ${duration}s infinite alternate ${animConfig.easing}`,
            animationDelay: `${bars[index]?.animationDelay || 0}s`
        };
    };

    if (!visible) return null;

    return (
        <>
            {/* Dynamic CSS generation */}
            <style>
                {bars.map((_, index) => {
                    const duration = animConfig.duration.min + Math.random() * (animConfig.duration.max - animConfig.duration.min);
                    const scaleStart = animConfig.scaleRange.min + Math.random() * (animConfig.scaleRange.max - animConfig.scaleRange.min);

                    return `
            @keyframes equalizer-bounce-${index} {
              0% { transform: scaleY(${scaleStart}); }
              100% { transform: scaleY(1); }
            }
          `;
                }).join('\n')}
            </style>

            <div
                className={`dynamic-equalizer ${className}`}
                style={containerStyle}
            >
                {bars.map((bar, barIndex) => (
                    <div
                        key={barIndex}
                        style={{
                            ...barStyle,
                            ...generateKeyframes(barIndex)
                        }}
                    >
                        {bar.blocks.map((color, blockIndex) => (
                            <div
                                key={blockIndex}
                                style={{
                                    width: '100%',
                                    height: `${(blockIndex + 1) * blockHeightMultiplier}px`,
                                    backgroundColor: color,
                                    borderRadius: borderRadius
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

// Export types for consumers
export type {ReactEqualizerProps, ReactEqualizerColors, ReactAnimationConfig};

// Default export
export default ReactDynamicEqualizer;