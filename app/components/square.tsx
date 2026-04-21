import { Canvas, Path, Rect, Skia } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { View } from "react-native";
import {
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

export default function Square() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, false);
  }, [progress]);

  const path = Skia.Path.Make();
  path.addRect(Skia.XYWHRect(100, 200, 200, 200));

  const startOne = useDerivedValue(() => progress.value);
  const end1 = useDerivedValue(() =>
    progress.value + 0.2 > 1 ? 1 : progress.value + 0.2,
  );
  const startTwo = useDerivedValue(() => 0);
  const end2 = useDerivedValue(() =>
    progress.value + 0.2 > 1 ? (progress.value + 0.2) % 1 : 0,
  );

  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      <Canvas style={{ flex: 1 }}>
        <Rect
          x={100}
          y={200}
          width={200}
          height={200}
          color="black"
          style="stroke"
          strokeWidth={4}
        />

        <Path
          path={path}
          color="lime"
          style="stroke"
          strokeWidth={6}
          start={startOne}
          end={end1}
        />
        <Path
          path={path}
          color="lime"
          style="stroke"
          strokeWidth={6}
          start={startTwo}
          end={end2}
        />
      </Canvas>
    </View>
  );
}
