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

const ALLOWED_BLOCKS = [ 'cloudcatch/tab' ];

const DEFAULT_BLOCK = {
	name: 'cloudcatch/tab',
};

const LAYOUT = {
	type: 'default',
	alignments: [],
};

export default function TabsInnerBlocks( props ) {
	const { orientation, clientId } = props;

	// grid-template-columns: repeat(4, 1fr);

	const { innerBlockCount, selectedBlockClientId } = useSelect(
		( _select ) => {
			return {
				innerBlockCount:
					_select( blockEditorStore ).getBlock( clientId )
						?.innerBlocks?.length,
				selectedBlockClientId: getSelectedBlockClientId(),
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
			template: [
				[ 'cloudcatch/tab' ],
				[ 'cloudcatch/tab' ],
				[ 'cloudcatch/tab' ],
			],
			templateLock: false,
		}
	);

	return <div { ...innerBlocksProps } />;
}
