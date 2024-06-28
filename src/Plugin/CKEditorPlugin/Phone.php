<?php

namespace Drupal\ckeditor_phone\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginButtonsInterface;
use Drupal\ckeditor\CKEditorPluginInterface;
use Drupal\Component\Plugin\PluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "Phone" plugin, with a CKEditor.
 *
 * @CKEditorPlugin(
 *   id = "phone",
 *   label = @Translation("Phone Plugin")
 * )
 */
class Phone extends PluginBase implements CKEditorPluginInterface, CKEditorPluginButtonsInterface {

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return \Drupal::service('extension.path.resolver')->getPath('module', 'ckeditor_phone') . '/js/plugins/phone/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $iconImage = \Drupal::service('extension.path.resolver')->getPath('module', 'ckeditor_phone') . '/js/plugins/phone/images/icon.png';

    return [
      'Phone' => [
        'label' => 'Add Phone Widget',
        'image' => $iconImage,
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

}
