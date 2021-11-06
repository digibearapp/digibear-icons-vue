#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const paths = require('./paths');
const constants = require('./constants');
const { allNames } = require('@digibearapp/digibear-svg-icons');
const { prefixName } = require("./utils");

function generateDbStories() {
    let imports = allNames.map(name => prefixName(name)).join(",\n\t\t");
    let options = allNames.map(key => `"${key}"`).join(",\n\t\t\t\t");
    let fileLines = generateStoriesFileLines(imports, options);
    createStoriesFile(fileLines);
}

function generateStoriesFileLines(imports, options) {
    return `\
${constants.HEADER}
import { DbIcon } from '../components';
import { DbIconProps } from "@digibearapp/digibear-common-types";
import { Story } from '@storybook/vue3';
import { DigibearIconsRegistry } from '@digibearapp/digibear-svg-core';
import { defaultDbIconContext } from '../components/DbIcon.types';
import { ${imports} } from "@digibearapp/digibear-svg-icons";

export default {
    title: 'Example/DbIcon',
    component: DbIcon,
    argTypes: {
        iconName: {
            options: [${options}],
            control: { type: 'select' },
		},
		iconStyle: {
			options: ['line', 'fill', 'duotone'],
			control: { type: 'radio' }
		},
		color: { control: 'color' },
		secondaryColor: { control: 'color' },
		opacity: { control: 'number' },
		secondaryOpacity: { control: 'number' },
		size: { control: 'number' },
		flippedH: { control: 'boolean' },
		flippedV: { control: 'boolean' },
	},
};

const Template: Story<DbIconProps> = (args, { argTypes }) => {
	const registry = new DigibearIconsRegistry();
	registry.registerIcons([${imports}]);
	return ({
		components: { DbIcon },
		setup() {
			return { args };
		},
		provide: {
			DbIconContext: defaultDbIconContext,
			DigibearIconsRegistry: registry,
		},
		template: '<DbIcon v-bind="args" />',
	});
};

export const Icon = Template.bind({});
Icon.args = {
	iconName: "watermelon",
	iconStyle: "line",
	color: "black",
	secondaryColor: "black",
	opacity: 1.0,
	secondaryOpacity: 0.16,
	size: 128.0,
	flippedH: false,
	flippedV: false,
};

`
}

function createStoriesFile(fileLines) {
    try {
        fs.writeFileSync(paths.STORIES_PATH, fileLines);
        console.log(`${chalk.inverse.green(" DONE ")} DbIcon.stories.tsx created.`);
    } catch (err) {
        console.error(
            `${chalk.inverse.red(" FAIL ")} Failed to created DbIcon.stories.tsx.`
        );
        console.group();
        console.error(err);
        console.groupEnd();
        return;
    }
}

module.exports = { generateDbStories };