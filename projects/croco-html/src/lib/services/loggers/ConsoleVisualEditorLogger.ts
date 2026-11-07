import { HtmlBodyTag } from "../../models";
import { IVisualEditorLogger } from "./IVisualEditorLogger";
import { TagDiff, ChangeSnapshot, ChangeBatch } from "../../models/change-tracking-models";

export class ConsoleVisualEditorLogger implements IVisualEditorLogger {

  onAdd(tags: HtmlBodyTag[]): void {
    const tagCopy = JSON.parse(JSON.stringify(tags));

    console.log("[%c+ Add]", "color: #4CAF50; font-weight: bold", tagCopy);
  }

  onChange(tag: HtmlBodyTag, index: number): void {

    const tagCopy = JSON.parse(JSON.stringify(tag));

    console.log("[%c~ Change]", "color: #FF9800; font-weight: bold", tagCopy, index);
  }

  onRemove(index: number): void {
    console.log("[%c- Remove]", "color: #F44336; font-weight: bold", index);
  }

  onHtmlChanged(html: string): void {
    console.log("[%c<!> HTML]", "color: #2196F3; font-weight: bold", html);
  }

  onTagDiff?(diff: TagDiff): void {
    const color = this.getColorForChangeType(diff.changeType);
    console.log(`%c${color} Diff at #${diff.index}`, diff.fieldChanges.map(fc => 
      `color: ${fc.oldValue === fc.newValue ? '#9e9e9e' : diff.changeType === 'updated' ? '#ff9800' : '#4caf50'}`
    )[0], {
      trackingId: diff.trackingId,
      changeType: diff.changeType,
      fieldChanges: diff.fieldChanges.map(fc => ({
        field: fc.fieldName,
        old: fc.oldValue,
        new: fc.newValue
      }))
    });
  }

  onBatchChanged?(batch: ChangeBatch): void {
    console.log(`%c[<> Batch: ${batch.changes.length} changes]`, "color: #9c27b0; font-weight: bold", batch.changes);
  }

  onSnapshot?(snapshot: ChangeSnapshot): void {
    console.log(`%c[:: Snapshot #${snapshot.id}]`, "color: #607d8b; font-weight: bold", {
      id: snapshot.id,
      tagCount: snapshot.bodyTags.length,
      htmlLength: snapshot.html.length,
      label: snapshot.label
    });
  }

  onUndo?(step: ChangeSnapshot): void {
    console.log(`%c[← Undo: ${step.label || 'step'}]`, "color: #3f51b5; font-weight: bold", {
      htmlLength: step.html.length,
      tagCount: step.bodyTags.length
    });
  }

  onRedo?(step: ChangeSnapshot): void {
    console.log(`%c[→ Redo: ${step.label || 'step'}]`, "color: #3f51b5; font-weight: bold", {
      htmlLength: step.html.length,
      tagCount: step.bodyTags.length
    });
  }

  private getColorForChangeType(type: string): string {
    switch (type) {
      case 'updated': return '%c[~ Updated]';
      case 'added': return '%c[+ Added]';
      case 'removed': return '%c[- Removed]';
      case 'moved': return '%c[<> Moved]';
      default: return '%c[?] Unknown';
    }
  }
}
