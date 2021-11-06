import { DbIconContextProps, DbIconName, DbIconStyle } from "@digibearapp/digibear-common-types";

export const dbPropValidator = {
    iconName: { type: String as () => DbIconName },
    iconStyle: { type: String as () => DbIconStyle },
    color: String,
    secondaryColor: String,
    opacity: Number,
    secondaryOpacity: Number,
    size: Number,
    flippedH: Boolean,
    flippedV: Boolean
};

export const defaultDbIconContext : DbIconContextProps = {
    iconStyle: 'line',
    color: 'currentColor',
    secondaryColor: 'currentColor',
    opacity: 1.0,
    secondaryOpacity: 0.16,
    size: 128.0,
    flippedH: false,
    flippedV: true
};