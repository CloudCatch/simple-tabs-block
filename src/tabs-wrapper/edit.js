import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

const ALLOWED_BLOCKS = [
	'cloudcatch/tab'
];

const DEFAULT_BLOCK = {
	name: 'cloudcatch/tab'
};

const LAYOUT = {
	type: 'default',
	alignments: [],
};

export default function Edit({context}) {
	console.log( context );

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		__experimentalDefaultBlock: DEFAULT_BLOCK,
		__experimentalDirectInsert: true,
		orientation: context['cloudcatch/tabs/orientation'],
		template: [['cloudcatch/tab'], ['cloudcatch/tab'], ['cloudcatch/tab']],
		templateLock: false,
		__experimentalLayout: LAYOUT,
	});

	return <div {...innerBlocksProps} />;
}
