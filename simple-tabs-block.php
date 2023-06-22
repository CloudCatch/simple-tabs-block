<?php
/**
 * Plugin Name:       Simple Tabs Block
 * Description:       Block to create a tabbed layout.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.0.0-development
 * Author:            CloudCatch
 * Author URI:        https://cloudcatch.io
 * Contributors:      cloudcatch, dkjensen
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       simple-tabs-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_wp_tabs_block_block_init() {
	register_block_type( __DIR__ . '/build/tabs' );
	register_block_type( __DIR__ . '/build/tab' );
	register_block_type( __DIR__ . '/build/tab-content' );
	register_block_type( __DIR__ . '/build/tabs-wrapper' );
	register_block_type( __DIR__ . '/build/tabs-content-wrapper' );
}
add_action( 'init', 'create_block_wp_tabs_block_block_init' );
