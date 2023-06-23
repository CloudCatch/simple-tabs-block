import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import { TabsIcon as icon } from './icon';
import save from './save';
import deprecated from './deprecated';

registerBlockType( 'cloudcatch/tabs', {
	edit: Edit,
	icon,
	save,
	deprecated,
	example: {
		attributes: {
			tabs: [ '500', '501', '502' ],
		},
		innerBlocks: [
			{
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
			{
				name: 'cloudcatch/tab',
				attributes: {
					id: '501',
					index: 1,
					label: __( 'Tab 2', 'simple-tabs-block' ),
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							/* translators: example text. */
							content: __(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
							),
						},
					},
				],
			},
			{
				name: 'cloudcatch/tab',
				attributes: {
					id: '502',
					index: 2,
					label: __( 'Tab 3', 'simple-tabs-block' ),
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							/* translators: example text. */
							content: __(
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
							),
						},
					},
				],
			},
		],
	},
} );
