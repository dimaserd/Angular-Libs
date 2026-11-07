import { Injectable } from '@angular/core';
import { HtmlBodyTag } from '../models/models';
import { TagDiff, TagFieldChange, ChangeType } from '../models/change-tracking-models';

/**
 * Service responsible for detecting granular differences between two HtmlBodyTag instances.
 * Avoids unnecessary full re-renders by identifying exactly what changed.
 */
@Injectable({
  providedIn: 'root'
})
export class TagChangeDetector {

  /**
   * Compares two HtmlBodyTag instances and produces a structured diff.
   */
  detectDiff(
    oldTag: HtmlBodyTag,
    newTag: HtmlBodyTag,
    index: number,
    changeType: ChangeType
  ): TagDiff | null {
    if (!oldTag && !newTag) {
      return null;
    }

    const fieldChanges: TagFieldChange[] = [];

    // Compare innerHtml
    if (oldTag?.innerHtml !== newTag?.innerHtml) {
      fieldChanges.push({
        fieldName: 'innerHtml',
        oldValue: oldTag?.innerHtml ?? null,
        newValue: newTag?.innerHtml ?? null
      });
    }

    // Compare attributes (deep comparison)
    const attrChanges = this.diffAttributes(oldTag?.attributes ?? {}, newTag?.attributes ?? {});
    fieldChanges.push(...attrChanges);

    // Compare tagDescription
    if (oldTag?.tagDescription?.tag !== newTag?.tagDescription?.tag ||
        oldTag?.tagDescription?.displayValue !== newTag?.tagDescription?.displayValue ||
        oldTag?.tagDescription?.isCustom !== newTag?.tagDescription?.isCustom) {
      fieldChanges.push({
        fieldName: 'tagDescription',
        oldValue: oldTag?.tagDescription ?? null,
        newValue: newTag?.tagDescription ?? null
      });
    }

    // If nothing changed, return null
    if (fieldChanges.length === 0 && changeType !== ChangeType.Added && changeType !== ChangeType.Removed) {
      return null;
    }

    return {
      trackingId: newTag?.trackingId ?? oldTag?.trackingId ?? '',
      index,
      changeType,
      fieldChanges,
      oldTag,
      newTag,
      timestamp: Date.now()
    };
  }

  /**
   * Deep compares two attribute objects and returns field-level changes.
   */
  private diffAttributes(
    oldAttrs: HtmlBodyTag['attributes'],
    newAttrs: HtmlBodyTag['attributes']
  ): TagFieldChange[] {
    const changes: TagFieldChange[] = [];
    const oldObj = oldAttrs as Record<string, unknown>;
    const newObj = newAttrs as Record<string, unknown>;
    const allKeys = new Set([
      ...Object.keys(oldObj ?? {}),
      ...Object.keys(newObj ?? {})
    ]);

    for (const key of allKeys) {
      const oldVal = oldObj?.[key];
      const newVal = newObj?.[key];

      if (oldVal !== newVal) {
        changes.push({
          fieldName: `attributes.${key}`,
          oldValue: oldVal ?? null,
          newValue: newVal ?? null
        });
      }
    }

    return changes;
  }

  /**
   * Quick check: do two tags have the same content (ignoring trackingId)?
   * Useful for skip optimization when nothing actually changed.
   */
  tagsAreEqual(a: HtmlBodyTag, b: HtmlBodyTag): boolean {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.innerHtml !== b.innerHtml) return false;
    if (a.tagDescription?.tag !== b.tagDescription?.tag) return false;

    const aAttrs = a.attributes as Record<string, unknown>;
    const bAttrs = b.attributes as Record<string, unknown>;
    const allKeys = new Set([...Object.keys(aAttrs ?? {}), ...Object.keys(bAttrs ?? {})]);

    for (const key of allKeys) {
      if (aAttrs?.[key] !== bAttrs?.[key]) {
        return false;
      }
    }

    return true;
  }
}
