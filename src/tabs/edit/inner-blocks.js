/**
 * WordPress dependencies
 */
 import { useEntityBlockEditor } from '@wordpress/core-data';
 import {
	 useInnerBlocksProps,
	 InnerBlocks,
	 __experimentalBlockContentOverlay as BlockContentOverlay,
	 store as blockEditorStore,
 } from '@wordpress/block-editor';
 import { useSelect } from '@wordpress/data';
 import { useMemo } from '@wordpress/element';

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

export default function TabsInnerBlocks( {
    clientId,
	orientation,
} ) {
    const {
		selectedBlockId
	} = useSelect(
		( select ) => {
			const { getSelectedBlockClientId } = select( blockEditorStore );
			const selectedBlockId = getSelectedBlockClientId();

			return {
				selectedBlockId: selectedBlockId
			};
		},
		[ clientId ]
	);

    const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-cloudcatch-tabs__container',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			__experimentalDefaultBlock: DEFAULT_BLOCK,
			__experimentalDirectInsert: true,
			orientation,
			template: [ [ 'cloudcatch/tab' ], [ 'cloudcatch/tab' ], [ 'cloudcatch/tab' ] ],
			templateLock: false,
			__experimentalLayout: LAYOUT,
		}
	);

    return (
        <div {...innerBlocksProps}/>
    );
}
