<template>
  <svg
    :xmlns="svg.xmlns"
    :viewBox="svg.viewBox"
    :width="svg.width"
    :height="svg.height"
    :fill="svg.fill"
    v-bind="$attrs"
  >
    <slot />
    <g :transform="svg.transform">
      <path
        v-for="path in svg.paths"
        :d="path.d"
        :key="path.key"
        :fill="path.fill"
        :opacity="path.opacity"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import {
  DbIconProps,
  DbIconContextProps,
  Size,
  DbIconStyle,
} from "@digibearapp/digibear-common-types";
import { dbPropValidator, defaultDbIconContext } from "./DbIcon.types";
import { DigibearIconsRegistry } from "@digibearapp/digibear-svg-core";

export const DbIcon = defineComponent<{}, {}, DbIconProps, {}>({
  name: "DbIcon",
  props: dbPropValidator,
  computed: {
    svg() {
      const registry: DigibearIconsRegistry = inject("DigibearIconsRegistry") as DigibearIconsRegistry;
      const digibearIconsContext: DbIconContextProps = inject<DbIconContextProps>("DbIconContext", defaultDbIconContext) as DbIconProps;

      const {
        iconName,
        iconStyle,
        color,
        secondaryColor,
        opacity,
        secondaryOpacity,
        size,
        flippedH,
        flippedV,
      } = this as DbIconProps;

      const {
        iconStyle: contextIconStyle,
        color: contextColor,
        secondaryColor: contextSecondaryColor,
        opacity: contextOpacity,
        secondaryOpacity: contextSecondaryOpacity,
        size: contextSize,
        flippedH: contextFlippedH,
        flippedV: contextFlippedV,
      } = digibearIconsContext;

      function parseNullishCoalescing<Type>(
        v1: Type | undefined,
        v2: Type | undefined,
        v3: Type
      ): Type {
        if (undefined !== v1) {
          return v1;
        } else if (undefined !== v2) {
          return v2;
        } else {
          return v3;
        }
      }

      const computedColor = parseNullishCoalescing<string>(
        color,
        contextColor,
        "currentColor"
      );
      const computedSecondaryColor = parseNullishCoalescing<string>(
        secondaryColor,
        contextSecondaryColor,
        "currentColor"
      );
      const computedOpacity = parseNullishCoalescing<number>(
        opacity,
        contextOpacity,
        1.0
      );
      const computedSecondaryOpacity = parseNullishCoalescing<number>(
        secondaryOpacity,
        contextSecondaryOpacity,
        0.16
      );
      const computedSize = parseNullishCoalescing<Size>(
        size,
        contextSize,
        128.0
      );
      const computedIconStyle = parseNullishCoalescing<DbIconStyle>(
        iconStyle,
        contextIconStyle,
        "line"
      );
      const computedFlippedH = parseNullishCoalescing<boolean>(
        flippedH,
        contextFlippedH,
        false
      );
      const computedFlippedV = parseNullishCoalescing<boolean>(
        flippedV,
        contextFlippedV,
        false
      );
      const dbIconProps: DbIconProps = {
        iconName: iconName,
        iconStyle: computedIconStyle,
        color: computedColor,
        secondaryColor: computedSecondaryColor,
        opacity: computedOpacity,
        secondaryOpacity: computedSecondaryOpacity,
        size: computedSize,
        flippedH: computedFlippedH,
        flippedV: computedFlippedV,
      };
      const svg = registry.getIcon(dbIconProps)!;

      return {
        xmlns: svg.xmlns,
        width: svg.width,
        height: svg.height,
        fill: svg.fill,
        viewBox: svg.viewBox,
        transform: svg.groupTransform,
        paths: svg.paths,
      };
    },
  },
});

export default DbIcon;
</script>
