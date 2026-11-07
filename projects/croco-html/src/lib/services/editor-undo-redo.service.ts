import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HtmlBodyTag } from '../models/models';
import { ChangeSnapshot, DEFAULT_MAX_HISTORY_SIZE } from '../models/change-tracking-models';

/**
 * Stack-based undo/redo service for the visual editor.
 * Maintains two stacks (undo/redo) and supports keyboard shortcuts (Ctrl+Z / Ctrl+Y).
 */
@Injectable({
  providedIn: 'root'
})
export class EditorUndoRedoService {

  private undoStack: ChangeSnapshot[] = [];
  private redoStack: ChangeSnapshot[] = [];

  /** RxJS observable for canUndo state */
  readonly canUndoChanged = new BehaviorSubject<boolean>(false);
  
  /** RxJS observable for canRedo state */
  readonly canRedoChanged = new BehaviorSubject<boolean>(false);

  /** Maximum number of undo steps to keep */
  private maxHistorySize: number = DEFAULT_MAX_HISTORY_SIZE;

  /**
   * Configure the undo/redo service.
   */
  configure(options: { maxHistorySize?: number }): void {
    if (options.maxHistorySize) {
      this.maxHistorySize = options.maxHistorySize;
    }
  }

  /**
   * Record the current state of the editor.
   * Call this BEFORE applying changes, so we have a point to undo TO.
   */
  pushState(bodyTags: HtmlBodyTag[], html: string, label?: string): void {
    const snapshot: ChangeSnapshot = {
      id: crypto.randomUUID(),
      bodyTags: JSON.parse(JSON.stringify(bodyTags)), // Deep clone
      html,
      timestamp: Date.now(),
      label: label ?? `Step ${this.undoStack.length + 1}`
    };

    // Push current to undo stack
    this.undoStack.push(snapshot);

    // Trim undo stack
    if (this.undoStack.length > this.maxHistorySize) {
      this.undoStack = this.undoStack.slice(-this.maxHistorySize);
    }

    // Clear redo stack on new action
    this.redoStack = [];

    this.updateStates();
  }

  /**
   * Undo the last action.
   * Returns the snapshot to restore, or null if nothing to undo.
   */
  undo(): ChangeSnapshot | null {
    if (this.undoStack.length === 0) {
      return null;
    }

    // The target state is the last item in the undo stack
    const targetSnapshot = this.undoStack[this.undoStack.length - 1];

    // Remove from undo stack and push to redo stack
    this.undoStack.pop();
    this.redoStack.push(targetSnapshot);

    this.updateStates();

    return targetSnapshot;
  }

  /**
   * Redo the last undone action.
   * Returns the snapshot to restore, or null if nothing to redo.
   */
  redo(): ChangeSnapshot | null {
    if (this.redoStack.length === 0) {
      return null;
    }

    // Pop from redo stack
    const targetSnapshot = this.redoStack.pop();
    if (!targetSnapshot) {
      return null;
    }

    // Push to undo stack
    this.undoStack.push(targetSnapshot);

    this.updateStates();

    return targetSnapshot;
  }

  /**
   * Clear both undo/redo stacks.
   * Call this on initial load or fresh state.
   */
  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.updateStates();
  }

  /**
   * Get the bodyTags array from a specific snapshot.
   */
  getSnapshotBodyTags(snapshotId: string): HtmlBodyTag[] | null {
    for (const s of [...this.undoStack, ...this.redoStack]) {
      if (s.id === snapshotId) return s.bodyTags;
    }
    return null;
  }

  /**
   * Get the current undo stack for debugging.
   */
  getUndoStack(): ChangeSnapshot[] {
    return [...this.undoStack];
  }

  /**
   * Get the current redo stack for debugging.
   */
  getRedoStack(): ChangeSnapshot[] {
    return [...this.redoStack];
  }

  /**
   * Check if undo is available.
   */
  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  /**
   * Check if redo is available.
   */
  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /**
   * Get the count of available undo steps.
   */
  undoCount(): number {
    return this.undoStack.length;
  }

  /**
   * Get the count of available redo steps.
   */
  redoCount(): number {
    return this.redoStack.length;
  }

  private updateStates(): void {
    const canUndo = this.undoStack.length > 0;
    const canRedo = this.redoStack.length > 0;

    this.canUndoChanged.next(canUndo);
    this.canRedoChanged.next(canRedo);
  }
}
