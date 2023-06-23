import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import { TabIcon as icon } from './icon';
import save from './save';
import deprecated from './deprecated';

registerBlockType( 'cloudcatch/tab', {
	edit: Edit,
	icon,
	save,
	deprecated,
	example: {
		name: 'cloudcatch/tab',
		attributes: {
			id: '500',
			index: 0,
			label: __( 'Tab 1', 'simple-tabs-block' ),
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					/* translators: example text. */
					content: __(
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.',
						'simple-tabs-block'
					),
				},
			},
		],
	},
} );
