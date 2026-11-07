import { HtmlBodyTag } from "../../models";
import { TagDiff, ChangeSnapshot, ChangeBatch } from "../../models/change-tracking-models";

export interface IVisualEditorLogger {
  onAdd(tags: HtmlBodyTag[]): void;

  onChange(tag: HtmlBodyTag, index: number): void;

  onRemove(index: number): void;

  onHtmlChanged(html:string): void;

  /**
   * Logs a structured diff of what changed within a tag.
   * Provides granular insight into field-level modifications.
   */
  onTagDiff?(diff: TagDiff): void;

  /**
   * Logs a batch of changes applied together.
   */
  onBatchChanged?(batch: ChangeBatch): void;

  /**
   * Logs a full snapshot state.
   */
  onSnapshot?(snapshot: ChangeSnapshot): void;

  /**
   * Logs an undo operation.
   */
  onUndo?(step: ChangeSnapshot): void;

  /**
   * Logs a redo operation.
   */
  onRedo?(step: ChangeSnapshot): void;
}