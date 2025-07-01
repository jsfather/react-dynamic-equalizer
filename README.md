# Dynamic Equalizer

A highly customizable, dynamic audio equalizer component for React with full TypeScript support.

## Features

- 🎵 **Animated Equalizer Bars** - Smooth, realistic equalizer animations
- 🎨 **Fully Customizable** - Colors, sizes, animation speeds, and more
- 📱 **Responsive** - Works on all screen sizes
- ⚡ **Performance Optimized** - Efficient animations and rendering
- 🔧 **TypeScript Support** - Full type definitions included
- 🎛️ **Flexible API** - Easy to integrate and customize

## Installation

```bash
npm install @jsfather/react-dynamic-equalizer
```

```bash
yarn add @jsfather/react-dynamic-equalizer
```

## Basic Usage

```tsx
import { ReactDynamicEqualizer } from '@jsfather/react-dynamic-equalizer';

function App() {
  return (
    <div style={{ height: '200px', width: '100%' }}>
      <ReactDynamicEqualizer />
    </div>
  );
}
```

## Advanced Usage

```tsx
import { ReactDynamicEqualizer, ReactEqualizerColors } from '@jsfather/react-dynamic-equalizer';

const customColors: ReactEqualizerColors = {
  primary: ['#ff6b6b', '#ee5a6f'],
  secondary: ['#4ecdc4', '#45b7aa'],
  accent: ['#ffe66d', '#ffcc5c']
};

function ReactCustomEqualizer() {
  return (
    <ReactDynamicEqualizer
      barCount={40}
      height="300px"
      colors={customColors}
      animation={{
        duration: { min: 0.3, max: 1.5 },
        easing: 'ease-out',
        scaleRange: { min: 0.1, max: 1 }
      }}
      blocksPerBar={{ min: 4, max: 12 }}
      gap="8px"
      borderRadius="4px"
      paused={false}
    />
  );
}
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `barCount` | `number` | `60` | Number of equalizer bars |
| `height` | `string \| number` | `'100%'` | Height of the equalizer |
| `width` | `string \| number` | `'100%'` | Width of the equalizer |
| `minBarWidth` | `string \| number` | `'24px'` | Minimum width of each bar |
| `gap` | `string \| number` | `'10px'` | Gap between bars |
| `colors` | `string[] \| EqualizerColors` | `DEFAULT_COLORS` | Color configuration |
| `blocksPerBar` | `{ min?: number; max?: number }` | `{ min: 3, max: 9 }` | Range of blocks per bar |
| `animation` | `AnimationConfig` | See below | Animation configuration |
| `className` | `string` | `''` | Custom CSS class |
| `style` | `React.CSSProperties` | `{}` | Custom inline styles |
| `paused` | `boolean` | `false` | Pause animations |
| `visible` | `boolean` | `true` | Show/hide equalizer |
| `blockHeightMultiplier` | `number` | `1` | Height multiplier for blocks |
| `randomizeColors` | `boolean` | `true` | Randomize colors vs sequential |
| `borderRadius` | `string \| number` | `'0px'` | Border radius for blocks |
| `direction` | `'up' \| 'down'` | `'up'` | Animation direction |

## Animation Configuration

```typescript
interface ReactAnimationConfig {
  duration?: {
    min?: number;    // Default: 0.4
    max?: number;    // Default: 1.2
  };
  easing?: string;   // Default: 'ease-in-out'
  scaleRange?: {
    min?: number;    // Default: 0.2
    max?: number;    // Default: 1
  };
}
```

## Color Configuration

You can pass colors in two ways:

### Simple Array
```tsx
const colors = ['#ff0000', '#00ff00', '#0000ff'];
<ReactDynamicEqualizer colors={colors} />
```

### Categorized Colors
```tsx
const colors: ReactEqualizerColors = {
  primary: ['#ff6b6b', '#ee5a6f'],
  secondary: ['#4ecdc4', '#45b7aa'],
  accent: ['#ffe66d', '#ffcc5c']
};
<DynamicEqualizer colors={colors} />
```

## Examples

### Music Player Theme
```tsx
<ReactDynamicEqualizer
  barCount={50}
  height="150px"
  colors={['#1db954', '#1ed760', '#1aa34a']}
  animation={{ duration: { min: 0.2, max: 0.8 } }}
  borderRadius="2px"
/>
```

### Neon Theme
```tsx
<ReactDynamicEqualizer
  barCount={30}
  height="200px"
  colors={['#ff00ff', '#00ffff', '#ffff00']}
  animation={{ easing: 'ease-out' }}
  gap="12px"
  borderRadius="8px"
/>
```

### Minimal Theme
```tsx
<ReactDynamicEqualizer
  barCount={20}
  height="100px"
  colors={['#333333', '#666666', '#999999']}
  animation={{ duration: { min: 0.6, max: 1.4 } }}
  gap="6px"
/>
```

## TypeScript Support

The package includes full TypeScript definitions. Import types as needed:

```tsx
import {
    ReactDynamicEqualizer,
    ReactEqualizerProps,
    ReactEqualizerColors,
    ReactAnimationConfig 
} from '@jsfather/react-dynamic-equalizer';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © Your Name