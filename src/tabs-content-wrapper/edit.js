import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

const ALLOWED_BLOCKS = [
	'cloudcatch/tab-content'
];

const DEFAULT_BLOCK = {
	name: 'cloudcatch/tab-content'
};

const LAYOUT = {
	type: 'default',
	alignments: [],
};

export default function Edit() {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		__experimentalDefaultBlock: DEFAULT_BLOCK,
		__experimentalDirectInsert: true,
		template: [['cloudcatch/tab-content'], ['cloudcatch/tab-content'], ['cloudcatch/tab-content']],
		templateLock: false,
		__experimentalLayout: LAYOUT,
	});

	return <div {...innerBlocksProps} />;
}
